<?php 

namespace App\Http\Controllers;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use App\LeagueScoreboard;
use App\Http\Resources\LeagueScoreboard as LeagueScoreboardResource;
use App\Clubs;
use App\Http\Resources\Clubs as ClubsResource;
use App\Matches;
use App\Http\Resources\Matches as MatchesResource;
use App\Players;
use App\Http\Resources\Players as PlayersResource;
use Illuminate\Support\Facades\DB;

class FootballAPIController
{
	private static function getDataFromURL($url, $token)
	{
		$client = new Client();
		$response = $client->request('GET', $url, 
			[
				'headers' => [
					'content-type' => 'application/json', 
					'Accept' => 'application/json', 
					'X-Auth-Token' => $token
				]
			]);
		$data = $response->getBody();
		$data = json_decode($data);
		return $data;
	}

	public static function getLeagueScoreboard_PD_ExternalAPI($url, $token)
	{
		
		$data = self::getDataFromURL($url, $token);

		$competitionCode = $data->competition->code;
		$season = substr($data->season->startDate, 0, 4) . '-' . substr($data->season->endDate, 0, 4);
		$clubsStandings = $data->standings[0]->table;
		$group = null;
		foreach ($clubsStandings as $key => $clubStanding) {
			// UPDATE
			if(DB::table('league_scoreboards')->where('idClub', $clubStanding->team->id)->where('League', $competitionCode)->where('Season', $season)->count())
			{
				LeagueScoreboard::where('idClub', $clubStanding->team->id)->where('League', $competitionCode)->where('Season', $season)->update([
					'Position' => $clubStanding->position,
					'Matches' => $clubStanding->playedGames,
					'Won' => $clubStanding->won,
					'Draw' => $clubStanding->draw,
					'Lost' => $clubStanding->lost,
					'Points' => $clubStanding->points,
					'Group' => $group]);
			}
			// INSERT
			else
			{
				$leagueScoreboardRecord = new LeagueScoreboard;
				$leagueScoreboardRecord->idClub = $clubStanding->team->id;
				$leagueScoreboardRecord->Position = $clubStanding->position;
				$leagueScoreboardRecord->Matches = $clubStanding->playedGames;
				$leagueScoreboardRecord->Won = $clubStanding->won;
				$leagueScoreboardRecord->Draw = $clubStanding->draw;
				$leagueScoreboardRecord->Lost = $clubStanding->lost;
				$leagueScoreboardRecord->Points = $clubStanding->points;
				$leagueScoreboardRecord->Season = $season;
				$leagueScoreboardRecord->League = $competitionCode;
				$leagueScoreboardRecord->Group = $group;
				$leagueScoreboardRecord->save();
			}
		}
	}

	public static function getLeagueScoreboard_CL_ExternalAPI($url, $token)
	{
		$data = self::getDataFromURL($url, $token);

		$competitionCode = $data->competition->code;
		$season = substr($data->season->startDate, 0, 4) . '-' . substr($data->season->endDate, 0, 4);
		$clubsStandings = $data->standings;

		for($i = 0; $i < count($clubsStandings); $i+=3)
		{
			$group = $clubsStandings[$i]->group;
			foreach ($clubsStandings[$i]->table as $key => $clubStanding) {
				// UPDATE
				if(DB::table('league_scoreboards')->where('idClub', $clubStanding->team->id)->where('League', $competitionCode)->where('Season', $season)->count())
				{
					LeagueScoreboard::where('idClub', $clubStanding->team->id)->where('League', $competitionCode)->where('Season', $season)->update([
						'Position' => $clubStanding->position,
						'Matches' => $clubStanding->playedGames,
						'Won' => $clubStanding->won,
						'Draw' => $clubStanding->draw,
						'Lost' => $clubStanding->lost,
						'Points' => $clubStanding->points,
						'Group' => $group]);
				}
				// INSERT
				else
				{
					$leagueScoreboardRecord = new LeagueScoreboard;
					$leagueScoreboardRecord->idClub = $clubStanding->team->id;
					$leagueScoreboardRecord->Position = $clubStanding->position;
					$leagueScoreboardRecord->Matches = $clubStanding->playedGames;
					$leagueScoreboardRecord->Won = $clubStanding->won;
					$leagueScoreboardRecord->Draw = $clubStanding->draw;
					$leagueScoreboardRecord->Lost = $clubStanding->lost;
					$leagueScoreboardRecord->Points = $clubStanding->points;
					$leagueScoreboardRecord->Season = $season;
					$leagueScoreboardRecord->League = $competitionCode;
					$leagueScoreboardRecord->Group = $group;
					$leagueScoreboardRecord->save();
				}
			}
		}
	}

	public static function getClubs_ExternalAPI($url, $token)
	{
		$data = self::getDataFromURL($url, $token);

		$teams = $data->teams;
		foreach ($teams as $key => $team){
			// UPDATE
			if(DB::table('clubs')->where('idClub', $team->id)->count())
			{
				if($team->crestUrl != null)
				{
					Clubs::where('idClub', $team->id)->update([
						'Name' => $team->name,
						'ShortName' =>$team->shortName,
						'Image' => $team->crestUrl]);
				}
				else
				{
					Clubs::where('idClub', $team->id)->update([
						'Name' => $team->name,
						'ShortName' =>$team->shortName]);
				}
			}
			// INSERT
			else
			{
				$club = new Clubs;
				$club->idClub = $team->id;
				$club->Name = $team->name;
				$club->ShortName = $team->tla;
				$club->Image = $team->crestUrl;
				$club->save();
			}
		}
	}

	public static function getScheduledMatches_ExternalAPI($url, $token, $type)
	{
		$data = self::getDataFromURL($url, $token);
		$matches = $data->matches;
		foreach ($matches as $key => $match) {
			// UPDATE
			if(DB::table('matches')->where('id', $match->id)->count())
			{
				if($match->homeTeam->id == env("APP_FootallAPIMyTeamID"))
					$matchLocation = 'HOME';
				else 
					$matchLocation = 'AWAY';
				$matchHomeTeam = $match->homeTeam->id;
				$matchAwayTeam = $match->awayTeam->id;
				$matchDate = date_create(substr($match->utcDate, 0, 10) . ' ' . substr($match->utcDate, 11, 8));
				date_add($matchDate, date_interval_create_from_date_string('1 hours'));
				$fixedDate = date_format($matchDate, 'Y-m-d H:i:s');
				Matches::where('id', $match->id)->update([
					'League' => $match->competition->name,
					'Date' => $fixedDate,
					'Location' => $matchLocation,
					'idClubHome' => $matchHomeTeam,
					'idClubAway' => $matchAwayTeam,
					'Type' => $type]);
			}
			// INSERT
			else
			{
				$scheduledMatches = new Matches;
				$scheduledMatches->id = $match->id;
				$scheduledMatches->League = $match->competition->name;
				$scheduledMatches->Date = substr($match->utcDate, 0, 10) . ' ' . substr($match->utcDate, 11, 8);
				$scheduledMatches->idClubHome = $match->homeTeam->id;
				$scheduledMatches->idClubAway = $match->awayTeam->id;
				$scheduledMatches->Type = $type;
				if($match->homeTeam->id == env("APP_FootallAPIMyTeamID"))
					$scheduledMatches->Location = 'HOME';
				else 
					$scheduledMatches->Location = 'AWAY';
				$scheduledMatches->save();
			}
		}
	}

	public static function getLiveMatch_ExternalAPI($url, $token, $type)
	{
		$data = self::getDataFromURL($url, $token);
		if($data->count == 0)
			return;
		$match = $data->matches[0];
		// UPDATE
		if(DB::table('matches')->where('id', $match->id)->count())
		{
			if($match->homeTeam->id == env("APP_FootallAPIMyTeamID"))
				$matchLocation = 'HOME';
			else 
				$matchLocation = 'AWAY';
			$matchHomeClubID = $match->homeTeam->id;
			$matchAwayClubID = $match->awayTeam->id;
			$matchHomeClubScore = $match->score->fullTime->homeTeam;
			$matchAwayClubScore = $match->score->fullTime->awayTeam;
			$matchDate = date_create(substr($match->utcDate, 0, 10) . ' ' . substr($match->utcDate, 11, 8));
			date_add($matchDate, date_interval_create_from_date_string('1 hours'));
			$fixedDate = date_format($matchDate, 'Y-m-d H:i:s');
			Matches::where('id', $match->id)->update([
				'League' => $match->competition->name,
				'Date' => $fixedDate,
				'Location' => $matchLocation,
				'idClubHome' => $matchHomeClubID,
				'idClubAway' => $matchAwayClubID,
				'HomeClubScore' => $matchHomeClubScore,
				'AwayClubScore' => $matchAwayClubScore,
				'Type' => $type]);
		}
		// INSERT
		else
		{
			$finishedMatches = new Matches;
			$finishedMatches->id = $match->id;
			$finishedMatches->League = $match->competition->name;
			$finishedMatches->Date = substr($match->utcDate, 0, 10) . ' ' . substr($match->utcDate, 11, 8);
			if($match->homeTeam->id == env("APP_FootallAPIMyTeamID"))
				$finishedMatches->Location = 'HOME';
			else 
			$finishedMatches->Location = 'AWAY';
			$finishedMatches->idClubHome = $match->homeTeam->id;
			$finishedMatches->idClubAway = $match->awayTeam->id;
			$finishedMatches->HomeClubScore = $match->score->fullTime->homeTeam;
			$finishedMatches->AwayClubScore = $match->score->fullTime->awayTeam;
			$finishedMatches->Type = $type;
			$finishedMatches->save();
		}
	}

	public static function getFinishedMatches_ExternalAPI($url, $token, $type)
	{
		$data = self::getDataFromURL($url, $token);
		$matches = $data->matches;
		if($data->count == 0)
			return;
		foreach ($matches as $key => $match) {
			// UPDATE
			if(DB::table('matches')->where('id', $match->id)->count())
			{
				if($match->homeTeam->id == env("APP_FootallAPIMyTeamID"))
					$matchLocation = 'HOME';
				else 
					$matchLocation = 'AWAY';
				$matchHomeClubID = $match->homeTeam->id;
				$matchAwayClubID = $match->awayTeam->id;
				$matchHomeClubScore = $match->score->fullTime->homeTeam;
				$matchAwayClubScore = $match->score->fullTime->awayTeam;
				$matchDate = date_create(substr($match->utcDate, 0, 10) . ' ' . substr($match->utcDate, 11, 8));
				date_add($matchDate, date_interval_create_from_date_string('1 hours'));
				$fixedDate = date_format($matchDate, 'Y-m-d H:i:s');
				Matches::where('id', $match->id)->update([
					'League' => $match->competition->name,
					'Date' => $fixedDate,
					'Location' => $matchLocation,
					'idClubHome' => $matchHomeClubID,
					'idClubAway' => $matchAwayClubID,
					'HomeClubScore' => $matchHomeClubScore,
					'AwayClubScore' => $matchAwayClubScore,
					'Type' => $type]);
			}
			// INSERT
			else
			{
				$finishedMatches = new Matches;
				$finishedMatches->id = $match->id;
				$finishedMatches->League = $match->competition->name;
				$finishedMatches->Date = substr($match->utcDate, 0, 10) . ' ' . substr($match->utcDate, 11, 8);
				if($match->homeTeam->id == env("APP_FootallAPIMyTeamID"))
					$finishedMatches->Location = 'HOME';
				else 
					$finishedMatches->Location = 'AWAY';
				$finishedMatches->idClubHome = $match->homeTeam->id;
				$finishedMatches->idClubAway = $match->awayTeam->id;
				$finishedMatches->HomeClubScore = $match->score->fullTime->homeTeam;
				$finishedMatches->AwayClubScore = $match->score->fullTime->awayTeam;
				$finishedMatches->Type = $type;
				$finishedMatches->save();
			}
		}
	}

	public static function getPlayers_ExternalAPI($url, $token)
	{
		$data = self::getDataFromURL($url, $token);

		$squad = $data->squad;
		foreach ($squad as $key => $squad_player){
			if($squad_player->role === 'COACH') $squad_player->position = 'Coach';
			// UPDATE
			if(DB::table('players')->where('idPlayerApi', $squad_player->id)->count())
			{
				Players::where('idPlayerApi', $squad_player->id)->where('Updateable', 1)->update([
					'Name' => $squad_player->name,
					'DateOfBirth' => substr($squad_player->dateOfBirth, 0, 10),
					'Nationality' => $squad_player->nationality,
					'Position' => $squad_player->position,
					'ShirtNumber' => $squad_player->shirtNumber]);
			}
			// INSERT
			else
			{
				$player = new Players;
				$player->idPlayerApi = $squad_player->id;
				$player->Name = $squad_player->name;
				$player->DateOfBirth = substr($squad_player->dateOfBirth, 0, 10);
				$player->Nationality = $squad_player->nationality;
				$player->Position = $squad_player->position;
				$player->ShirtNumber = $squad_player->shirtNumber;
				$player->save();
			}
		}
	}

	public static function curlClientSendGET($url)
	{
	    $ch = curl_init();
	    $user_agent = 'Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0';
	    curl_setopt($ch, CURLOPT_URL, $url);
	    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	    curl_setopt($ch, CURLOPT_AUTOREFERER, false);
	    curl_setopt($ch, CURLOPT_VERBOSE, 1);
	    curl_setopt($ch, CURLOPT_HEADER, 0);

	    curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($ch, CURLOPT_SSLVERSION,CURL_SSLVERSION_DEFAULT);
	    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	    $webcontent = curl_exec($ch);
	    return $webcontent;
	    curl_close($ch);
	}

	public static function curlClientSendPOST($url)
	{
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => $url,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_AUTOREFERER => false,
			CURLOPT_VERBOSE => true,
			CURLOPT_SSLVERSION => CURL_SSLVERSION_DEFAULT,
			CURLOPT_SSL_VERIFYHOST => false,
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => "xpp=5",
			CURLOPT_HTTPHEADER => array(
		    	"Accept: */*",
		    	"Cache-Control: no-cache",
		    	"Connection: keep-alive",
		    	"Content-Type: application/x-www-form-urlencoded",
		    	"User-Agent: Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0",
		    	"accept-encoding: gzip, deflate",
		    	"cache-control: no-cache",
		    	"content-length: 5"
		 	),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);
		curl_close($curl);
		return $response;
	}
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Players;
use App\Http\Resources\Players as PlayersResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\FootballAPIController;
use App\Http\Controllers\CloudinaryController;
use Facades\App\CacheData\PlayersCache;
use App\Http\Controllers\ValidatorController;

class PlayersController extends Controller
{
    public static function buildPlayerData(&$player)
    {
        $playerID = $player;
        if(DB::table('players')->where('idPlayer', $playerID)->count())
        {
            $player = DB::table('players')->select('idPlayer as id_player', 'Name as name', 'DateOfBirth as date_of_birth', 'Nationality as nationality', 'Image as image', 'Position as position', 'ShirtNumber as shirt_number', 'Role as role')->where('idPlayer', '=', $playerID)->first();
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$players = Players::all();
        //return response()->json(PlayersResource::collection($players));
        // My Team Squad
        FootballAPIController::getPlayers_ExternalAPI('https://api.football-data.org/v2/teams/' . env("APP_FootallAPIMyTeamID"), env('APP_FootballAPIToken'));
    }

    public static function update_players()
    {
        // My Team Squad
        FootballAPIController::getPlayers_ExternalAPI('https://api.football-data.org/v2/teams/' . env("APP_FootallAPIMyTeamID"), env('APP_FootballAPIToken'));
    }


    public function get_squad()
    {
        $squad = PlayersCache::get_squad();
        return response()->json($squad);
    }

    // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(isset($request->name) && isset($request->date_of_birth) && isset($request->nationality) && isset($request->position) && isset($request->shirt_number) && isset($request->role) && ValidatorController::checkUploadFile($request->file('image'), $check_file_msg))
        {
            $player = new Players;
            $player->idPlayerApi = 0;
            $player->Name = $request->name;
            $player->DateOfBirth = $request->date_of_birth;
            $player->Nationality = $request->nationality;
            $player->Position = $request->position;
            $player->ShirtNumber = $request->shirt_number;
            $player->Role = strtoupper($request->role);
            $player->Updateable = 0;

            $image_name = 'players' . $player->ShirtNumber . $player->DateOfBirth . time() . $player->Name . '.' . $request->file('image')->getClientOriginalExtension();
            $destinationFolder = public_path('images') . '/articles/';
            $request->file('image')->move($destinationFolder, $image_name);
            $path = $destinationFolder . $image_name;

            $player->Image = CloudinaryController::uploadImage($path, $image_name, 'players');

            if(Players::where('Name', $player->Name)->where('DateOfBirth', $player->DateOfBirth)->where('Nationality', $player->Nationality)->where('Position', $player->Position)->where('ShirtNumber', $player->ShirtNumber)->where('Role', $player->Role)->exists()) 
            {
                    return response()->json(['status' => false, 'error' => 'wrong data'], 204);
            }
            else
            {
                if($player->save())
                {
                    return response()->json(['status' => true, 'error' => ''], 201);
                }
                else
                    return response()->json(['status' => false, 'error' => 'wrong data']);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        /*
            Aby wysłać dane (modyfikacja) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
            <input type="hidden" name="_method" value="PUT">
        */
        $status = false;
        $msg = '';
        if($request->file('image') != null)
        {
            $image_name = 'players' . $id . time() . '.' . $request->file('image')->getClientOriginalExtension();
            $destinationFolder = public_path('images') . '/players/';
            $request->file('image')->move($destinationFolder, $image_name);
            $path = $destinationFolder . $image_name;
            $playerImage = CloudinaryController::uploadImage($path, $image_name, 'players');
            if(Players::where('idPlayer', $id)->update(['Image' => $playerImage]))
            {
                $status = true;
                $msg .= 'image updated.';
            }
        }
        return response()->json(['status' => $status, 'error' => $msg], 200);
    }

    public function chenge_updateable($id)
    {
        if(Players::where('idPlayer', $id)->update(['Updateable' => DB::raw('ABS(Updateable-1)')])) {
            return response()->json(['status' => true, 'error' => '']);
        }
        return response()->json(['status' => false, 'error' => 'wrong data']);
    }

    public function add_statistic($id)
    {

    }

    public function change_statistic($id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(Players::where('idPlayer', $id)->delete()) {
            return response()->json(['status' => true, 'error' => '']);
        }
        return response()->json(['status' => false, 'error' => 'wrong data']);
    }
}

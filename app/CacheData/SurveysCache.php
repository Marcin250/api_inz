<?php

namespace App\CacheData;

use App\Surveys;
use App\SurveySets;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\SurveySetsController;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Cache;

class SurveysCache
{
	CONST CACHE_KEY = 'SURVEYS';

	public function latest()
	{
		$key = 'latest';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(4), function() {
			$latestSurvey = DB::table('surveys')->select('idSurvey as idsurvey', 'Topic as topic')->orderBy('idSurvey', 'desc')->first();
        	$latestSurvey->answers = array();
        	SurveySetsController::getAnswers($latestSurvey->answers, $latestSurvey->idsurvey);
			return $latestSurvey;
		});
	}

	public function latestUser($user)
	{
		$key = 'latest.user.' . $user;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addHours(12), function() use($user) {
			$latestSurvey = $this->latest();
        	$answersId = array();
        	foreach ($latestSurvey->answers as $key => $answer) {
        		array_push($answersId, $answer['idsurveyset']);
        	}
        	if($user != 'none')
            {
                if(DB::table('user_survey_answers')->whereIn('idSurveySet', $answersId)->where('idUser', $user)->count())
                    $voted = true;
                else
                    $voted = false;
            }
            else
            	$voted = false;
			return $voted;
		});
	}

	public function get_survey($id)
	{
		$key = 'get_survey.' . $id;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() use($id) {
			$survey_set = DB::table('surveys')->select('idSurvey as idsurvey', 'Topic as topic')->where('idSurvey', $id)->first();
        	$survey_set->answers = array();
        	SurveySetsController::getAnswers($survey_set->answers, $survey_set->idsurvey);
			return $survey_set;
		});
	}

	public function index()
	{
		$key = 'index';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() {
			$surveys = Surveys::all();
			return $surveys;
		});
	}

	public function storeForever($key, $data)
	{
		$cacheKey = $this->getCacheKey($key);
		return Cache::forever($cacheKey, $data);
	}

	public function forgetKey($key)
	{
		$cacheKey = $this->getCacheKey($key);
		return Cache::forget($cacheKey);
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}
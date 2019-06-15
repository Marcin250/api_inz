<?php

namespace App\CacheData;

use Players;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\PlayersController;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redis;

class PlayersCache
{
	CONST CACHE_KEY = 'PLAYERS';

	public function get_squad()
	{
		$key = 'get_squad';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(4), function() {
			$squad = [];
        	$positions = DB::table('players')->select('position')->groupBy('position')->get();
        	foreach ($positions as $key => $position) {
            	$squad[strtolower($position->position)] = [];
            	$squad[strtolower($position->position)] = DB::table('players')->select('idPlayer as player', 'Name as name', 'DateOfBirth as date_of_birth', 'Nationality as nationality', 'Image as image', 'Position as position', 'ShirtNumber as shirt_number', 'Role as role')->where('position', $position->position)->get();
        	}
    		return $squad;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}
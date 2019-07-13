<?php

namespace App\CacheData;

use Clubs;
use Spatie\Analytics\Period;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\DB;

class ClubsCache
{
	CONST CACHE_KEY = 'CLUBS';

	public function list()
	{
		$key = 'list';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() {
			$clubs = DB::table('clubs')->select('Name as name', 'ShortName as short_name', 'Image as image')->get();
    		return $clubs;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}
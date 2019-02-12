<?php

namespace App\CacheData;

use App\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\UsersController;

class UsersCache
{
	CONST CACHE_KEY = 'USERS';

	public function panel($days)
	{
		$key = 'panel.' . $days;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() use($days) {
			$latestUsers = DB::table('users')->join('privileges', 'privileges.idPrivilege', '=', 'users.idPrivilege')->join('statuses', 'statuses.idStatus', '=', 'users.idStatus')->select('id as iduser', 'users.Name as name', 'Email as email', 'Image as image', 'privileges.Name as privilege', 'privileges.Tier as tier', 'statuses.Name as status', DB::raw('(select count(*) from articles where articles.idUser = users.id) as articles_count'), DB::raw('(select count(*) from comments where comments.idUser = users.id) as comments_count'), 'users.created_at as create_date')->orderBy('users.created_at', 'desc')->limit(3)->get();
        	$weekSum = DB::table('users')->select(DB::raw('date(created_at) as day, count(*) as total_users'))->where(DB::raw('DATEDIFF(NOW(), users.created_at)'), '<', $days)->groupBy(DB::raw('day'))->get();
        	$weekSummary = array();
        	$to = date('Y-m-d', time());
        	$from = date('Y-m-d',(strtotime('-' . $days+1 . 'day', strtotime($to))));
        	for($from; $from <= $to; $from = date('Y-m-d',(strtotime( '+1 day', strtotime($from)))))
        	{
        	    $data = $weekSum->where('day', $from)->first();
        	    $count = isset($data->total_users) ? $data->total_users : 0;
        	    array_push($weekSummary, ['day' => $from, 'users_count' => $count]);
        	}
        	$panelData = [
        	    'weekSummary' => $weekSummary,
        	    'latestUsers' => $latestUsers->toArray(),
        	    'totalUsers' => User::count()
        	];
			return $panelData;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Clubs;
use App\Http\Resources\Clubs as ClubsResource;
use App\Http\Controllers\Auth;
use App\Http\Controllers\FootballAPIController;
use Illuminate\Support\Facades\DB;
use Facades\App\CacheData\ClubsCache;

class ClubsController extends Controller
{
    public static function buildClubData(&$club)
    {
        if(DB::table('clubs')->where('idClub', $club)->count()) {
            $club = DB::table('clubs')->select('Name as name', 'ShortName as short_name', 'Image as image')->where('idClub', $club)->first();
        }
        else {
            $club = NULL;
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clubs = ClubsCache::list();
        return response()->json($clubs);
    }

    public static function update_clubs_CL()
    {
        // UEFA Champions League Clubs
        FootballAPIController::getClubs_ExternalAPI('https://api.football-data.org/v2/competitions/CL/teams', 'a526814bc45a452ea371bec3ec82baaf');
    }

    public static function update_clubs_PD()
    {
        // Spain League Clubs
        FootballAPIController::getClubs_ExternalAPI('https://api.football-data.org/v2/competitions/PD/teams', 'a526814bc45a452ea371bec3ec82baaf');
    }

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
        //
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
        $data = json_decode($request->getContent(), true);
        if(isset($data['image']))
        {
            $image_name = 'clubs' . $id . time() . '.' . $request->file('image')->getClientOriginalExtension();
            $destinationFolder = public_path('images') . '/clubs/';
            $request->file('image')->move($destinationFolder, $image_name);
            $path = $destinationFolder . $image_name;
            CloudinaryController::uploadImage($path, $image_name, 'clubs', 'idClub', $id);
            return response()->json(['status' => true, 'error' => '']);
        }
        else 
            return response()->json(['status' => false, 'error' => 'wrong data']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

<?php

use Illuminate\Http\Request;
use Facades\App\CacheData\AnalyticsCache;
use Facades\App\CacheData\UsersCache;
use App\Http\Controllers\FootballAPIController;

if(!isset($_SESSION)) { session_start(); } 

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Google OAuth2
Route::group(['middleware' => ['web']], function () {
    Route::get('auth/{provider}', 'Auth\LoginController@redirectToProvider')->name('login');
    Route::get('auth/{provider}/callback', 'Auth\LoginController@handleProviderCallback');
    Route::get('auth/{provider}/logout', function() {
        session_destroy();
		return redirect('https://portal-wertykalny.herokuapp.com/');
    });
});

Route::get('auth/test/admin', function(Request $request) {
    $userData = UsersCache::by_email('testadministrator@portal-wertykalny');
    $_SESSION['iduser'] = $userData->iduser;
    $_SESSION['name'] = $userData->name;
    $_SESSION['email'] = $userData->email;
    $_SESSION['image'] = $userData->image;
    $_SESSION['privileges'] = $userData->privilege;
    $_SESSION['tier'] = $userData->tier;
    $_SESSION['status'] = $userData->status;
    $_SESSION['articles_count'] = $userData->articles_count;
    $_SESSION['comments_count'] = $userData->comments_count;
    $_SESSION['create_date'] = $userData->create_date;
    return redirect(env('APP_URL'));
});

Route::get('test', function(Request $request) {
    
});

// Use middleware to allow Client-side use API
Route::group(['middleware' => 'apiresponse'], function() {
    // Users routes
    Route::resource('users', 'UsersController')->only(['index']);
    Route::get('users_list/{from}/{quantity}', 'UsersController@list')->name('users.list');
    Route::get('users_paginate/{count}', 'UsersController@paginate')->name('users.paginate');
    Route::get('users_by_id/{id}', 'UsersController@by_id')->name('users.by_id');
    Route::get('users_by_name/{name}', 'UsersController@by_name')->name('users.by_name');
    Route::get('users_check_user', 'UsersController@check_user')->name('users.check_user');
    Route::get('users_check_token', 'UsersController@check_token')->name('users.check_token');
    Route::get('users_get_profile/{id}/{quantity}', 'UsersController@get_profile')->name('users.get_profile');
    // Articles routes
    Route::get('articles_latest/{count}', 'ArticlesController@latest')->name('articles.latest');
    Route::get('articles_latest_main/{count}', 'ArticlesController@latest_main')->name('articles.latest_main');
    Route::get('articles_most_viewed/{count}/{interval}', 'ArticlesController@most_viewed')->name('articles.most_viewed');
    Route::get('articles_show_article/{id}', 'ArticlesController@show_article')->name('articles.show_article');
    Route::get('articles_show_neighbours/{id}', 'ArticlesController@show_neighbours')->name('articles.show_neighbours');
    Route::get('articles_filtrate/{count}/{phrase}', 'ArticlesController@filtrate')->name('articles.filtrate');
    Route::get('articles_by_category/{count}', 'ArticlesController@by_category')->name('articles.by_category');
    // Comments routes
    Route::resource('comments', 'CommentsController')->only(['index']);
    Route::get('comments_get_comments/{id}', 'CommentsController@get_comments')->name('comments.get_comments');
    Route::get('comments_get_article_comments/{id}', 'CommentsController@get_article_comments')->name('comments.get_article_comments');
    // Injuries and Suspensions routes
    Route::resource('injuriessuspensions', 'InjuriesSuspensionsController')->only(['index']);
    Route::get('injuriessuspensions_latest_injuries/{count}', 'InjuriesSuspensionsController@latest_injuries')->name('injuriessuspensions.latest_injuries');
    Route::get('injuriessuspensions_latest_suspensions/{count}', 'InjuriesSuspensionsController@latest_suspensions')->name('injuriessuspensions.latest_suspensions');
    Route::get('injuriessuspensions_actual', 'InjuriesSuspensionsController@actual')->name('injuriessuspensions.actual');
    // Players routes
    Route::resource('players', 'PlayersController')->only(['index']);
    Route::get('players_get_squad', 'PlayersController@get_squad')->name('players.get_squad');
    // Survey sets routes
    Route::resource('surveysets', 'SurveySetsController')->only(['index']);
    Route::get('surveysets_get_survey_set/{id}', 'SurveySetsController@get_survey_set')->name('surveysets.get_survey_set');
    Route::get('surveysets_get_latest', 'SurveySetsController@get_latest')->name('surveysets.get_latest');
    // User survey answers routes
    Route::resource('usersurveyanswers', 'UserSurveyAnswersController')->only(['index']);
    // Surveys routes
    Route::resource('surveys', 'SurveysController')->only(['index']);
    Route::get('surveys_get_survey/{id}', 'SurveysController@get_survey')->name('surveys.get_survey');
    Route::get('surveys_latest/{count}', 'SurveysController@latest')->name('surveys.latest');
    // Categories routes
    Route::resource('categories', 'CategoriesController')->only(['index']);
    // Privileges routes
    Route::resource('privileges', 'PrivilegesController')->only(['index']);
    // Statuses routes
    Route::resource('statuses', 'StatusesController')->only(['index']);
    // Clubs routes
    Route::resource('clubs', 'ClubsController')->only(['index']);
    // League scorebaord routes
    Route::resource('leaguescoreboard', 'LeagueScoreboardController')->only(['index']);
    Route::get('leaguescoreboard_get_league_scoreboard/{season}/{league}', 'LeagueScoreboardController@get_league_scoreboard')->name('leaguescoreboard.get_league_scoreboard');
    // Matches routes
    Route::get('matches_get_scheduled_matches/{count}', 'MatchesController@get_scheduled_matches')->name('matches.get_scheduled_matches');
    Route::get('matches_get_live_match', 'MatchesController@get_live_match')->name('matches.get_live_match');
    Route::get('matches_get_finished_match', 'MatchesController@get_finished_match')->name('matches.get_finished_match');
    Route::get('matches_get_finished_matches/{count}', 'MatchesController@get_finished_matches')->name('matches.get_finished_matches');

    Route::get('matches_update_scheduled_matches', 'MatchesController@update_scheduled_matches')->name('matches.update_scheduled_matches');
    Route::get('matches_update_live_match', 'MatchesController@update_live_match')->name('matches.update_live_match');
    Route::get('matches_update_finished_matches', 'MatchesController@update_finished_matches')->name('matches.update_finished_matches');
});

// Secure API using SESSION (or JWT)
Route::group(['middleware' => 'apiauth'], function() {
    // Users routes
    Route::resource('users', 'UsersController')->except(['index']);
    //Route::get('users/get_images', 'UsersController@get_images')->name('users.get_images');
    Route::get('users_get_notifications', 'UsersController@get_notifications')->name('users.get_notifications');
    // Comments routes
    Route::resource('comments', 'CommentsController')->except(['index']);
    // User survey answers routes
    Route::resource('usersurveyanswers', 'UserSurveyAnswersController')->except(['index']);
    Route::get('usersurveyanswers_get_user_answer_to_survey/{id_survey}', 'UserSurveyAnswersController@get_user_answer_to_survey')->name('usersurveyanswers.get_user_answer_to_survey');
    // User article likes routes
    Route::resource('userlikes', 'UserLikesController')->except(['index']);

    // Restrict routes to Root/Admin or Moderator/Redactor privileges
    Route::group(['middleware' => 'checkprivilege', 'privileges' => ['root', 'administrator', 'moderator', 'redaktor']], function() {
        // TEST ADMINISTRATOR
        Route::group(['middleware' => 'testadministrator'], function() {
            Route::get('articles_test_admin_delete', 'ArticlesController@test_admin_delete')->name('articles.test_admin_delete');
            // Articles routes
            Route::resource('articles', 'ArticlesController');
            Route::get('articles_staff_show_article/{id}', 'ArticlesController@staff_show_article')->name('articles.staff_show_article');
            Route::put('articles_staff/{id}', 'ArticlesController@staff_update')->name('articles.staff_update');
            Route::put('articles_staff_change_visibility/{id}', 'ArticlesController@staff_change_visibility')->name('articles.staff_change_visibility');
            Route::put('articles_staff_change_main/{id}', 'ArticlesController@staff_change_main')->name('articles.staff_change_main');

            Route::get('users_panel/{days}', 'UsersController@panel')->name('users.panel');
            Route::get('articles_panel/{days}', 'ArticlesController@panel')->name('articles.panel');
            Route::get('comments_panel/{days}', 'CommentsController@panel')->name('comments.panel');

            Route::get('analytics_panel/{days}', function($days) {
                $analytics = AnalyticsCache::panel($days);
                return response()->json($analytics);
            });
            // Surveys routes
            Route::resource('surveys', 'SurveysController')->except(['index']);
            // Survey sets routes
            Route::resource('surveysets', 'SurveySetsController')->except(['index']);
            // Players routes
            Route::resource('players', 'PlayersController')->except(['index']);
            Route::get('players_chenge_updateable/{id}', 'PlayersController@chenge_updateable')->name('players.chenge_updateable');
        });
    });

    // Restrict routes to Root/Admin or Moderator privileges
    Route::group(['middleware' => 'checkprivilege', 'privileges' => ['root', 'administrator', 'moderator']], function() {

        Route::put('users_change_user_status/{id}', 'UsersController@change_user_status')->name('users.change_user_status');
        Route::get('users_get_blockades', 'UsersController@get_blockades')->name('users.get_blockades');
        Route::get('users_changes', 'UsersController@changes')->name('users.changes');

        Route::get('comments_staff_change_comment_visibility/{id}', 'CommentsController@staff_change_comment_visibility')->name('comments.staff_change_article_visibility');
        Route::get('comments_staff_get_article_comments/{id}', 'CommentsController@staff_get_article_comments')->name('comments.staff_get_article_comments');

        Route::resource('leaguescoreboard', 'LeagueScoreboardController')->except(['index']);

        Route::resource('clubs', 'ClubsController')->except(['index']);
        // Categories routes
        Route::resource('categories', 'CategoriesController')->except(['index']);
        // Injuries and Suspensions routes
        Route::resource('injuriessuspensions', 'InjuriesSuspensionsController')->except(['index']);
    });

    // Restrict routes only to Root/Admin privileges
    Route::group(['middleware' => 'checkprivilege', 'privileges' => ['root', 'administrator']], function() {
        Route::put('users_change_user_privilege/{id}', 'UsersController@change_user_privilege')->name('users.change_user_privilege');
        //
        Route::post('mails/send-notifications', 'MailController@sendMailNotification')->name('mails.send-notifications');
        // Privileges routes
        Route::resource('privileges', 'PrivilegesController')->except(['index']);
        // Statuses routes
        Route::resource('statuses', 'StatusesController')->except(['index']);

        Route::get('clear_cache', function(Request $request) {
            $exitCode = Artisan::call('cache:clear');
            return response()->json(['status' => false, 'error' => 'cache cleared!'], 200);
        });
    });
});
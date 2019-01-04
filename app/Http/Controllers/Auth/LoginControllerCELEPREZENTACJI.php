<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\DB;
use Socialite;
use App\User;
use Session;
use File;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;

if(!isset($_SESSION)) { session_start(); } 

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
    // * @var string
     */
    //protected $redirectTo = '/home';

    protected $email = "";

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider, Request $request)
    {
        $user = Socialite::driver($provider)->stateless()->user();
        if(DB::table('users')->join('statuses', 'users.idStatus', 'statuses.idStatus')->where('users.provider_id', $user->id)->where('statuses.Name', 'zablokowany')->count())
            { 
                return response()->json([
                    'status' => false,
                    'error' => 'sorry you are already blocked on this website, reason: ' . DB::table('user_blockades')->join('users', 'users.id', 'user_blockades.idUser')->select('Reason')->where('users.provider_id', $user->id)->value('Reason')]);
            }
        $authUser = $this->findOrCreateUser($user, $provider);
        $_SESSION['user'] = DB::table('users')->select('users.id', 'users.Name', 'users.Email', 'users.Image', 'privileges.Name as Privileges', 'privileges.Tier as Tier', 'statuses.Name as Status', DB::raw('(select count(*) from articles where articles.idUser = users.id) as articles_count'), DB::raw('(select count(*) from comments where comments.idUser = users.id) as comments_count'), 'users.created_at')->join('privileges', 'users.idPrivilege', '=', 'privileges.idPrivilege')->join('statuses', 'users.idStatus', '=', 'statuses.idStatus')->where('Email', $this->email)->first();
        return redirect(env('APP_URL'));
    }

    public function findOrCreateUser($user, $provider)
    {
        if(User::where('Email', $user->email)->count())
        {
            // użytkownik istnieje, nie jest wymagana żadna akcja
        }
        else
        {
            User::create([
                'name' => explode('@', $user->email)[0],
                'email' => $user->email,
                'provider' => strtoupper($provider),
                'provider_id' => $user->id,
                'image' => $user->avatar,
                'idprivilege' => 1,
                'idstatus' => 1]);
        }
        $this->email = $user->email;
        return $user; 
    }

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    public function generateUserToken($provider_id)
    {
        $date_now = new DateTime(); 
        $token_date = new DateTime(DB::table('users')->select('updated_at')->where('provider_id', $provider_id)->value('updated_at')); 
        $date_diff = $date_now->diff($token_date);
        $total_date_diff = $date_diff->days * 24 * 60;
        $total_date_diff += $date_diff->h * 60;
        $total_date_diff += $date_diff->i;
        if(($total_date_diff >= 180 && User::select('remember_token')->where('provider_id', $provider_id)->value('remember_token') != null) || User::select('remember_token')->where('provider_id', $provider_id)->value('remember_token') == null)
        {
            $userID = User::select('id')->where('provider_id', $provider_id)->value('id');
            $idPriv = User::select('idPrivilege')->where('provider_id', $provider_id)->value('idPrivilege');
            $userPriv = DB::table('privileges')->select('Name')->where('idPrivilege', '=', $idPriv)->value('Name');
            $this->access_token = hash('sha256', (time() . "_" . $userID . "_" . $userPriv . "secretToken"));
            User::where('provider_id', $provider_id)->update(['remember_token' => $this->access_token]);
        }
        else { $this->access_token = User::select('remember_token')->where('provider_id', $provider_id)->value('remember_token'); }
    }
}
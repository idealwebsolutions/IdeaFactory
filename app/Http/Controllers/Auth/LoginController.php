<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\User;
use Auth;
use Socialite;

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
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('guest')->except('logout');
    }

    /**
     *
     *
     */
    public function redirectToProvider($provider='twitter') {
        return Socialite::driver($provider)->redirect();
    }
    
    /**
     *
     *
     */
    public function handleProviderCallback($provider='twitter') {
        $user = Socialite::driver($provider)->user();
        $authenticated = $this->findOrCreateUser($user);

        Auth::login($authenticated, true);

        return redirect($this->redirectTo);
    }
    
    /**
     *
     *
     */
    private function findOrCreateUser($user) {
        $authed = User::where('provider_id', $user->getId())->first();
        
        if (!$authed) {
            return User::create([
                'provider_id' => $user->getId(),
                'display_name' => $user->getNickname(),
                'avatar' => $user->getAvatar(),
                'email' => $user->getEmail(),
                'client_ip_address' => request()->ip(),
                'client_user_agent' => request()->userAgent()
            ]);
        }

        return $authed;
    } 
}

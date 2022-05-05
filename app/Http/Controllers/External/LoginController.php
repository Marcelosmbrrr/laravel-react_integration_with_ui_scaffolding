<?php

namespace App\Http\Controllers\External;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
// Model
use App\Models\User;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {

        $credentials = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'password' => ['required'],
        ]);

        try{

            // Guard
            // Login as admin and user
    
            if (Auth::attempt($credentials)) {

                $request->session()->regenerate();
    
                return response(["message" => "Access Authorized!"]);

            }else{

                return response(["message" => "Invalid Credentials!"], 404);

            }
 
        }catch(\Exception $e){

            Log::error($e);

            return response("", 500);

        }
    }
}

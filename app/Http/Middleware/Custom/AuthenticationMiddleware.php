<?php

namespace App\Http\Middleware\Custom;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationMiddleware
{
    /**
     * Path acessible just for authenticated users.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function handle(Request $request, Closure $next)
    {

        if (!Auth::check()) {

            Auth::logout();
 
            $request->session()->invalidate();
        
            $request->session()->regenerateToken();
        
            return redirect('/login');

        }

        return $next($request);

    }
}

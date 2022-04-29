<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
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
        
            return redirect('/');

        }

        return $next($request);

    }
}

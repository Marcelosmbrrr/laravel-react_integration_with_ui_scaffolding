<?php

namespace App\Http\Controllers\External;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
// Form Request
use App\Http\Requests\Auth\ChangePasswordWithTokenRequest;
use App\Http\Requests\Auth\ChangePasswordGetTokenRequest;
// Model
use App\Models\UserModel;
use App\Models\PasswordResetModel;

class ChangePasswordController extends Controller
{

    function getToken(Request $request) : \Illuminate\Http\Response{

        $credentials = $request->validate([
            'email' => ['required', 'email']
        ]);

        $random_string = Str::random(10);

        PasswordResetModel::createOrUpdate([
            "email" => $request->email, 
            "token" => $random_string
        ]);

        return response("Success! Check your email.", 200);

    }

    function updatePassword(Request $request, $id) : \Illuminate\Http\Response {

        try{

            $credentials = $request->validate([
                'token' => ['required', 'string'],
                'new_password' => ['required', 'confirmed']
            ]);

            $user = UserModel::where("id", $id)->get();

            $user->update(["password" => $request->password]);

            PasswordResetModel::where("email", $user->email)->delete();

            return response("Success! Your password has been changed.", 200);

        }catch(\Exception $e){
    
            Log::error($e);
    
        }

    }
    
}

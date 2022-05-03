<?php

namespace App\Http\Controllers\External;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
// Model
use App\Models\UserModel;
use App\Models\PasswordResetModel;
// Event
use App\Events\CodeCreatedEvent;
use App\Events\UserChangePasswordEvent;

class ChangePasswordController extends Controller
{

    function getToken(Request $request) {

        $credentials = $request->validate([
            'email' => ["required", "email", "exists:users,email"]
        ]);

        try{

            $user = UserModel::where("email", $request->email)->get();

            $random_string = Str::random(10);

            PasswordResetModel::create([
                "email" => $user[0]->email, 
                "token" => $random_string,
                "created_at" => date("Y-m-d H:i:s")
            ]);

            // Send Code to Email
            event(new CodeCreatedEvent($user[0]->name, $user[0]->email, $random_string));
    
            return response("Success! Check your email.", 200);

        }catch(\Exception $e){

            Log::error($e->getMessage());

            return response("Server Error", 500);
        }

    }

    function updatePassword(Request $request)  {

        try{

            $credentials = $request->validate([
                'token' => ['required', 'string'],
                'new_password' => ['required', 'confirmed']
            ]);

            $record = PasswordResetModel::where("code", $request->code)->get();

            $user = UserModel::where("email", $record[0]->email)->get();

            $user->update(["password" => $request->new_password]);

            PasswordResetModel::where("email", $user[0]->email)->delete();

            event(new UserChangePasswordEvent($user[0]->name, $user[0]->email));

            return response("Success! Your password has been changed.", 200);

        }catch(\Exception $e){
    
            Log::error($e->getMessage());

            return response("Server Error", 500);
    
        }

    }
    
}

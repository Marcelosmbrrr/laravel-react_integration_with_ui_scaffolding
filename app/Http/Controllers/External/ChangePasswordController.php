<?php

namespace App\Http\Controllers\External;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
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

            DB::Transaction(function() use ($request){

                $user = UserModel::where("email", $request->email)->get();

                $random_string = Str::random(10);

                PasswordResetModel::create([
                    "email" => $user[0]->email, 
                    "token" => $random_string,
                    "created_at" => date("Y-m-d H:i:s")
                ]);

                // Send Code to Email
                event(new CodeCreatedEvent($user[0]->name, $user[0]->email, $random_string));

            });
    
            return response("Success! Check your email.", 200);

        }catch(\Exception $e){

            Log::error($e->getMessage());

            return response("Server Error", 500);
        }

    }

    function updatePassword(Request $request)  {

        $credentials = $request->validate([
            'code' => ['required', 'string'],
            'new_password' => ['required', 'confirmed']
        ]);

        try{

            DB::Transaction(function() use ($request){

                $pass_reset = PasswordResetModel::where("token", $request->code)->firstOrFail();

                $user = UserModel::where("email", $pass_reset->email)->firstOrFail();

                $user->update(["password" => $request->new_password]);

                PasswordResetModel::where("email", $user->email)->where("token", $request->code)->delete();

                event(new UserChangePasswordEvent($user->name, $user->email));

            });

            return response("Success! Your password has been changed.", 200);

        }catch(\Exception $e){
    
            Log::error($e->getMessage());

            return response("Server Error", 500);
    
        }

    }
    
}

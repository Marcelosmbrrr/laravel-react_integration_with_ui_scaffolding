<?php

namespace App\Http\Controllers\External;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
// Model
use App\Models\UserModel;
// Events
use App\Events\UserRegistrationEvent;


class RegistrationController extends Controller
{
    /**
     * Handle an registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registration(Request $request) 
    {

        $credentials = $request->validate([
            'name' => ['required', 'string'],
            'username' => ['required', 'string'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'unique:users,phone', 'numeric'],
            'password' => ['required', 'min:8', 'confirmed']
        ]);

        try{

            DB::transaction(function() use ($credentials, $request){

                $credentials["password"] = Hash::make($request->password);
        
                $new_user = UserModel::create($credentials);

                event(new UserRegistrationEvent($new_user->id, $request->name, $request->email));

            });

            return response("Registration successful", 200);
            
        }catch(\Exception $e){

            Log::error($e->getMessage());

            return response("Server Error", 500);

        }

       
    }

     /**
     * Handle an registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function confirmRegistration(Request $request) 
    {

        try{

            $decrypted_id = Crypt::decryptString(request()->user);

            DB::transaction(function() use ($decrypted_id){

                $user = UserModel::where("id", $decrypted_id)->get();

                $user[0]->update(["email_verified_at" => date('Y-m-d H:i:s')]);

            });
     
            return redirect("/login")->with("alert", "Your account has been activated.");
            
        }catch(\Exception $e){

            Log::error($e->getMessage());

            return response("Server Error", 500);

        }


    }
}

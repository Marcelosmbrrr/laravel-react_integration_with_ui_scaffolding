<?php

namespace App\Http\Controllers\External;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
// Model
use App\Models\UserModel;

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

        try{

            $credentials = $request->validate([
                'name' => ['required', 'string'],
                'email' => ['required', 'email'],
                'phone' => ['required', 'unique:users,phone'],
                'password' => ['required', 'min:8', 'confirmed'],
            ]);
    
            $data = [
                "name" => $request->name,
                "email" => $request->email,
                "phone" => $request->phone,
                "password" => Hash::make($request->password)
            ];
     
            UserModel::create($data);
     
            return response("Registration successful", 200);
            
        }catch(\Exception $e){

            Log::error($e);

        }

       
    }
}

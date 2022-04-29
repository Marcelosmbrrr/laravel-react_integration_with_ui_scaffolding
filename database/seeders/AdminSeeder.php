<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
// Model
use App\Models\UserModel;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserModel::create([
            "name" => "Admin",
            "email" => env("ADMIN_EMAIL"),
            "is_admin" => true, 
            "phone" => "5332234216",
            "password" => Hash::make(env("ADMIN_PASSWORD"))
        ]);
    }
}

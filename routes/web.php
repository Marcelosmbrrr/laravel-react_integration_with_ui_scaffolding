<?php

use Illuminate\Support\Facades\Route;
// External controllers
use App\Http\Controllers\External\LoginController;
use App\Http\Controllers\External\RegistrationController;
use App\Http\Controllers\External\ChangePasswordController;
// Internal Controllers
use App\Http\Controllers\Internal\HomeController;
use App\Http\Controllers\Internal\UserController;
use App\Http\Controllers\Internal\AdminController;


// === EXTERNAL ROUTES
Route::get("/", function(){ return redirect("/login"); });
Route::view("/{route}", "root")->where(["route" => "^(?!api|home|logout).*$"]); 

Route::post("/api/do-login", [LoginController::class, "authenticate"]);
Route::post("/api/do-registration", [RegistrationController::class, "registration"]);
Route::get("/api/do-confirm-registration", [RegistrationController::class, "confirmRegistration"]);
Route::post("/api/do-get-token", [ChangePasswordController::class, "getToken"]);
Route::patch("/api/do-change-password", [ChangePasswordController::class, "updatePassword"]);

// === INTERNAL ROUTES
Route::middleware(["auth.custom"])->group(function(){
    Route::get("/home", [HomeController::class, "index"]);
    Route::get("/logout", [HomeController::class, "logout"]);
    Route::apiResource("/api/user", UserController::class);
    Route::apiResource("/api/admin", AdminController::class);
});

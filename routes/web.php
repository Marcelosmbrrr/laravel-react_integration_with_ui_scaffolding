<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\External\LoginController;
use App\Http\Controllers\External\RegistrationController;
use App\Http\Controllers\External\ChangePasswordController;

// === EXTERNAL ROUTES
Route::get("/", function(){ return redirect("/login"); });
Route::view("/{route?}", "root");

Route::post("/do-login", [LoginController::class, "authenticate"]);
Route::post("/do-registration", [RegistrationController::class, "registration"]);
Route::post("/get-token", [ChangePasswordController::class, "getToken"]);
Route::patch("/do-change-password", [ChangePasswordController::class, "updatePassword"]);

// === INTERNAL ROUTES

<?php

use Illuminate\Support\Facades\Route;

// === EXTERNAL ROUTES
Route::get('/', function(){ return redirect("/login"); });
Route::view("/{route?}", "root");

// === AUTH ROUTES
//Auth::routes();

// === INTERNAL ROUTES

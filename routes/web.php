<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Inertia\Inertia;




Route::get('/users', [UserController::class, 'getUsers']);

//! ==================== MAIN PUBLIC ROUTES ====================
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

//! ==================== STATIC CONTENT PAGES ====================
Route::get('/about-us', fn() => Inertia::render('about-us'))->name('about-us');
Route::get('/ContactPage', fn() => Inertia::render('ContactPage'))->name('ContactPage');

//! ==================== INCLUDE AUTHENTICATION ROUTES ====================
require __DIR__ . '/auth.php';

//! ==================== FALLBACK ROUTE ====================
Route::fallback(fn() => Inertia::render('Errors/404'));
Route::get('/404', fn() => Inertia::render('Errors/404'))->name('404');

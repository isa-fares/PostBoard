<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();
        $userPosts = $user->posts()->latest()->take(5)->get();
        $totalPosts = $user->posts()->count();
        $recentPosts = \App\Models\Post::with('user')->latest()->take(5)->get();
        
        return Inertia::render('dashboard', [
            'userPosts' => $userPosts,
            'totalPosts' => $totalPosts,
            'recentPosts' => $recentPosts,
        ]);
    })->name('dashboard');

    // Posts CRUD Routes
    Route::resource('posts', \App\Http\Controllers\PostController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

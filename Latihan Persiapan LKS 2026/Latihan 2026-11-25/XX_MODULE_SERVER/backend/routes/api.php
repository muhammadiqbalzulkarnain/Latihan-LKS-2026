<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->controller(\App\Http\Controllers\AuthController::class)->group(function () {
        Route::post('register', 'register');
        Route::post('login', 'login');
        Route::post('logout', 'logout')->middleware('auth:sanctum');
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('posts')->controller(\App\Http\Controllers\PostController::class)->group(function () {
            Route::get('v2', 'getPost2');
            Route::post('', 'createPost');
            Route::get('', 'getPost');

            Route::middleware(\App\Http\Middleware\PostOwnerMiddleware::class)->missing([\App\Http\Controllers\PostController::class, 'notFound'])->group(function () {
                Route::delete('{post}', 'deletePost');
            });
        });

        Route::controller(\App\Http\Controllers\FollowController::class)->missing([\App\Http\Controllers\FollowController::class, 'notFound'])->group(function () {
            Route::prefix('users')->group(function () {
                Route::post('{user:username}/follow', 'follow');
                Route::delete('{user:username}/unfollow', 'unfollow');
                Route::get('{user:username}/following', 'getFollowing');
                Route::put('{user:username}/accept', 'accept');
                Route::get('{user:username}/followers', 'getFollowers');
                Route::get('', 'getAll');
                Route::get('{user:username}', 'getDetail');
            });
        });
    });
});

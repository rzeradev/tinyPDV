<?php

use App\Http\Controllers\Business\BusinessController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| These routes are loaded by the RouteServiceProvider within a group
| which is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return UserResource::make($request->user());
    });

    // Business Routes
    Route::post('/business', [BusinessController::class, 'store']);
    Route::get('/business/{business}', [BusinessController::class, 'index']);
    Route::put('/business/{business}', [BusinessController::class, 'update']);
    Route::delete('/business/{business}', [BusinessController::class, 'destroy']);
});

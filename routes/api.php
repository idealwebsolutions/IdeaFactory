<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/pins/{offset}/{filter}', function ($offset, $filter) {
    $pin_collection = DB::table('pins')
      ->select('pins.*', 'users.display_name as author')
      ->join('users', 'users.id', '=', 'pins.author')
      ->offset($offset)
      ->limit(24)
      ->orderBy('id', 'desc')
      ->get();

    $pins = [];

    foreach ($pin_collection as $pin) {
      array_push($pins, $pin);
    }

    return response()->json([
      'pins' => $pins
    ]);    
});

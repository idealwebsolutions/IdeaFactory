<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'MainController@index')->name('home');
Route::get('/discover', 'MainController@discover')->name('discover');
Route::get('/{profile}', 'ProfileController@index')->name('profile');

// OAuth routes
Route::get('/login', 'Auth\LoginController@redirectToProvider')->name('login');
Route::get('/auth/twitter/callback', 'Auth\LoginController@handleProviderCallback');


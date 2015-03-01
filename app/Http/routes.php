<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

Route::get('employee', 'EmployeeController@index');
Route::get('employee/groups-members', 'GroupsMembersController@index');

Route::resource('api/group', 'api\GroupController');
Route::resource('api/groups-members', 'api\GroupsMembersController');
Route::resource('api/group-members-status', 'api\GroupMembersStatusController');
Route::resource('api/guide', 'api\GuideController');
Route::resource('api/contact', 'api\ContactController');

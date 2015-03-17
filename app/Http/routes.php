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

Route::get('/', 'HomeController@index');

Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

Route::get('employee', 'EmployeeController@index');
Route::get('employee/contacts', 'ContactController@index');
Route::get('employee/groups', 'GroupController@index');
Route::get('employee/guides', 'GuideController@index');
Route::get('employee/groups-members', 'GroupsMembersController@index');
Route::get('employee/cycles', 'CycleController@index');

Route::get('admin', 'AdminController@index');

Route::resource('api/contact', 'api\ContantController');
Route::resource('api/group', 'api\GroupController');
Route::resource('api/group-status', 'api\GroupStatusController');
Route::resource('api/groups-members', 'api\GroupsMembersController');
Route::resource('api/group-members-status', 'api\GroupMembersStatusController');
Route::resource('api/guide', 'api\GuideController');
Route::resource('api/contact', 'api\ContactController');
Route::resource('api/cycle', 'api\CycleController');
Route::resource('api/cycle.groups', 'api\CycleGroupsController');

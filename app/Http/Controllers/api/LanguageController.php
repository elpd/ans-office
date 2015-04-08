<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class LanguageController extends Controller {

	/**
	* Display a listing of the resource.
	*
	* @return Response
	*/
	public function index()
	{
		$languages = ['en', 'he'];
		$topics = ['main'];
		$result = [];

		// TODO: find a way to return the real language files.
/*
		foreach($languages as $langName) {
				foreach($topics as $topicName) {
					$lang = include ('resource/lang/' . $langName . '/' . $topicName . '.php');
					$result[$langName] = $lang;
				}
		}
*/
		$result = [
			'en' => [
				'main' => [
					'id' => 'ID',
					'Id' => 'ID',
					'Roles' => 'Roles',
					'Name' => 'Name',
					'Email' => 'Email',
					'Slug' => 'Slug',
					'Description' => 'Description',
					'password' => 'Password',
                    'users' => 'Users'
					]
			],
			'he' => [
				'main' => [
					'id' => 'מזהה'
					]
				]
		];

		return $result;
	}
}

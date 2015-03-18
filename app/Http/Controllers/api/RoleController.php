<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Request;
use App\User;
use Hash;

class RoleController extends Controller {

	protected $biClass = 'App\User';

	use GeneralRestControlling {
		store as generalStore;
	}

	public function store() {
		$password = Request::get('password');
		$hashedPassword = Hash::make($password);

		Request::merge(['password' => $hashedPassword]);

		return $this->generalStore();
	}
}

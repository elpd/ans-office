<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Request;
use Hash;
use App\Role;

class RoleController extends Controller {

	protected $biClass = 'App\Role';

	use GeneralRestControlling;

}

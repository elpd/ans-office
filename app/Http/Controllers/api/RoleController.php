<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Request;
use Hash;
use App\Role;

class RoleController extends ApiController {

	protected $biClass = 'App\Role';

	use GeneralRestControlling;

}

<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Request;
use Hash;
use App\Http\Controllers\RestControllerTrait;

class RoleController extends ApiController {

	protected $class = 'App\Role';

	use RestControllerTrait;
}

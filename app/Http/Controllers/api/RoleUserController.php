<?php namespace App\Http\Controllers\api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;

class RoleUserController extends ApiController {

	protected $class = 'App\RoleUser';

	use RestControllerTrait;
}

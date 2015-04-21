<?php namespace App\Http\Controllers\api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;

class PermissionUserController extends ApiController {

	protected $class = 'App\PermissionUser';

	use RestControllerTrait;
}

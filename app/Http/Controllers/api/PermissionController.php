<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Request;
use App\Permmision;
use App\Http\Controllers\RestControllerTrait;

class PermissionController extends ApiController {

	protected $class = 'App\Permission';

	use RestControllerTrait;

}

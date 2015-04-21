<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;

class GroupController extends ApiController {

	protected $class = 'App\Group';

	use RestControllerTrait;
}

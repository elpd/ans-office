<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;

class CycleController extends ApiController {

	protected $class = 'App\Cycle';

	use RestControllerTrait;
}

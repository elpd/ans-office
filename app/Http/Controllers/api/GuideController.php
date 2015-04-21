<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;

class GuideController extends ApiController {
	protected $class = 'App\Guide';

	use RestControllerTrait;
}

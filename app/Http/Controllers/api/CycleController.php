<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Request;
use App\Cycle;

class CycleController extends ApiController {

	protected $biClass = 'App\Cycle';

	use GeneralRestControlling;
}

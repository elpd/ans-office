<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\GroupStatus;

class RequestStatusController extends ApiController {

	protected $biClass = 'App\RequestStatus';

	use GeneralRestControlling;
}

<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\GroupStatus;

class GroupStatusController extends ApiController {

	protected $biClass = 'App\GroupStatus';

	use GeneralRestControlling;
}

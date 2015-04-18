<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\Group;

class GroupController extends ApiController {

	protected $biClass = 'App\Group';

	use GeneralRestControlling;
}

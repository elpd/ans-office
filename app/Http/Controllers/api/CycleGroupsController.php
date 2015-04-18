<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;

use Illuminate\Http\Request;

class CycleGroupsController extends ApiController {

	protected $biParentClass = 'App\Cycle';
	protected $biClass = 'App\Group';
	protected $biClassPFName = 'groups';
	protected $biParentFName = 'cycle';

	use GeneralChildRestControlling;

}

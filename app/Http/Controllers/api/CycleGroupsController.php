<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class CycleGroupsController extends Controller {

	protected $biParentClass = 'App\Cycle';
	protected $biClass = 'App\Group';
	protected $biClassPFName = 'groups';

	use GeneralChildRestControlling;

}

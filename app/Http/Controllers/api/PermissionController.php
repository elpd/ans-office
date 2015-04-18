<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Request;
use App\Permmision;
use Hash;

class PermissionController extends ApiController {

	protected $biClass = 'App\Permission';

	use GeneralRestControlling;

}

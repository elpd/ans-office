<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Request;
use App\Permmision;
use Hash;

class PermissionController extends Controller {

	protected $biClass = 'App\Permission';

	use GeneralRestControlling;

}

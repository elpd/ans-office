<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Request;
use Bican\Roles\Models\Permission;
use Hash;

class PermissionController extends Controller {

	protected $biClass = 'Bican\Roles\Models\Permission';

	use GeneralRestControlling;

}

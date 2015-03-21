<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Request;
use Bican\Roles\Models\Role;
use Hash;

class RoleController extends Controller {

	protected $biClass = 'Bican\Roles\Models\Role';

	use GeneralRestControlling;

}

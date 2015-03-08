<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Request;
use App\GroupsMember;

class GroupsMembersController extends Controller {

	protected $biClass = 'App\GroupsMember';

	use GeneralRestControlling;
}

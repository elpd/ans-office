<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Request;
use App\GroupsMember;

class GroupsMembersController extends ApiController {

	protected $biClass = 'App\GroupsMember';

	use GeneralRestControlling;
}

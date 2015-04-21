<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Request;
use App\Http\Controllers\RestControllerTrait;

class GroupsMembersController extends ApiController {

	protected $class = 'App\GroupsMember';

	use RestControllerTrait;
}

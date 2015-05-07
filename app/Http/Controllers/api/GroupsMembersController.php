<?php namespace App\Http\Controllers\api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;
use Illuminate\Database\Eloquent\Builder;

class GroupsMembersController extends ApiController {

	protected $class = 'App\GroupsMember';
	protected $children_routes = [
		'groups' => '/api/group',
		'contacts' => '/api/contact',
	];

	use RestControllerTrait;
}

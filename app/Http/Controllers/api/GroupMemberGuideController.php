<?php namespace App\Http\Controllers\api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;
use Illuminate\Database\Eloquent\Builder;

class GroupMemberGuideController extends ApiController {

	protected $class = 'App\GroupMemberGuide';
	protected $children_routes = [
		'groups_members' => '/api/groups-members'
	];

	use RestControllerTrait;


}

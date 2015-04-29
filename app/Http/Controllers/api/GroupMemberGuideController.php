<?php namespace App\Http\Controllers\api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;
use Illuminate\Database\Eloquent\Builder;

class GroupMemberGuideController extends ApiController {

	protected $class = 'App\GroupMemberGuide';

	use RestControllerTrait;

	protected function buildInitialQuery(Builder $query) {
		$query
			->join('groups_members', 'groups_members_guides.groups_member_id', '=', 'groups_members.id')
			->select('groups_members_guides.*',
				'groups_members.group_id AS groups_members.group_id',
				'groups_members.contact_id AS groups_members.contact_id',
				'groups_members.status_id AS groups_members.status_id');


		return $query;
	}
}

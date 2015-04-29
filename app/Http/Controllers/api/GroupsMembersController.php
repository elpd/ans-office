<?php namespace App\Http\Controllers\api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;
use Illuminate\Database\Eloquent\Builder;

class GroupsMembersController extends ApiController {

	protected $class = 'App\GroupsMember';

	use RestControllerTrait;

	protected function buildInitialQuery(Builder $query) {
		$query
			->join('groups', 'groups_members.group_id', '=', 'groups.id')
			->join('contacts', 'groups_members.contact_id', '=', 'contacts.id')
			->select('groups_members.*',
				'groups.cycle_id AS groups.cycle_id',
				'groups.name AS groups.name',
				'groups.status_id AS groups.status_id',
			    'contacts.email AS contacts.email',
				'contacts.first_name AS contacts.first_name',
			    'contacts.last_name AS contacts.last_name'
			);

		return $query;
	}
}

<?php namespace App\Http\Controllers\api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;
use Illuminate\Database\Eloquent\Builder;

class ContactController extends ApiController {

	protected $class = 'App\Contact';

	use RestControllerTrait;

	protected function buildInitialQuery(Builder $query) {
		$query
			->join('etgar22', 'contacts.id', '=', 'etgar22.contact_id')
			->select('contacts.*', 'etgar22.facebook_know_how AS etgar22.facebook_know_how',
					'etgar22.call_for_facebook_help AS etgar22.call_for_facebook_help',
				'etgar22.registration_date AS etgar22.registration_date',
				'etgar22.notes AS etgar22.notes',
				'etgar22.next_call AS etgar22.next_call',
				'etgar22.why_go_vegan AS etgar22.why_go_vegan',
				'etgar22.parent_name AS etgar22.parent_name',
				'etgar22.parent_email AS etgar22.parent_email'
			);

		return $query;
	}
}

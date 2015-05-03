<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;
use Illuminate\Database\Eloquent\Builder;

class GuideController extends ApiController {
	protected $class = 'App\RoleUser';

	use RestControllerTrait;

	protected function buildInitialQuery(Builder $query) {
		$query->whoAreGuides();

		return $query;
	}

	protected function setAdditionalQueryFilters(Builder $query){
		//return $query->whoAreGuides();
		return $query;
	}
}

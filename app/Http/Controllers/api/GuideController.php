<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;
use App\Utilities\Query\Builder;

class GuideController extends ApiController {
	protected $class = 'App\RoleUser';

	use RestControllerTrait;

	protected function buildInitialQuery(Builder $query) {
		$query->getOriginal()->whoAreGuides()->with('user');
	}


}

<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;
use Illuminate\Database\Eloquent\Builder;

class GuideController extends ApiController {
	protected $class = 'App\RoleUser';

	use RestControllerTrait;

	protected function setAdditionalQueryFilters(Builder $query){
		return $query->whoAreGuides();
	}
}

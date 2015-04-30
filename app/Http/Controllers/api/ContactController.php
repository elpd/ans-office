<?php namespace App\Http\Controllers\api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;
use Illuminate\Database\Eloquent\Builder;

class ContactController extends ApiController {

	protected $class = 'App\Contact';

	use RestControllerTrait;

	protected function buildInitialQuery(Builder $query) {

		return $query;
	}
}

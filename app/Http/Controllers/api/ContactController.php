<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;

class ContactController extends ApiController {

	protected $class = 'App\Contact';

	use RestControllerTrait;
}

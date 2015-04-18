<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Contact;

class ContactController extends ApiController {

	protected $biClass = 'App\Contact';

	use GeneralRestControlling;
}

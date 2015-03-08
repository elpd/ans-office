<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Contact;

class ContactController extends Controller {

	protected $biClass = 'App\Contact';

	use GeneralRestControlling;
}

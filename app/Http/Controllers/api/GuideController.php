<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Guide;

class GuideController extends Controller {
	protected $biClass = 'App\Guide';

	use GeneralRestControlling;
}

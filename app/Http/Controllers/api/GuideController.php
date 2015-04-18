<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Guide;

class GuideController extends ApiController {
	protected $biClass = 'App\Guide';

	use GeneralRestControlling;
}

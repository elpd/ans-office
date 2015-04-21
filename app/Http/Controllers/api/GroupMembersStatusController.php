<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\GroupMembersStatus;

class GroupMembersStatusController extends ApiController {

	protected $biClass = 'App\GroupMembersStatus';

	use GeneralRestControlling;
}

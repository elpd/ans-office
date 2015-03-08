<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\GroupMembersStatus;

class GroupMembersStatusController extends Controller {

	protected $biClass = 'App\GroupMembersStatus';

	use GeneralRestControlling;
}

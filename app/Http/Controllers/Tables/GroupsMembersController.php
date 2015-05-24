<?php namespace App\Http\Controllers\Tables;

use App\Http\Controllers\Controller;

class GroupsMembersController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('table.groupsMembers')->with('selected_view', 'groups_members');;
	}

}

<?php namespace App\Http\Controllers\Tables;

use App\Http\Controllers\Controller;

class CycleController extends Controller {


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
		return view('table.cycles')->with('selected_view', 'cycles');;
	}

}

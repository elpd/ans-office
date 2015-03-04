<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Request;
use App\GroupsMember;

class GroupsMembersController extends Controller {

	protected $biClass = 'App\GroupsMember';

	use GeneralRestControlling;

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
		abort(404);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
		abort(404);
	}	

}

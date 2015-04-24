<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;
use Illuminate\Http\Request;

class Etgar22RegistrationRequestController extends ApiController {

	protected $class = 'App\Etgar22RegistrationRequest';

	use RestControllerTrait {
		index as generalIndex;
		store as generalStore;
		update as generalUpdate;
		destroy as generalDestroy;
	}

	public function store(Request $request) {
		$statusNew = \App\RequestStatus::statusNew()->firstOrFail();
		$request->merge(['request_status_id' => $statusNew->id]);

		return $this->generalStore($request);
	}

	protected function afterStore(Request $request, $item) {
		$item->process();
	}
}

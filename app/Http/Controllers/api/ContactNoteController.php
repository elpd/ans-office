<?php namespace App\Http\Controllers\api;


use App\Http\Controllers\ApiController;
use App\Http\Controllers\RestControllerTrait;
use Illuminate\Http\Request;

class ContactNoteController extends ApiController
{

    protected $class = 'App\ContactNote';

    use RestControllerTrait {
        store as generalStore;
        update as generalUpdate;
    }

    public function store(Request $request)
    {
        $currentUser = $request->user();

        $request->merge(['user_id' => $currentUser->id]);

        return $this->generalStore($request);
    }


}

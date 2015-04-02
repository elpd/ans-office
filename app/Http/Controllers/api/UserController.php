<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Request;
use App\User;
use Hash;

class UserController extends Controller
{

    protected $biClass = 'App\User';

    use GeneralRestControlling {
        store as generalStore;
    }

    public function store()
    {
        $password = Request::get('password');
        $hashedPassword = Hash::make($password);
        $password_confirmation = $hashedPassword; // TODO: f#42

        Request::merge([
            'password' => $hashedPassword,
            'password_confirmation' => $password_confirmation
        ]);

        return $this->generalStore();
    }
}

<?php namespace App\Http\Controllers\api\User;

use App\Http\Controllers\Controller;

class EmailController extends Controller
{
    public function show()
    {
        $user = \Auth::user();

        return [
            'success' => true,
            'data' => [
                'email' => $user->email
            ]
        ];
    }

    public function update()
    {
        $user = \Auth::user();
        $data = \Request::input('data');
        $email = $data['email'];

        $user->email = $email;
        $user->save();

        return [
            'success' => true
        ];
    }
}
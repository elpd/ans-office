<?php namespace App\Http\Controllers\api\User;

use App\Http\Controllers\Controller;

class PasswordController extends Controller
{
    /*public function show()
    {
        $user = \Auth::user();

        return [
            'success' => true,
            'data' => [
                'email' => $user->email
            ]
        ];
    }*/

    public function update()
    {
        $user = \Auth::user();
        $data = \Request::input('data');
        $password = $data['password'];
        $password_confirmation = $data['password_confirmation'];

        $user->password = $password;
        $user->password_confirmation = $password_confirmation;

        if ($user->save()) {
            return [
                'success' => true
            ];
        } else {
            return [
                'success' => false,
                'messages' => $user->getErrors()
            ];
        }

    }
}
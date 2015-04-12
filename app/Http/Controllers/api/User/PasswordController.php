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

        // TODO: standard validation
        if ($password != $password_confirmation) {
            return [
                'success' => false,
                'messages' => ['passwords dont match']
            ];
        }

        $user->password = \Hash::make($password);

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
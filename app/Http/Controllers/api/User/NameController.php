<?php namespace App\Http\Controllers\api\User;

use App\Http\Controllers\Controller;

class NameController extends Controller
{
    public function show()
    {
        $user = \Auth::user();

        return [
            'success' => true,
            'data' => [
                'name' => $user->name
            ]
        ];
    }

    public function update()
    {
        $user = \Auth::user();
        $data = \Request::input('data');
        $name = $data['name'];

        $user->name = $name;
        $user->save();

        return [
            'success' => true
        ];
    }
}
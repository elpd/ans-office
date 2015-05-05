<?php namespace App\Http\Controllers\api\User;

use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    public function show()
    {
        $user = \Auth::user();

        return [
            'success' => true,
            'data' => [
                'roles' => $user->roles()->get()
            ]
        ];
    }
}
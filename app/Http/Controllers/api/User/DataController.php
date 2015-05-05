<?php namespace App\Http\Controllers\api\User;

use App\Http\Controllers\Controller;

class DataController extends Controller
{
    public function show()
    {
        $user = \Auth::user();
        $permissions = $user->permissions();
        $languageDescription = \App\UiLanguage::findOrFail(
            $user->settings->ui_language_id
        );

        return [
            'success' => true,
            'data' => [
                'user' => $user,
                'roles' => $user->roles,
                'permissions' => $permissions,
                'settings' => $user->settings,
                'language_description' => $languageDescription,
            ]
        ];
    }
}
<?php namespace App\Http\Controllers\api\User;

use App\Http\Controllers\Controller;

class SettingsController extends Controller
{
    public function show()
    {
        $user = \Auth::user();
        $settings = $user->settings()->first();

        return [
            'success' => true,
            'data' => [
                'settings' => $settings
            ]
        ];
    }

    public function update()
    {
        $user = \Auth::user();
        $settingsInputs = \Request::input('data');

        $userSettings = $user->settings()->firstOrFail();

        // TODO: generic for each on fillable

        if(isset($settingsInputs['ui_language_id'])){
            $userSettings->ui_language_id = $settingsInputs['ui_language_id'];
        }

        if(isset($settingsInputs['ui_theme_id'])){
            $userSettings->ui_theme_id = $settingsInputs['ui_theme_id'];
        }

        if ($userSettings->save()) {
            return [
                'success' => true
            ];
        } else {
            return [
                'success' => false,
                'messages' => $userSettings->getErrors()
            ];
        }
    }
}
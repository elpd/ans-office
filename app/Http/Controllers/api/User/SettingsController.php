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

        if (isset($settingsInputs['ui_language_id'])) {
            $userSettings->ui_language_id = $settingsInputs['ui_language_id'];
        }

        if (isset($settingsInputs['ui_bootstrap_theme_id'])) {
            $userSettings->ui_bootstrap_theme_id = $settingsInputs['ui_bootstrap_theme_id'];
        }

        if (isset($settingsInputs['ui_jquery_ui_theme_id'])) {
            $userSettings->ui_jquery_ui_theme_id = $settingsInputs['ui_jquery_ui_theme_id'];
        }

        try {
            $userSettings->saveOrFail();
            return [
                'success' => true,
                'messages' => [
                    \Lang::get('controller_messages.user_settings_was_changed_successfully')
                ]
            ];

        } catch (ValidationException $e) {

            return response()->json([
                'success' => false,
                'messages' => $e->getErrors()
            ], 400);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'messages' => [
                    \Lang::get('controller_messages.general_error')
                ]
            ], 400);
        }
    }
}
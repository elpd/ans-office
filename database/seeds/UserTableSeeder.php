<?php

use Illuminate\Database\Seeder;
use Bican\Roles\Models\Role;
use App\User;
use App\UiLanguage;
use App\UiTheme;
use App\Settings;

class UserTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('users')->delete();

        $initialPassword = Hash::make('root');
        $initialUserPassword = Hash::make('user');

        $adminRole = Role::where('slug', '=', 'admin')->firstOrFail();
        $employeeRole = Role::where('slug', '=', 'employee')->firstOrFail();

        $englishUiLanguage = UiLanguage::where('name', '=', 'English')->firstOrFail();
        $hebrewUiLanguage = UiLanguage::where('name', '=', 'Hebrew')->firstOrFail();
        $lumenUiTheme = UiTheme::where('name', '=', 'lumen')->firstOrFail();

        $sampleData = [
            [
                'user' => [
                    'name' => 'root',
                    'email' => 'root@example.com',
                    'password' => $initialPassword,
                    'password_confirmation' => $initialPassword,
                ],
                'roles' => [
                    $adminRole,
                    $employeeRole,
                ],
                'settings' => [
                    'ui_language' => $englishUiLanguage,
                    'ui_theme' => $lumenUiTheme
                ]
            ],
            [
                'user' => [
                    'name' => 'user_1',
                    'email' => 'user_1@example.com',
                    'password' => $initialUserPassword,
                    'password_confirmation' => $initialUserPassword,
                ],
                'roles' => [
                    $employeeRole
                ],
                'settings' => [
                    'ui_language' => $hebrewUiLanguage,
                    'ui_theme' => $lumenUiTheme
                ]
            ]
        ];

        foreach ($sampleData as $sampleUser) {
            $newItem = User::create($sampleUser['user']);

            foreach ($sampleUser['roles'] as $desiredRole) {
                $newItem->attachRole($desiredRole);
            }

            if (isset($sampleUser['settings'])) {
                $settings = $sampleUser['settings'];
                $settingsDb = new Settings();
                $settingsDb->user()->associate($newItem);
                if (isset($settings['ui_language'])){
                    $selectedLanguage = $settings['ui_language'];
                    $settingsDb->ui_language()->associate($selectedLanguage);
                }
                if (isset($settings['ui_theme'])){
                    $selectedTheme = $settings['ui_theme'];
                    $settingsDb->ui_theme()->associate($selectedTheme);
                }
                $newItem->settings()->save($settingsDb);
            }

            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        }
    }
}

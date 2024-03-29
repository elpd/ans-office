<?php

use Illuminate\Database\Seeder;
use Bican\Roles\Models\Role;
use App\User;
use App\UiLanguage;
use App\UiBootstrapTheme;
use App\UiJqueryUiTheme;
use App\Settings;

class UserTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('users')->delete();

        $adminRole = Role::where('slug', '=', 'admin')->firstOrFail();
        $employeeRole = Role::where('slug', '=', 'employee')->firstOrFail();
        $userRole = Role::where('slug', '=', 'user')->firstOrFail();
        $etgar22firstTimeRegistarRole = Role::where('slug', '=', 'etgar22firsttimeregistrar')->firstOrFail();
        $guideRole = Role::where('slug', '=', 'guide')->firstOrFail();
        $etgar22registrarRole = Role::where('slug', '=', 'etgar22registrar')->firstOrFail();

        $englishUiLanguage = UiLanguage::where('name', '=', 'English')->firstOrFail();
        $hebrewUiLanguage = UiLanguage::where('name', '=', 'Hebrew')->firstOrFail();
        $lumenUiTheme = UiBootstrapTheme::where('name', '=', 'lumen')->firstOrFail();
        $redmondJqUiTheme = UiJqueryUiTheme::where('name', '=', 'redmond')->firstOrFail();

        $sampleData = [
            [
                'user' => [
                    'name' => 'root',
                    'email' => 'root@example.com',
                    'password' => \Hash::make('root'),
                ],
                'roles' => [
                    $adminRole,
                    $employeeRole,
                    $guideRole,
                    $etgar22registrarRole,
                ],
                'settings' => [
                    'ui_language' => $englishUiLanguage,
                    'ui_bootstrap_theme' => $lumenUiTheme,
                    'ui_jquery_ui_theme' => $redmondJqUiTheme,
                ]
            ],
            [
                'user' => [
                    'name' => 'employee',
                    'email' => 'employee@example.com',
                    'password' => \Hash::make('employee'),
                ],
                'roles' => [
                    $employeeRole
                ],
                'settings' => [
                    'ui_language' => $englishUiLanguage,
                    'ui_bootstrap_theme' => $lumenUiTheme,
                    'ui_jquery_ui_theme' => $redmondJqUiTheme,
                ]
            ],
            [
                'user' => [
                    'name' => 'user',
                    'email' => 'user@example.com',
                    'password' => \Hash::make('user'),
                ],
                'roles' => [
                    $userRole
                ],
                'settings' => [
                    'ui_language' => $hebrewUiLanguage,
                    'ui_bootstrap_theme' => $lumenUiTheme,
                    'ui_jquery_ui_theme' => $redmondJqUiTheme,
                ]
            ],
            [
                'user' => [
                    'name' => 'user1_etgar22registrator',
                    'email' => 'user1_etgar22registrator@anonymous.org.il',
                    'password' => \Hash::make('user1_etgar22registrator'),
                ],
                'roles' => [
                    $etgar22firstTimeRegistarRole
                ],
                'settings' => [
                    'ui_language' => $hebrewUiLanguage,
                    'ui_bootstrap_theme' => $lumenUiTheme,
                    'ui_jquery_ui_theme' => $redmondJqUiTheme,
                ]
            ], [
                'user' => [
                    'name' => 'guide1',
                    'email' => 'guide1@example.com',
                    'password' => \Hash::make('guide1'),
                ],
                'roles' => [
                    $guideRole
                ],
                'settings' => [
                    'ui_language' => $englishUiLanguage,
                    'ui_bootstrap_theme' => $lumenUiTheme,
                    'ui_jquery_ui_theme' => $redmondJqUiTheme,
                ]
            ], [
                'user' => [
                    'name' => 'guide2',
                    'email' => 'guide2@example.com',
                    'password' => \Hash::make('guide2'),
                ],
                'roles' => [
                    $guideRole
                ],
                'settings' => [
                    'ui_language' => $englishUiLanguage,
                    'ui_bootstrap_theme' => $lumenUiTheme,
                    'ui_jquery_ui_theme' => $redmondJqUiTheme,
                ]
            ],
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
                if (isset($settings['ui_language'])) {
                    $selectedLanguage = $settings['ui_language'];
                    $settingsDb->ui_language()->associate($selectedLanguage);
                }
                if (isset($settings['ui_bootstrap_theme'])) {
                    $selectedTheme = $settings['ui_bootstrap_theme'];
                    $settingsDb->ui_bootstrap_theme()->associate($selectedTheme);
                }
                if (isset($settings['ui_jquery_ui_theme'])) {
                    $selectedTheme = $settings['ui_jquery_ui_theme'];
                    $settingsDb->ui_jquery_ui_theme()->associate($selectedTheme);
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

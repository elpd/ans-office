<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Controllers\RestControllerTrait;
use App\Settings;
use App\UiLanguage;
use App\UiBootstrapTheme;
use App\UiJqueryUiTheme;

class UserController extends ApiController
{
    protected $class = 'App\User';

    use RestControllerTrait {
        store as generalStore;
        update as generalUpdate;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'password' => 'confirmed|alpha_dash|required|between:6,20',
        ]);

        $hashedPassword = \Hash::make($request->get('password'));
        $request->merge(['password' => $hashedPassword]);

        return $this->generalStore($request);
    }

    protected function storeChildren($user)
    {
        $userSettings = new Settings();

        // Settings defaults

        $englishUiLanguage = UiLanguage::where('name', '=', 'English')->firstOrFail();
        $lumenUiTheme = UiBootstrapTheme::where('name', '=', 'lumen')->firstOrFail();
        $redmondJqUiTheme = UiJqueryUiTheme::where('name', '=', 'redmond')->firstOrFail();

        $userSettings->ui_language()->associate($englishUiLanguage);
        $userSettings->ui_bootstrap_theme()->associate($lumenUiTheme);
        $userSettings->ui_jquery_ui_theme()->associate($redmondJqUiTheme);

        $user->settings()->save($userSettings);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'password' => 'confirmed|alpha_dash|between:6,20',
        ]);

        $hashedPassword = \Hash::make($request->get('password'));
        $request->merge(['password' => $hashedPassword]);

        return $this->generalUpdate($id);
    }
}

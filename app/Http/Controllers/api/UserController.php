<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Settings;
use App\UiLanguage;
use App\UiTheme;

class UserController extends Controller
{

    protected $biClass = 'App\User';

    use GeneralRestControlling {
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

        return $this->generalStore();
    }

    protected function storeChildren($user)
    {
        $userSettings = new Settings();

        // Settings defaults

        $englishUiLanguage = UiLanguage::where('name', '=', 'English')->firstOrFail();
        $lumenUiTheme = UiTheme::where('name', '=', 'lumen')->firstOrFail();

        $userSettings->ui_language()->associate($englishUiLanguage);
        $userSettings->ui_theme()->associate($lumenUiTheme);

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

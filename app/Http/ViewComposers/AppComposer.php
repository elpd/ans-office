<?php namespace App\Http\ViewComposers;

use Illuminate\Contracts\View\View;

//use Illuminate\Users\Repository as UserRepository;

class AppComposer
{

    /**
     * The user repository implementation.
     *
     * @var UserRepository
     */
    protected $users;

    /**
     * Create a new profile composer.
     *
     * @param  UserRepository $users
     * @return void
     */
    public function __construct() //UserRepository $users)
    {
        // Dependencies automatically resolved by service container...
        //$this->users = $users;
    }

    /**
     * Bind data to the view.
     *
     * @param  View $view
     * @return void
     */
    public function compose(View $view)
    {
        $user = \Auth::user();
        if ($user) {
            $userSettings = $user->settings()->firstOrFail();

            $view->with('userSettings', $userSettings);
        } else {
            $view->with('userSettings', null);
        }
    }

}

<?php namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ComposerServiceProvider extends ServiceProvider {

	/**
	 * Bootstrap the application services.
	 *
	 * @return void
	 */
	public function boot()
	{
		//
	}

	/**
	 * Register the application services.
	 *
	 * @return void
	 */
	public function register()
	{
		//
        \View::composer([
            'app',
            'employee',
            'admin',
            'admin.users',
            'admin.roles',
            'admin.permissions',
            'user.settings',
            'user.settings.general',
            'employee.contacts',
            'employee.cycles',
            'employee.groups',
            'employee.guides',
            'employee.groupsMembers',
        ], 'App\Http\ViewComposers\AppComposer');
    }

}

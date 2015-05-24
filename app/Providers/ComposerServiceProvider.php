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
            'logged',
            'table',
            'admin',
            'admin.users',
            'admin.roles',
            'admin.permissions',
            'user.settings',
            'user.settings.general',
            'table.contacts',
            'table.cycles',
            'table.groups',
            'table.guides',
            'table.groupsMembersGuides',
            'table.groupsMembers',
            'table.etgar22RegistrationRequests',
        ], 'App\Http\ViewComposers\AppComposer');
    }

}

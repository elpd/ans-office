<?php namespace App\Providers;

use App\Utilities\Query\SchemaRepository;
use Illuminate\Support\ServiceProvider;

class DbRepositoryProvider extends ServiceProvider {

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
		$this->app->singleton('DbRepository', function($app)
		{
			$repository = new SchemaRepository();

			return $repository;
		});
	}

}

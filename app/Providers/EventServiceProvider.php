<?php namespace App\Providers;

use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use League\Flysystem\Exception;

class EventServiceProvider extends ServiceProvider {

	/**
	 * The event handler mappings for the application.
	 *
	 * @var array
	 */
	protected $listen = [
		'event.name' => [
			'EventListener',
		],
	];

	/**
	 * Register any other events for your application.
	 *
	 * @param  \Illuminate\Contracts\Events\Dispatcher  $events
	 * @return void
	 */
	public function boot(DispatcherContract $events)
	{
		parent::boot($events);

		if (\Config::get('database.log', false))
		{
			\DB::listen(function($query, $bindings, $time, $name)
			{
				$data = compact('bindings', 'time', 'name');

				// Format binding data for sql insertion
				foreach ($bindings as $i => $binding)
				{
					if ($binding instanceof \DateTime)
					{
						$bindings[$i] = $binding->format('\'Y-m-d H:i:s\'');
					}
					else if (is_string($binding))
					{
						$bindings[$i] = "'$binding'";
					}
				}

				// Insert bindings into query
				$query = str_replace(array('%', '?'), array('%%', '%s'), $query);
				$query = vsprintf($query, $bindings);

				\Log::info($query, $data);
			});
		}
	}

}

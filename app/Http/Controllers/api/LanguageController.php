<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Illuminate\Foundation\Application;

class LanguageController extends ApiController {

    public function __construct(Application $app)
    {
        $this->app = $app;
    }

	/**
	* Display a listing of the resource.
	*
	* @return Response
	*/
	public function index()
	{
        $namespaces = ['*'];
		$locales = ['en', 'he'];
        $groups = ['main', 'pagination', 'passwords', 'validation', 'bo'];
        $translations = [];

        $loader = $this->app['translation.loader'];

        foreach ($namespaces as $namespace) {
            foreach($locales as $locale) {
                foreach($groups as $group) {
                    $lines = $loader->load($locale, $group, $namespace);

                    $translations[$namespace][$group][$locale] = $lines;
                }
            }
        }

        return $translations;

		// TODO: find a way to return the real language files.

        $loader = $this->app['translation.loader'];

        $locale = 'en';
        $group = 'main';
        $namespace = '*';

        $lines = $loader->load($locale, $group, $namespace);

        $result[$namespace][$group][$locale] = $lines;

        return $result;
	}
}

<?php namespace App\Http\Middleware;

use Closure;

class UserSettings {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
        $currentUser = \Auth::user();
        if ($currentUser != null) {
            $language_code = $currentUser->settings->ui_language->code;
            \App::setLocale($language_code);
        }
		return $next($request);
	}

}

<?php namespace App\Http\Middleware;

use Closure;

class AuthorizeApi {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
        $user = $request->user();
        $routeResolver = $request->getRouteResolver();
        $route = $routeResolver();
        $actionFull = $route->getAction()['as'];
        $actionFullSlug = str_slug($actionFull, \Config::get('roles.separator'));

        if (! $user->can($actionFullSlug)){
            if ($request->ajax())
            {
                return response('Unauthorized.', 401);
            }
            else
            {
                return redirect()->guest('auth/login');
            }
        }

		return $next($request);
	}

}

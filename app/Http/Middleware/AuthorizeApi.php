<?php namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthorizeApi {

    protected static $CONTROLLER_ACTIONS_NAMES = ['index', 'show', 'store', 'update', 'destroy'];

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
        $action = $this->calcRequestedAction($request);

        if (! $user->can($action)){
            if ($request->ajax())
            {
                return response()->json([
                    'success' => false,
                    'errors' => [
                        'Unauthorized.'
                        ]
                    ], 401);
            }
            else
            {
                return redirect()->guest('auth/login');
            }
        }

		return $next($request);
	}

    protected function calcRequestedAction(Request $request){
        $routeResolver = $request->getRouteResolver();
        $route = $routeResolver();

        $action = $route->getAction();
        $actionFull = $action['as'];
        $actionFullSlug = str_slug($actionFull, \Config::get('roles.separator'));

        $actionsNamesParts = explode('.', $actionFullSlug);
        $lastPartIndex = count($actionsNamesParts) - 1;
        $controllerActionName = $actionsNamesParts[$lastPartIndex];
        if (! in_array($controllerActionName, self::$CONTROLLER_ACTIONS_NAMES)){
            return '';
        }

        $controllerNamesParts = array_slice($actionsNamesParts, 0, $lastPartIndex);
        $constructedAction = implode('.', $controllerNamesParts);
        $constructedAction = $constructedAction . '.action.' . $controllerActionName;

        return $constructedAction;
    }

}

<?php namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class ApiController extends Controller {

    /**
     * Instantiate a new instance.
     */
    public function __construct()
    {
        $this->middleware('authorize.api');
    }
}

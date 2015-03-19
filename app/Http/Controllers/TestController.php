<?php namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;

class TestController extends Controller {


  /**
  * Create a new controller instance.
  *
  * @return void
  */
  public function __construct()
  {
    //$this->middleware('auth');
  }

  /**
  * Show the application dashboard to the user.
  *
  * @return Response
  */
  public function refresh()
  {
    try {
      Artisan::call('migrate:refresh');
      Artisan::call('db:seed');

      return ['success' => true];

    } catch (Exception $e) {
      Response::make($e->getMessage(), 500);
    }

  }

}

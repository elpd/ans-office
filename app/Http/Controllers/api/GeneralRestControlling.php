<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use Request;

trait GeneralRestControlling {

  /**
  * Display a listing of the resource.
  *
  * @return Response
  */
  public function index()
  {
    $class = $this->biClass;
    $items = $class::all();
    $itemsAsMap = $this->convertItemsToMap($items);
    return [
      'total' => 1,
      'page' => 1,
      'records' => count($items),
      'rows' => $itemsAsMap
    ];
  }

  protected function convertItemsToMap($items) {
      $map = $this->pluck_array_reduce($items->all());
      return $map;
  }

  function pluck_array_reduce($data) {
    return array_reduce(
      $data,
      function($result, $item) {
        $itemResult = [];
        $itemResult['id'] = $item->id;
        $itemResult['cell'] = $item;

        $result[] = $itemResult;

        return $result;
      }, array());
  }

  /**
  * Store a newly created resource in storage.
  *
  * @return Response
  */
  public function store() {
      $class = $this->biClass;
      $object = new $class();
      $input = Request::only($object->getFillable());
      foreach ($object->nullable as $nullableField) {
        if (array_key_exists ($nullableField, $input) && $input[$nullableField] === '' ) {
          $input[$nullableField] = null;
        }
      }

      $item = new $class($input);

      try {
        $item->saveOrFail();
        return [
          'success' => true,
          'item_id' => $item->id,
        ];
      }
      catch (\Watson\Validating\ValidationException $e) {
        return [
          'success' => false,
          'errors' => $e->getErrors(),
        ];
      }
      catch (\Exception $e) {
        if (property_exists($e, 'errorInfo')) {
          $errors = implode(',', $e->errorInfo);
        } else {
          $errors = ['general' => ['general error. See exception']];
        }

        return [
          'success' => false,
          'errors' => ['general' => $errors],
          'exception' => $e
        ];
      }
  }

  /**
  * Update the specified resource in storage.
  *
  * @param  int  $id
  * @return Response
  */
  public function update($id)
  {
    $class = $this->biClass;
    $object = new $class();

    $item = $class::findOrFail($id);
    $input = Request::only($object->getFillable());
    foreach ($object->nullable as $nullableField) {
      if (array_key_exists ($nullableField, $input) && $input[$nullableField] === '' ) {
        $input[$nullableField] = null;
      }
    }

    foreach($input as $inputKey => $inputValue) {
      $item->$inputKey = $inputValue;
    }

    $item->save();

    return ['success' => true];
  }

  /**
  * Remove the specified resource from storage.
  *
  * @param  int  $id
  * @return Response
  */
  public function destroy($id)
  {
    $class = $this->biClass;

    if ($id == -1) {
      $id = Request::get('id');
    }

    $item = $class::findOrFail($id);

    $item->delete();

    return [
      'success' => true,
      'item_id' => $id
    ];
  }

  /**
  * Show the form for creating a new resource.
  *
  * @return Response
  */
  public function create()
  {
    //
    abort(404);
  }

  /**
  * Display the specified resource.
  *
  * @param  int  $id
  * @return Response
  */
  public function show($id)
  {
    //
    abort(404);
  }

  /**
  * Show the form for editing the specified resource.
  *
  * @param  int  $id
  * @return Response
  */
  public function edit($id)
  {
    //
    abort(404);
  }
}

<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use Request;
use App\Utilities\GeneralUtilities as Utils;

trait GeneralChildRestControlling {
  /**
  * Display a listing of the resource.
  *
  * @return Response
  */
  public function index($parentId)
  {
    $parentClass = $this->biParentClass;
    $parent = $parentClass::findOrFail($parentId);

    $functionName = $this->biClassPFName;
    $items = $parent->$functionName;

    $itemsAsMap = Utils::convertItemsToMap($items);
    return [
      'total' => 1,
      'page' => 1,
      'records' => count($items),
      'rows' => $itemsAsMap
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
    abort('404');
  }

  /**
  * Store a newly created resource in storage.
  *
  * @return Response
  */
  public function store($parentId)
  {
    $parentClass = $this->biParentClass;
    $parent = $parentClass::findOrFail($parentId);

    $childClass = $this->biClass;

    $object = new $childClass();
    $input = Request::only($object->fillable);
    foreach ($object->nullable as $nullableField) {
      if (array_key_exists ($nullableField, $input) && $input[$nullableField] === '' ) {
        $input[$nullableField] = null;
      }
    }

    $item = new $childClass($input);

    //$functionName = $this->biClassPFName;
    $functionName = $this->biParentFName;

    try {
      //$item = $parent->$functionName()->save($child);
      $item->$functionName()->associate($parent);
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
        throw $e;
      }

      return [
        'success' => false,
        'errors' => ['general' => $errors],
        'exception' => $e
      ];
    }
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
    abort('404');
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
    abort('404');
  }

  /**
  * Update the specified resource in storage.
  *
  * @param  int  $id
  * @return Response
  */
  public function update($id)
  {
    //
    abort('404');
  }

  /**
  * Remove the specified resource from storage.
  *
  * @param  int  $id
  * @return Response
  */
  public function destroy($parentId, $id)
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
}

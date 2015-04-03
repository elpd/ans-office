<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use Request;

trait GeneralRestControlling
{

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

    protected function convertItemsToMap($items)
    {
        $map = $this->pluck_array_reduce($items->all());
        return $map;
    }

    function pluck_array_reduce($data)
    {
        return array_reduce(
            $data,
            function ($result, $item) {
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
    public function store()
    {
        $class = $this->biClass;

        $input = $this->getOnly($class);

        $item = new $class($input);

        try {
            \DB::transaction(function () use ($item) {
                $item->saveOrFail();

                if (method_exists($this, 'storeChildren')) {
                    $this->storeChildren($item);
                }
            });

            return [
                'success' => true,
                'item_id' => $item->id,
            ];
        } catch (\Watson\Validating\ValidationException $e) {
            return [
                'success' => false,
                'errors' => $e->getErrors(),
            ];
        } catch (\Exception $e) {
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
     * @param  int $id
     * @return Response
     */
    public function update($id)
    {
        $class = $this->biClass;

        $item = $class::findOrFail($id);

        $input = $this->getOnly($class);

        foreach ($input as $inputKey => $inputValue) {
            $item->$inputKey = $inputValue;
        }

        try {
            $item->saveOrFail();

            return [
                'success' => true,
                'item_id' => $item->id,
            ];
        } catch (\Watson\Validating\ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->getErrors(),
            ],400);
        } catch (\Exception $e) {
            if (property_exists($e, 'errorInfo')) {
                $errors = implode(',', $e->errorInfo);
            } else {
                $errors = ['general' => ['general error. See exception']];
            }

            return response()->json([
                'success' => false,
                'errors' => ['general' => $errors],
                'exception' => $e
            ], 400);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
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
     * @param  int $id
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
     * @param  int $id
     * @return Response
     */
    public function edit($id)
    {
        //
        abort(404);
    }

    protected  function getOnly($class) {
        $inputs = [];
        $object = new $class();

        $fillable = $object->getFillable();
        $all = \Request::all();

        foreach($fillable as $key) {
            if (array_key_exists($key, $all)){
                $inputs[$key] = $all[$key];
            }
        }

        return $inputs;
    }
}

<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use Request;

trait GeneralRestControlling
{
    var $MAX_ROWS_PER_PAGE = 1000;

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $requested_page = \Input::get('page');
        $requested_rows_per_page = \Input::get('rows');
        $requested_sorting_index = \Input::get('sidx');
        $requested_sorting_order = \Input::get('sord');

        $class = $this->biClass;

        $rows_per_page = $this->MAX_ROWS_PER_PAGE;
        if (is_nan($requested_rows_per_page) || $requested_rows_per_page > $this->MAX_ROWS_PER_PAGE) {
            // TODO: log error in input
        } else {
            $rows_per_page = $requested_rows_per_page;
        }

        $page = 1;
        if (is_nan($requested_page) || $requested_page < 1) {
            // TODO: log error in input
        } else {
            // TODO: standing issue. Can only set req var name globally in PaginationServiceProvider.
            $page = $requested_page;
        }

        $sorting_index = null;
        if ($requested_sorting_index != '') {
            $sorting_index = $requested_sorting_index;
        }

        $sorting_order = 'ASC';
        if (($requested_sorting_order == 'ASC' || $requested_sorting_order == 'DESC')) {
            // TODO: log error in input
        } else {
            $sorting_order = $requested_sorting_order;
        }

        // Query

        if ($sorting_index == '') {
            $items = $class::paginate($rows_per_page);
        } else {
            $items = $class::orderBy($sorting_index, $sorting_order)->paginate($rows_per_page);
        }

        $itemsAsMap = $this->convertItemsToMap($items);
        return [
            // Total pages for the query
            'total' => $items->lastPage(),
            // Current page
            'page' => $items->currentPage(),
            // total number of records for the query
            'records' => $items->total(),
            'rows' => $itemsAsMap
        ];
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
            ], 400);
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
        $class = $this->biClass;

        $item = $class::findOrFail($id);

        return $item;
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

    protected function getOnly($class)
    {
        $inputs = [];
        $object = new $class();

        $fillable = $object->getFillable();
        $all = \Request::all();

        foreach ($fillable as $key) {
            if (array_key_exists($key, $all)) {
                $inputs[$key] = $all[$key];
            }
        }

        return $inputs;
    }
}

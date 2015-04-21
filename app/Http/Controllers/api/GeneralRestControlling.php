<?php namespace App\Http\Controllers\api;

use App\Http\Requests;
use Illuminate\Http\Request;
use Watson\Validating\ValidationException;

trait GeneralRestControlling
{
    var $MAX_ROWS_PER_PAGE = 1000;

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $requested_page = \Input::get('page');
        $requested_rows_per_page = \Input::get('rows');
        $requested_sorting_index = \Input::get('sidx');
        $requested_sorting_order = \Input::get('sord');
        $is_search = \Input::get('_search');
        $search_filters_json = \Input::get('filters');
        $search_filters = \GuzzleHttp\json_decode($search_filters_json);
        $parentLink = \Input::get('parentLink');

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

        $queryBuilding = $class::query();

        if ($parentLink) {
            $classItem = new $class();
            $linkInfo = $classItem->links[$parentLink['linkName']];
            $parentClass = $linkInfo['class'];

            $parent = $parentClass::findOrFail($parentLink['parentId']);
            $queryBuilding = $parent->$linkInfo['functionNameOnParent']();
        }

        if ($sorting_index != '') {
            $queryBuilding = $queryBuilding->orderBy($sorting_index, $sorting_order);
        }

        if ($is_search == 'true') {
            $searchRoles = $search_filters->rules;
            foreach ($searchRoles as $rule) {
                $fieldName = $rule->field;
                $jqgrid_operator = $rule->op;
                $searchData = $rule->data;

                // TODO: transaltions and validation on rule attributes.

                switch ($jqgrid_operator) {
                    // cn: contains
                    case 'cn' :
                        $operator = 'LIKE';
                        $searchData = '%' . $searchData .'%';
                        break;
                    case 'eq':
                        $operator = '=';
                        break;
                    case 'ne':
                        $operator = '<>';
                        break;
                    case 'lt':
                        $operator = '<';
                        break;
                    case 'le':
                        $operator = '<=';
                        break;
                    case 'gt':
                        $operator = '>';
                        break;
                    case 'ge':
                        $operator = '>=';
                        break;
                    default:
                        throw new \Exception('unimplemented search operator');
                }

                $queryBuilding = $queryBuilding->where($fieldName, $operator, $searchData);
            }
        }

        $items = $queryBuilding->paginate($rows_per_page);

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
        $parentLink = \Input::get('parentLink');

        $item = new $class($input);

        try {
            \DB::transaction(function () use ($class, $item, $parentLink) {

                if ($parentLink) {
                    $classItem = new $class();
                    $linkInfo = $classItem->links[$parentLink['linkName']];
                    $parentClass = $linkInfo['class'];

                    $parent = $parentClass::findOrFail($linkInfo['parentId']);
                    $item->$linkInfo['functionName']()->associate($parent);
                }

                $item->saveOrFail();

                if (method_exists($this, 'storeChildren')) {
                    $this->storeChildren($item);
                }
            });

            return [
                'success' => true,
                'item_id' => $item->id,
            ];
        } catch (ValidationException $e) {
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
            $id = \Request::get('id');
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

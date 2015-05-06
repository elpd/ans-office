<?php namespace App\Http\Controllers;

use App\Utilities\GeneralUtilities as Utils;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Watson\Validating\ValidationException;

trait RestControllerTrait
{
    protected static $PAGE_TO_SHOW_REQ_PARAM = "page";
    protected static $PARENT_LINK_REQ_PARAM = "parentLink";
    protected static $SORTING_INDEX_REQ_PARAM = "sidx";
    protected static $SORTING_ORDER_REQ_PARAM = "sord";
    protected static $COL_MODEL_EXTRA_REQ_PARAM = 'colModelExtra';
    protected static $SEARCH_REQ_PARAM = '_search';
    protected static $SORT_ON_LINK_FIELD_REQ_PARAM = 'sortOnLinkField';
    protected static $SEARCH_ON_LINK_FIELD_REQ_PARAM = 'searchOnLinkField';
    protected static $FIRST_CHILD_JOIN_REQ_PARAM = 'firstChildJoin';

    protected static $MAX_ROWS_PER_PAGE = 1000;

    protected $existingJoins = [];

    public function index(Request $request)
    {
        $jqGridRequest = new \App\Utilities\JqGrid\Request($request);
        $queryParams = $jqGridRequest->getOrNewQueryParam();

        $rowsPerPage = $this->calcRowsPerPage($jqGridRequest);
        $query = $this->buildQuery($queryParams);

        if ($request->has(self::$PAGE_TO_SHOW_REQ_PARAM)) {
            $items = $query->paginate($rowsPerPage);
            $totalPages = $items->lastPage();
            $currentPage = $items->currentPage();
            $totalRecords = $items->total();
        } else {
            $items = $query->get();
            $totalPages = 1;
            $currentPage = 1;
            $totalRecords = $items->count();
        }
        $itemsAsMap = Utils::convertItemsToJqgridMap($items);

        return [
            // Total pages for the query
            'total' => $totalPages,
            // Current page
            'page' => $currentPage,
            // total number of records for the query
            'records' => $totalRecords,
            'rows' => $itemsAsMap
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $class = $this->class;

        $input = $this->getOnly($request, $class);
        $parentLink = $request->get(self::$PARENT_LINK_REQ_PARAM);

        $item = new $class($input);

        try {
            \DB::transaction(function () use ($class, $item, $parentLink, $request) {

                if ($parentLink) {
                    $linkInfo = $class::getLinkInfo($parentLink['childFieldName']);
                    $parentClass = $linkInfo['linkedClass'];
                    $parent = $parentClass::findOrFail($parentLink['id']);
                    $item->$linkInfo['functionOnChild']()->associate($parent);
                }

                $item->saveOrFail();

                if (method_exists($this, 'storeChildren')) {
                    $this->storeChildren($item);
                }

                if (method_exists($this, 'afterStore')) {
                    $this->afterStore($request, $item);
                }
            });

            \Log::info('record creation', [
                'class ' => $class,
                'user' => \Auth::user()->email,
                'record_id' => $item->id]);

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
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        $class = $this->class;

        if ($id == -1) {
            $id = \Request::get('id');
        }

        $item = $class::findOrFail($id);

        $item->delete();

        \Log::info('record deletion', [
            'class ' => $class,
            'user' => \Auth::user()->email,
            'record_id' => $item->id]);

        return [
            'success' => true,
            'item_id' => $id
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update(Request $request, Application $app, $id)
    {
        try {

            $class = $this->class;

            $item = $class::findOrFail($id);

            $input = $this->getOnly($request, $class);
            $childrenInput = $this->getChildrenInput($request);

            foreach ($input as $inputKey => $inputValue) {
                $item->$inputKey = $inputValue;
            }


            $item->saveOrFail();

            \Log::info('record update', [
                'class ' => $class,
                'user' => \Auth::user()->email,
                'record_id' => $item->id]);

            $children_responses = [];
            foreach ($childrenInput as $childName => $childInput) {
                $child_request = $this->generateChildRequest($childName, $childInput, $request);
                $app->instance('request', $child_request);
                $child_response = \Route::dispatch($child_request);
                $children_responses[$childName] = $child_response;
            }

            return [
                'success' => true,
                'item_id' => $item->id,
                'children_responses' => $children_responses,
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

    protected function getOnly($request, $class)
    {
        $inputs = [];
        $object = new $class();

        $fillable = $object->getFillable();
        $all = $request->all();

        foreach ($fillable as $key) {
            if (array_key_exists($key, $all)) {
                $inputs[$key] = $all[$key];
            }
        }

        return $inputs;
    }

    protected function getChildrenInput($request)
    {
        $children_input = [];

        $params = $request->all();
        foreach ($params as $paramKey => $paramValue) {
            if ($paramKey[0] != "_") {
                $child_data = explode('.', $paramKey);
                if (count($child_data) > 1) {
                    $child_name = $child_data[0];
                    if (!$this->childRouteExists($child_name)) {
                        throw new \Exception('child route for child parameters does not exist on controller');
                    }
                    if (!isset($children_input[$child_name])) {
                        $children_input[$child_name] = [];
                    }
                    $child_array_sub_name = array_slice($child_data, 1);
                    $child_sub_name = implode('.', $child_array_sub_name);

                    $children_input[$child_name][$child_sub_name] = $paramValue;
                }
            }
        }

        return $children_input;
    }

    protected function childRouteExists($child_name)
    {
        if (!isset($this->children_routes)) {
            return false;
        }

        foreach ($this->children_routes as $child_route_name => $child_route) {
            if ($child_name == $child_route_name) {
                return true;
            }
        }

        return false;
    }

    protected function generateChildRequest($child_name, $child_input, $request)
    {
        $childRequestData = $this->getChildRequestData($child_name);
        $child_route_url = $childRequestData . '/' . $child_input['id'];
        //$childRequest = Request::create($child_route_url, 'PUT', $child_input, $request->cookie());
        $server = $request->server();
        $server['REDIRECT_URL'] = $child_route_url;
        $server['REQUEST_URI'] = $child_route_url;
        $child_input['_token'] = $request->get('_token');

        $childRequest = $request->duplicate(null, $child_input, null, null, null, $server);
        //$childRequest->replace($child_input);
        //$childRequest->setMethod('PUT');
        //$childRequest = $request->create(
        //    $child_route_url, 'PUT', $child_input, $request->cookie(), [], $server, null);
        // $childRequest->setSession($request->session());
        $childRequest->initialize(
        //query
            [],
            // request
            $child_input,
            // attributes
            [],
            // cookies
            $request->cookie(),
            // files
            [],
            // server
            $server,
            // content
            null
        );

        return $childRequest;
    }

    protected function getChildRequestData($child_name)
    {
        foreach ($this->children_routes as $child_route_name => $child_route) {
            if ($child_name == $child_route_name) {
                return $child_route;
            }
        }

        throw new \Exception('child route data does not exist for: ' . $child_name);
    }

    protected function buildQueryParams($class, $request)
    {
        $queryParams = new \stdClass();

        $queryParams = $request->get('_query');

        return $queryParams;
    }

    protected function buildQuery($queryParams)
    {
        $class = $this->class;
        $originalQuery = $class::query();
        $query = new \App\Utilities\Query\Builder($originalQuery, $this->class);

        $query->addSelectAllMainFields($query);

        if (method_exists($this, 'buildInitialQuery')) {
            $this->buildInitialQuery($query);
        }

        if (isset($queryParams['parentLinkFilter'])) {
            $parentParam = $queryParams['parentLinkFilter'];
            $filterParam = [
                'filterType' => 'simple',
                'simpleData' => [
                    'operation' => 'eq',
                    'targetValue' => $parentParam['parent_id'],
                    'fieldName' => $parentParam['fieldToFilterBy'],
                ]
            ];

            $query->filter($filterParam);
        }

        if (isset($queryParams['joinSelectChildren'])) {
            $list = $queryParams['joinSelectChildren'];
            $query->joinSelectChildren($list);
        }

        if (isset($queryParams['sortParameters'])) {
            $sortParameters = $queryParams['sortParameters'];
            $query->orderByParams($sortParameters);
        }

        if (isset($queryParams['filters'])) {
            $filterParam = $queryParams['filters'];
            $query->filter($filterParam);
        }

        return $query->getOriginal();
    }

    protected function getTable()
    {
        $class_item = $this->newItem();
        $table_name = $class_item->getTable();

        return $table_name;
    }

    protected function newItem()
    {
        $item = new $this->class();
        return $item;
    }

    protected function calcSearchFilterCondition($rule, $request, $class)
    {
        $filterCondition = new \stdClass();

        $fieldName = $rule->field;
        $jqgrid_operator = $rule->op;
        $searchData = $rule->data;

        // TODO: transaltions and validation on rule attributes.

        switch ($jqgrid_operator) {
            // cn: contains
            case 'cn' :
                $operator = 'LIKE';
                $searchData = '%' . $searchData . '%';
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

        $colModelExtraStr = $request->get(self::$COL_MODEL_EXTRA_REQ_PARAM);
        $queryParams = $request->get('_query');

        if ($queryParams && $queryParams['joinSelectCompositionFilterList']) {
            foreach ($queryParams['joinSelectCompositionFilterList'] as $filterReq) {
                $filterCondition->isOnJoin = true;
                //$filterCondition->
            }
        } else {
            $filterCondition->fieldName = $fieldName;
            $filterCondition->operator = $operator;
            $filterCondition->value = $searchData;
        }

        return $filterCondition;
    }

    protected function calcRowsPerPage(\App\Utilities\JqGrid\Request $request)
    {
        $calc_rows_per_page = null;

        if ($request->hasRowsPerPage()) {
            $calc_rows_per_page = $request->getRowsPerPage();
            if ($calc_rows_per_page > self::$MAX_ROWS_PER_PAGE) {
                throw new \Exception('requested rows amount exceeded max');
            }

        } else {
            $calc_rows_per_page = null;
        }

        return $calc_rows_per_page;
    }

    protected function calcFirstChildJoinParams($request, $class)
    {
        $query_params = [];

        if ($request->has('_query')) {
            $query = $request->get('_query');
            if (isset($query['joinSelectChildren'])) {
                foreach ($query['joinSelectChildren'] as $joinName) {
                    $emptyItem = new $class();
                    if (in_array($joinName, $emptyItem->relationshipMethods)) {
                        $param = $this->createJoinDataFromModelLink($emptyItem->$joinName());
                        $query_params[] = $param;
                    }
                }
            }
        }

        return $query_params;
    }

    protected function calcChildJoinParam($reqParam, $class)
    {
        $param = new \stdClass();

        $linkInfo = $class::getLinkInfo($reqParam->linkField);
        $param->linkedTableName = $linkInfo['linkedTable'];
        $param->fieldName = $linkInfo['fieldName'];
        $param->linkedField = $linkInfo['linkedField'];
        $param->functionOnChild = $linkInfo['functionOnChild'];
        // TODO: security check. fields injection.
        $param->requestedFields = $reqParam->selectFields;

        return $param;
    }
}

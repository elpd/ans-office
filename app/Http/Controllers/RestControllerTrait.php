<?php namespace App\Http\Controllers;

use App\Utilities\GeneralUtilities as Utils;
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

    protected static $MAX_ROWS_PER_PAGE = 1000;

    protected $existingJoins = [];

    public function index(Request $request)
    {
        $class = $this->class;

        $filterParams = $this->calcFilterParams($request, $class);
        $orderParams = $this->calcOrderParams($request, $class);
        $rowsPerPage = $this->calcRowsPerPage($request);

        $query = $this->buildQuery($class, $filterParams, $orderParams);

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

        $input = $this->getOnly($class);
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
    public function update($id)
    {
        $class = $this->class;

        $item = $class::findOrFail($id);

        $input = $this->getOnly($class);

        foreach ($input as $inputKey => $inputValue) {
            $item->$inputKey = $inputValue;
        }

        try {
            $item->saveOrFail();

            \Log::info('record update', [
                'class ' => $class,
                'user' => \Auth::user()->email,
                'record_id' => $item->id]);

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

    protected function buildQuery($class, $filterParams, $orderParams)
    {
        $query = $class::query();

        $classObject = new $class();
        $mainTableName = $classObject->getTable();

        $query = $query->select($mainTableName . '.*');

        if (method_exists($this, 'setAdditionalQueryFilters')){
            $query = $this->setAdditionalQueryFilters($query);
        }

        foreach ($filterParams as $filterCondition) {
            if (isset($filterCondition->isSearchOnParentField) && $filterCondition->isSearchOnParentField) {

                $linkedTableName = $filterCondition->parentTable;
                $linkedTableConnectionFieldName = 'id';

                $query = $this->createJoinOnQuery($query,
                    $mainTableName,
                    $linkedTableName,
                    $mainTableName . '.' . $filterCondition->fieldName,
                    '=',
                    $linkedTableName . '.' . $linkedTableConnectionFieldName);

                $query = $query->where($linkedTableName . '.' . $filterCondition->parentField,
                    $filterCondition->operator,
                    $filterCondition->value);

            } else {
                $query = $query->where(
                    $mainTableName . '.' . $filterCondition->fieldName,
                    $filterCondition->operator,
                    $filterCondition->value
                );
            }
        }

        if (count($orderParams) > 0) {

            // Currently supporting only one sort per query.

            $sortingPrimaryCondition = $orderParams[0];

            if (isset($sortingPrimaryCondition['isSortOnParentField'])) {

                $linkedTableName = $sortingPrimaryCondition['parentTable'];
                $linkedTableConnectionFieldName = 'id';

                $query = $this->createJoinOnQuery($query,
                    $mainTableName,
                    $linkedTableName,
                    $mainTableName . '.' . $sortingPrimaryCondition['index'],
                    '=',
                    $linkedTableName . '.' . $linkedTableConnectionFieldName);

                $query = $query->orderBy($linkedTableName . '.' . $sortingPrimaryCondition['parentField'],
                    $sortingPrimaryCondition['order']);

            } else {

                $query = $query->orderBy(
                    $mainTableName . '.' . $sortingPrimaryCondition['index'],
                    $sortingPrimaryCondition['order']
                );
            }
        }

        return $query;
    }

    protected function createJoinOnQuery($query, $firstTableName, $secondTableName, $firstTableFieldFullName, $operator,
                                         $secondTableFieldFullName)
    {
        $joinExists = $this->findInExistingJoins($secondTableName,
            $firstTableFieldFullName,
            $operator,
            $secondTableFieldFullName);

        if ($joinExists) {
            return $query;
        } else {
            $this->addJoinToExistingJoins($secondTableName,
                $firstTableFieldFullName,
                $operator,
                $secondTableFieldFullName);

            $resultQuery = $query->join($secondTableName,
                $firstTableFieldFullName,
                $operator,
                $secondTableFieldFullName);

            return $resultQuery;
        }
    }

    protected function findInExistingJoins($secondTableName, $firstTableFieldFullName, $operator, $secondTableFieldFullName)
    {
        foreach ($this->existingJoins as $join) {
            if ($join->secondTableName == $secondTableName &&
                $join->firstTableFieldFullName == $firstTableFieldFullName &&
                $join->operator == $operator &&
                $join->secondTableFieldFullName == $secondTableFieldFullName
            ) {
                return true;
            }
        }

        return false;
    }

    protected function addJoinToExistingJoins($secondTableName, $firstTableFieldFullName, $operator, $secondTableFieldFullName)
    {
        $join = new \stdClass();
        $join->secondTableName = $secondTableName;
        $join->firstTableFieldFullName = $firstTableFieldFullName;
        $join->operator = $operator;
        $join->secondTableFieldFullName = $secondTableFieldFullName;

        $this->existingJoins[] = $join;
    }

    protected function calcFilterParams(Request $request, $class)
    {
        $filterParams = [];

        /*
         * Parent filtering.
         */

        if ($request->has(self::$PARENT_LINK_REQ_PARAM)) {
            $filterParams[] = $this->calcParentFilterCondition($request, $class);
        }

        /*
         * Search filtering.
         */

        if ($request->has(self::$SEARCH_REQ_PARAM) && $request->get(self::$SEARCH_REQ_PARAM) == 'true') {

            $search_filters_json = $request->get('filters');
            $search_filters = \GuzzleHttp\json_decode($search_filters_json);

            $searchRoles = $search_filters->rules;

            foreach ($searchRoles as $rule) {
                $filterParams[] = $this->calcSearchFilterCondition($rule, $request, $class);
            }
        }

        return $filterParams;
    }

    protected function calcParentFilterCondition($request, $class)
    {
        $filterCondition = new \stdClass();

        $parentLink = $request->get(self::$PARENT_LINK_REQ_PARAM);
        $linkInfo = $class::getLinkInfo($parentLink['childFieldName']);

        $filterCondition->fieldName = $linkInfo['fieldName'];
        $filterCondition->operator = '=';
        $filterCondition->value = $parentLink['id'];

        return $filterCondition;
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

        if ($colModelExtraStr && $colModelExtraStr != '') {
            $parentToSearchBy = $this->calcLinkToOperateBy(
                $colModelExtraStr,
                $class,
                self::$SEARCH_ON_LINK_FIELD_REQ_PARAM,
                $fieldName);
        }


        $filterCondition->fieldName = $fieldName;
        $filterCondition->operator = $operator;
        $filterCondition->value = $searchData;

        if (isset($parentToSearchBy) && $parentToSearchBy->exists) {
            $filterCondition->isSearchOnParentField = $parentToSearchBy->exists;
            $filterCondition->parentField = $parentToSearchBy->field;
            $filterCondition->parentTable = $parentToSearchBy->table;
        }

        return $filterCondition;
    }

    protected function calcOrderParams(Request $request, $class)
    {
        $orderParams = [];
        $parentFieldToSortBy = null;

        if ($request->has(self::$SORTING_INDEX_REQ_PARAM)) {
            $sortingIndex = $request->get(self::$SORTING_INDEX_REQ_PARAM);
            $sortingOrder = $request->get(self::$SORTING_ORDER_REQ_PARAM);

            $colModelExtraStr = $request->get(self::$COL_MODEL_EXTRA_REQ_PARAM);

            if ($colModelExtraStr && $colModelExtraStr != '') {
                $parentToSortBy = $this->calcLinkToOperateBy(
                    $colModelExtraStr,
                    $class,
                    self::$SORT_ON_LINK_FIELD_REQ_PARAM,
                    $sortingIndex);
            }

            $orderCondition = [
                'index' => $sortingIndex,
                'order' => $sortingOrder,
            ];

            if (isset($parentToSortBy) && $parentToSortBy->exists) {
                $orderCondition['isSortOnParentField'] = $parentToSortBy->exists;
                $orderCondition['parentField'] = $parentToSortBy->field;
                $orderCondition['parentTable'] = $parentToSortBy->table;
            }

            $orderParams[] = $orderCondition;
        }

        return $orderParams;
    }

    protected function calcLinkToOperateBy($colModelExtraStr, $class, $operationReqParam, $fieldName)
    {
        $linkData = new \stdClass();
        $linkData->exists = false;

        $colModelExtra = \GuzzleHttp\json_decode($colModelExtraStr);

        if (isset($colModelExtra->$fieldName)) {
            $fieldExtra = $colModelExtra->$fieldName;

            $attributeName = $operationReqParam;
            if (isset($fieldExtra->$attributeName)) {
                $linkData->exists = true;
                $linkData->field = $fieldExtra->$attributeName;

                $linkInfo = $class::getLinkInfo($fieldName);
                $linkData->table = $linkInfo['linkedTable'];
            }
        }

        return $linkData;
    }

    protected function calcRowsPerPage(Request $request)
    {
        $rows_per_page = self::$MAX_ROWS_PER_PAGE;

        $requested_rows_per_page = $request->get('rows');

        if (is_nan($requested_rows_per_page) || $requested_rows_per_page > self::$MAX_ROWS_PER_PAGE) {
            // TODO: log error in input
        } else {
            $rows_per_page = $requested_rows_per_page;
        }

        return $rows_per_page;
    }
}

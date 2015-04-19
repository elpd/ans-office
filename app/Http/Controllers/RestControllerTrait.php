<?php namespace App\Http\Controllers;

use App\Utilities\GeneralUtilities as Utils;
use Illuminate\Http\Request;

trait RestControllerTrait
{
    // TODO: search

    protected static $PARENT_LINK_REQ_PARAM = "parentLink";
    protected static $SORTING_INDEX_REQ_PARAM = "sidx";
    protected static $SORTING_ORDER_REQ_PARAM = "sord";
    protected static $COL_MODEL_EXTRA_REQ_PARAM = 'colModelExtra';
    protected static $SEARCH_REQ_PARAM = '_search';

    protected static $MAX_ROWS_PER_PAGE = 1000;

    public function index(Request $request)
    {
        $class = $this->class;

        $filterParams = $this->calcFilterParams($request, $class);
        $orderParams = $this->calcOrderParams($request, $class);
        $rowsPerPage = $this->calcRowsPerPage($request);

        $query = $this->buildQuery($class, $filterParams, $orderParams);

        $items = $query->paginate($rowsPerPage);
        $itemsAsMap = Utils::convertItemsToJqgridMap($items);

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

    protected function buildQuery($class, $filterParams, $orderParams)
    {
        $query = $class::query();

        foreach ($filterParams as $filterCondition) {
            $query = $query->where(
                $filterCondition['fieldName'],
                $filterCondition['operator'],
                $filterCondition['value']
            );
        }

        if (count($orderParams) > 0) {

            // Currently supporting only one sort per query.

            $sortingPrimaryCondition = $orderParams[0];

            if (isset($sortingPrimaryCondition['isSortOnParentField'])) {

                $classObject = new $class();
                $mainTableName = $classObject->getTable();
                $linkedTableName = $sortingPrimaryCondition['parentTable'];
                $linkedTableConnectionFieldName = 'id';

                $query = $query->join($linkedTableName,
                    $mainTableName . '.' . $sortingPrimaryCondition['index'],
                    '=',
                    $linkedTableName . '.' . $linkedTableConnectionFieldName);

                $query = $query->orderBy($linkedTableName . '.' . $sortingPrimaryCondition['parentField'],
                    $sortingPrimaryCondition['order']);

            } else {

                $query = $query->orderBy(
                    $sortingPrimaryCondition['index'],
                    $sortingPrimaryCondition['order']
                );
            }
        }

        return $query;
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
                $filterParams[] = $this->calcSearchFilterCondition($rule);
            }
        }

        return $filterParams;
    }

    protected function calcParentFilterCondition($request, $class){
        $parentLink = $request->get(self::$PARENT_LINK_REQ_PARAM);
        $linkInfo = $class::getLinkInfo($parentLink['childFieldName']);

        $filterCondition = [
            'fieldName' => $linkInfo['fieldName'],
            'operator' => '=',
            'value' => $parentLink['id']
        ];

        return $filterCondition;
    }

    protected function calcSearchFilterCondition($rule) {
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

        $filterCondition = [
            'fieldName' => $fieldName,
            'operator' => $operator,
            'value' => $searchData
        ];

        return $filterCondition;
    }

    protected function calcOrderParams(Request $request, $class)
    {
        $orderParams = [];
        $isSortOnParentField = false;
        $parentFieldToSortBy = null;

        if ($request->has(self::$SORTING_INDEX_REQ_PARAM)) {
            $sortingIndex = $request->get(self::$SORTING_INDEX_REQ_PARAM);
            $sortingOrder = $request->get(self::$SORTING_ORDER_REQ_PARAM);

            $colModelExtraStr = $request->get(self::$COL_MODEL_EXTRA_REQ_PARAM);

            if ($colModelExtraStr && $colModelExtraStr != '') {
                $colModelExtra = \GuzzleHttp\json_decode($colModelExtraStr);

                if (isset($colModelExtra->$sortingIndex)) {
                    $fieldExtra = $colModelExtra->$sortingIndex;

                    $attributeName = 'sortOnLinkField';
                    if (isset($fieldExtra->$attributeName)) {
                        $isSortOnParentField = true;
                        $parentFieldToSortBy = $fieldExtra->$attributeName;

                        $linkInfo = $class::getLinkInfo($sortingIndex);
                        $parentTableToSortBy = $linkInfo['linkedTable'];
                    }
                }
            }

            $orderCondition = [
                'index' => $sortingIndex,
                'order' => $sortingOrder,
            ];

            if ($isSortOnParentField) {
                $orderCondition['isSortOnParentField'] = $isSortOnParentField;
                $orderCondition['parentField'] = $parentFieldToSortBy;
                $orderCondition['parentTable'] = $parentTableToSortBy;
            }

            $orderParams[] = $orderCondition;
        }

        return $orderParams;
    }

    protected function calcRowsPerPage(Request $request){
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

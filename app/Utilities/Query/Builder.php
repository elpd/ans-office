<?php namespace App\Utilities\Query;

use App\Utilities\Query\FieldSelectDescription;

class Builder
{

    protected $selectArray = [];
    protected $innerJoins = [];
    protected $binding_numerator = 0;

    public function __construct(\Illuminate\Database\Eloquent\Builder $originalQuery,
                                $mainClass)
    {

        $this->originalQuery = $originalQuery;
        $this->mainClass = $mainClass;
        $this->repository = \App::make('DbRepository');
    }

    public function getOriginal()
    {
        return $this->originalQuery;
    }

    public function addSelectAllMainFields()
    {
        $this->addSelectIdField();

        $fields = $this->getMainFields();
        foreach ($fields as $fieldName) {
            $fieldDesc = new FieldSelectDescription($this->getTable(), $fieldName);
            $this->addSelect($fieldDesc);
        }
    }

    public function addSelectIdField()
    {
        $fieldSelectDesc = new FieldSelectDescription($this->getTable(), 'id');
        $this->addSelect($fieldSelectDesc);
    }

    public function joinSelectChildren($list)
    {
        foreach ($list as $connectionMethod) {
            $this->joinSelect($connectionMethod);
        }
    }

    public function orderByParams($sortParameters)
    {
        foreach ($sortParameters as $sortParam) {
            $this->orderByParam($sortParam);
        }
    }

    public function filter($filterParam)
    {
        $query = $this->getOriginal();

        if ($filterParam['isGroup'] == 'true') {
            $this->filterGroup($filterParam, $query, 'and');

        } else {
            $this->filterBasic($filterParam, $query, 'and');
        }
    }

    /*
     *
     */

    protected function addSelect(FieldSelectDescription $fieldSelectDesc)
    {
        if ($fieldSelectDesc->tableName == $this->getTable()) {
            $calc_name = $fieldSelectDesc->getFullName();
        } else {
            $calc_name = $fieldSelectDesc->getFullName() .
                ' AS ' .
                $fieldSelectDesc->getFullName();
        }

        $this->originalQuery->addSelect($calc_name);
        $this->selectArray[] = $fieldSelectDesc;
    }

    protected function addSelectAllTableFields($table_name)
    {
        $modelClass = $this->repository->getModelForTableName($table_name);
        $emptyItem = new $modelClass;

        $fieldIdDesc = new FieldSelectDescription($table_name, 'id');
        $this->addSelect($fieldIdDesc);
        foreach ($emptyItem->getFillable() as $field_name) {
            $fieldDesc = new FieldSelectDescription($table_name, $field_name);
            $this->addSelect($fieldDesc);
        }
    }

    protected function getMainFields()
    {
        $item = $this->newEmptyItem();
        $fields = $item->getFillable();
        return $fields;
    }

    protected function newEmptyItem()
    {
        $class = $this->mainClass;
        return new $class();
    }

    protected function getTable()
    {
        return $this->newEmptyItem()->getTable();
    }

    protected function joinSelect($connectionMethod)
    {
        $connectionDetails = $this->newEmptyItem()->
        getImmediateConnectionDetails($connectionMethod);
        $joinData = new JoinData(
            $parent_field = $this->getSelectedField($connectionDetails->first_table_field_name),
            $connectionDetails->second_table_name,
            $connectionDetails->second_table_field_name
        );
        $this->mergeJoin($joinData);
        $this->addSelectAllTableFields($connectionDetails->second_table_name);
    }

    protected function getSelectedField($field_name)
    {
        foreach ($this->selectArray as $selectedField) {
            if ($selectedField->getFullName() == $field_name) {
                return $selectedField;
            }
        }

        throw new \Exception('item not found');
    }

    protected function mergeJoin($joinData)
    {
        if ($this->isInnerJoinExists($joinData)) {
            return;
        }

        $this->join($joinData);
    }

    protected function join($joinData)
    {

        $this->originalQuery->join(
            $joinData->second_table_name,
            $joinData->parent_field->getFullName(),
            '=',
            $joinData->second_table_field_full_name
        );

        $this->innerJoins[] = $joinData;
    }

    protected function isInnerJoinExists($joinData)
    {
        foreach ($this->innerJoins as $existingJoin) {
            if ($existingJoin->equals($joinData)) {
                return true;
            }

            return false;
        }
    }

    protected function orderByParam($sortParam)
    {
        $fullFieldSortName = $this->fixFieldFullName($sortParam['index']);
        $selectedFieldDesc = $this->getSelectedField($fullFieldSortName);
        $order = $this->calcOrder($sortParam['order']);

        if (isset($sortParam['isOnForeign']) && $sortParam['isOnForeign'] == 'true') {
            $linkedMethod = $sortParam['linkMethod'];
            $parentModelClass = $this->repository->getModelForTableName(
                $selectedFieldDesc->tableName);
            $connectionDetails = (new $parentModelClass())->
            getImmediateConnectionDetails($linkedMethod);

            $this->orderByOnSubQueryLinked($connectionDetails, $order);

        } else {
            $this->getOriginal()->orderBy(
                $selectedFieldDesc->getFullName(), $order);
        }
    }

    protected function calcOrder($orderString)
    {
        switch ($orderString) {
            case 'asc':
                return 'asc';
            case 'desc':
                return 'desc';
            default:
                throw new \Exception('undefine value');
        }
    }

    protected function orderByOnSubQueryLinked(
        ConnectionDetails $connectionDetails, $order)
    {

        $sqlToStringRepresentation =
            $connectionDetails->second_table_model->
            calcSelectFieldsStringRepresentation();

        $orderSql = '(' .
            ' select ' . $sqlToStringRepresentation .
            ' from ' . $connectionDetails->second_table_name .
            ' where ' . $connectionDetails->second_table_field_name . ' = ' .
            $connectionDetails->first_table_field_name .
            ') ' .
            $order;

        $this->getOriginal()->orderByRaw($orderSql);
    }

    protected function fixFieldFullName($field_name)
    {
        $fullName = $field_name;
        if (strpos($field_name, '.') == false) {
            $fullName = $this->getTable() . '.' . $field_name;
        }

        return $fullName;
    }

    protected function filterBasic($filterParam, $query, $booleanOp)
    {
        $whereOperation = $this->calcWhereOperation($filterParam['operation']);
        $targetValue = $this->calcWhereTargetValueByOp(
            $filterParam['targetValue'],
            $filterParam['operation']);

        $fieldDesc = $this->getSelectedField(
            $this->fixFieldFullName($filterParam['fieldName'])
        );

        if ($filterParam['isOnForeign'] == 'true') {
            $connectionDetails = $this->getConnectionDetailsForField(
                $filterParam['fieldName'],
                $filterParam['linkMethod']
            );

            $query->whereExists(function ($subQuery) use (
                $connectionDetails,
                $whereOperation, $targetValue
            ) {
                $sqlToStringRepresentation =
                    $connectionDetails->second_table_model->
                    calcSelectFieldsStringRepresentation();

                $identityClause = $connectionDetails->second_table_field_name . ' = ' .
                    $connectionDetails->first_table_field_name;

                //$bindingName = $this->getNewBindingName();
                $targetValue = \DB::connection()->getPdo()->quote(
                    $targetValue
                );
                $searchClause = $sqlToStringRepresentation . ' ' .
                    $whereOperation . ' ' . $targetValue;

                $subQuery->select(\DB::raw(1))
                    ->from($connectionDetails->second_table_name)
                    ->whereRaw($identityClause)
                    //->whereRaw($searchClause, [$bindingName => $targetValue]);
                    ->whereRaw($searchClause);

            }, $booleanOp);

        } else {
            $query->where($fieldDesc->getFullName(),
                $whereOperation,
                $targetValue,
                $booleanOp);
        }
    }

    protected function getNewBindingName()
    {
        $numerator = $this->binding_numerator++;
        $name = 'binding_' . $numerator;

        return $name;
    }

    protected function getConnectionDetailsForField($field_name, $linkedMethod)
    {
        $fullFieldSortName = $this->fixFieldFullName($field_name);
        $selectedFieldDesc = $this->getSelectedField($fullFieldSortName);

        $parentModelClass = $this->repository->getModelForTableName(
            $selectedFieldDesc->tableName);

        $connectionDetails = (new $parentModelClass())->
        getImmediateConnectionDetails($linkedMethod);

        return $connectionDetails;
    }

    protected function filterGroup($filterParam, $query, $booleanOp)
    {
        $groupOperation = $this->fixGroupOperation($filterParam['operation']);

        $query->where(function ($subQuery) use ($filterParam, $groupOperation) {
            foreach ($filterParam['nodes'] as $subFilterParam) {
                if ($subFilterParam['isGroup'] == 'true') {
                    $this->filterGroup($subFilterParam, $subQuery, $groupOperation);

                } else {
                    $this->filterBasic($subFilterParam, $subQuery,
                        $groupOperation);
                }
            }
        }, null, null, $booleanOp);
    }

    protected function fixGroupOperation($opStr)
    {
        switch ($opStr) {
            case 'AND':
            case 'and':
                return 'and';
            case 'OR':
            case 'or':
                return 'or';
        }

        throw new \Exception('malformed value');
    }

    protected function calcWhereOperation($opStr)
    {
        switch ($opStr) {
            // cn: contains
            case 'cn' :
                $operator = 'LIKE';
                break;
            case 'nc' :
                $operator = 'NOT LIKE';
                break;
            case 'bw':
                $operator = 'LIKE';
                break;
            case 'bn':
                $operator = 'NOT LIKE';
                break;
            case 'ew':
                $operator = 'LIKE';
                break;
            case 'en':
                $operator = 'NOT LIKE';
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

        return $operator;
    }

    protected function calcWhereTargetValueByOp($targetValueRaw,
                                                $opStr)
    {
        switch ($opStr) {
            // cn: contains
            case 'cn' :
                $targetValue = '%' . $targetValueRaw . '%';
                break;
            case 'bw' :
                $targetValue = $targetValueRaw . '%';
                break;
            case 'bn' :
                $targetValue = $targetValueRaw . '%';
                break;
            case 'ew' :
                $targetValue = '%' . $targetValueRaw;
                break;
            case 'en' :
                $targetValue = '%' . $targetValueRaw;
                break;

            default:
                $targetValue = $targetValueRaw;
        }

        return $targetValue;
    }
}
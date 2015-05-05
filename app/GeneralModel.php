<?php namespace App;

use App\Utilities\Query\ConnectionDetails;

trait GeneralModel
{
    public function getFillable(){
        return $this->fillable;
    }

    public static function getLinkInfo($linkName){
        if (isset(self::$linksInfos)) {
            return self::$linksInfos[$linkName];
        } else {
            return null;
        }
    }

    public function getImmediateConnectionDetails($methodName){
        if (! $this->isRelationshipMethodExists($methodName)){
            throw new \Exception('method does not exists');
        }

        $activeLink = $this->$methodName();

        $connectionDetails = new ConnectionDetails();

        $className = get_class($activeLink);
        switch ($className) {
            case "Illuminate\\Database\\Eloquent\\Relations\\HasOne":
                $connectionDetails->first_table_field_name = $activeLink->getQualifiedParentKeyName();
                $connectionDetails->second_table_field_name = $activeLink->getForeignKey();
                $connectionDetails->second_table_name = $activeLink->getRelated()->getTable();
                $connectionDetails->second_table_model = $activeLink->getRelated();
                break;

            case "Illuminate\\Database\\Eloquent\\Relations\\BelongsTo":
                $connectionDetails->first_table_field_name = $activeLink->getQualifiedForeignKey();
                $connectionDetails->second_table_field_name = $activeLink->getQualifiedOtherKeyName();
                $connectionDetails->second_table_name = $activeLink->getRelated()->getTable();
                $connectionDetails->second_table_model = $activeLink->getRelated();
                break;

            default:
                throw new \Exception('unintended');
        }

        return $connectionDetails;
    }

    protected function isRelationshipMethodExists($methodName){
        foreach($this->relationshipMethods as $existingMethod){
            if ($existingMethod == $methodName){
                return true;
            }
        }

        return false;
    }

    public function calcSelectFieldsStringRepresentation() {
        $fieldsNamePhrase = '';
        foreach ($this->toStringFields as $fieldName) {
            $fieldsNamePhrase .= ", " . $fieldName;
        }

        $fullSql = "CONCAT_WS(',' " . $fieldsNamePhrase . ")";

        return $fullSql;
    }

    public function hasLinkMethod($method_name) {
        foreach ($this->relationshipMethods as $relMethod){
            if ($method_name == $relMethod){
                return true;
            }
        }

        return false;
    }

    public function hasScopeMethod($method_name) {
        foreach ($this->scopeMethods as $scopeMethod){
            if ($method_name == $scopeMethod){
                return true;
            }
        }

        return false;
    }

    public function generateToStringSql() {
        $sql = "CONCAT_WS('-' ";

        foreach ($this->toStringFields as $field_name) {
            $sql .= ", " . $this->getTable() . '.' . $field_name;
        }

        $sql .= ")";

        return $sql;
    }
}
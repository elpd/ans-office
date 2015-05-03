<?php

namespace App\Utilities\Query;


class FieldSelectDescription
{
    public function __construct($tableName, $fieldName)
    {
        $this->tableName = $tableName;
        $this->fieldName = $fieldName;
    }

    public function getFullName() {
        $calc_name = $this->tableName . '.' . $this->fieldName;
        return $calc_name;
    }

    public function equals(FieldSelectDescription $target) {
        if ($this->tableName == $target->tableName
            &&
            $this->fieldName == $target->fieldName
        ) {
            return true;
        }

        return false;
    }
}
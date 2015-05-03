<?php


namespace App\Utilities\Query;


class JoinData
{
    public function __construct(
        $parent_field,
        $second_table_name,
        $second_table_field_full_name
    )
    {
        $this->parent_field = $parent_field;
        $this->second_table_name = $second_table_name;
        $this->second_table_field_full_name = $second_table_field_full_name;
    }

    public function equals(JoinData $joinDataB)
    {
        if ($this->parent_field->equals($joinDataB->parent_field)
            &&
            $this->second_table_name == $joinDataB->second_table_name
            &&
            $this->second_table_field_full_name ==
            $joinDataB->second_table_field_full_name
        ) {
            return true;
        }

        return false;
    }
}
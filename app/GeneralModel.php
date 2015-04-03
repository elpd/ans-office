<?php namespace App;

trait GeneralModel
{
    public function getFillable(){
        return $this->fillable;
    }

}
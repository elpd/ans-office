<?php namespace App;

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
}
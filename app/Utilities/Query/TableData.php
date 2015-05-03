<?php
/**
 * Created by IntelliJ IDEA.
 * User: eyal
 * Date: 5/2/15
 * Time: 2:51 PM
 */

namespace App\Utilities\Query;


class TableData {
    public function __construct($name, $model_class){
        $this->name = $name;
        $this->model_class = $model_class;
    }

    public function getName() {
        return $this->name;
    }

    public function getModelClass() {
        return $this->model_class;
    }
}
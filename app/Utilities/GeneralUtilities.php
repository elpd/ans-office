<?php namespace App\Utilities;

class GeneralUtilities {

    public static function convertItemsToJqgridMap($items)
    {
        return array_reduce(
            $items->all(),
            function ($result, $item) {
                $itemResult = [];
                $itemResult['id'] = $item->id;
                $itemResult['cell'] = $item;

                $result[] = $itemResult;

                return $result;
            }, array());
    }
}

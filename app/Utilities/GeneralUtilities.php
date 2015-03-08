<?php namespace App\Utilities;

class GeneralUtilities {

  public static function convertItemsToMap($items) {
    $map = GeneralUtilities::pluck_array_reduce($items->all());
    return $map;
  }

  public static function pluck_array_reduce($data) {
    return array_reduce(
    $data,
    function($result, $item) {
      $itemResult = [];
      $itemResult['id'] = $item->id;
      $itemResult['cell'] = $item;

      $result[] = $itemResult;

      return $result;
    }, array());
  }
}

<?php namespace App\Http\Controllers\api\User;

use App\Http\Controllers\Controller;
use App\Utilities\GeneralUtilities as Utils;

class GuidedGroupController extends Controller
{
    public function show()
    {
        $user = \Auth::user();
        $query = \App\Group::guidedByUser($user->id);

        $items = $query->get();
        $itemsAsMap = Utils::convertItemsToJqgridMap($items);

        return [
            'success' => true,
            'rows' => $itemsAsMap
        ];
    }
}
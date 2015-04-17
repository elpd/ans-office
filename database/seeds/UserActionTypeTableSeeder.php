<?php

use Illuminate\Database\Seeder;
use App\GroupMembersStatus;

class UserActionTypeTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('user_action_types')->delete();

        $itemsData = array(
            array(
                'name' => 'login'
            ),
            array(
                'name' => 'logout'
            ),
            array(
                'name' => 'db_update'
            ),
            array(
                'name' => 'db_create'
            ),
            array(
                'name' => 'db_delete',
            ),
            array(
                'name' => 'db_view'
            ),
        );

        foreach ($itemsData as $itemData) {

            $newItem = \App\UserActionType::create($itemData);

            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };

    }
}
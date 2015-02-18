<?php

use Illuminate\Database\Seeder;
use App\GroupStatus;

class GroupStatusTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('group_status')->delete();
        
        $itemsData = array(
                array(
                        'status' => 'registration'
                ),
                array(
                   'status' => 'running'
                 ),
                array(
                        'status' => 'ended'
              ),
        );
        
        foreach ($itemsData as $itemData) {
        
            $newItem = GroupStatus::create($itemData);
        
            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };
    }
}
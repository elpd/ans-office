<?php 

use Illuminate\Database\Seeder;
use App\GroupMembersStatus;

class GroupMembersStatusTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('group_members_status')->delete();
        
        $itemsData = array(
                array(
                        'status' => 'new'
                ),
                array(
                        'status' => 'in_process'
                ),
                array(
                        'status' => 'in_group'
                ),                
        );
        
        foreach ($itemsData as $itemData) {            
            
            $newItem = GroupMembersStatus::create($itemData);
            
            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };
       
    }
}
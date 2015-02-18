<?php

use Illuminate\Database\Seeder;
use App\GroupsMember;
use App\Group;
use App\Contact;
use App\GroupMembersStatus;
use App\Guide;

class GroupsMembersTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('groups_members')->delete();
        
        $group1 = Group::where('name', '=', 'firstgroup')->firstOrFail();
        $contact1 = Contact::where('email', '=', 'contact1@example.com')->firstOrFail();
        $status1 = GroupMembersStatus::where('status', '=', 'new')->firstOrFail();
        $guide1 = Guide::where('name', '=', 'israel')->firstOrFail();
        
        $itemsData = array(
                array(
                        'group_id' => $group1->id,
                        'contact_id' => $contact1->id,
                        'status_id' => $status1->id,
                        'guide_id_1' => $guide1->id
                ),              
        );
        
        foreach ($itemsData as $itemData) {
            
            $newItem = GroupsMember::create($itemData);
            
            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };
       
    }
}
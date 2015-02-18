<?php

use Illuminate\Database\Seeder;
use App\Group;
use App\Cycle;
use App\GroupStatus;

class GroupTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('groups')->delete();
                
        $cycle = Cycle::where('startDate', '=', '2015-01-01')->firstOrFail();
        $groupStatus = GroupStatus::where('status', '=', 'registration')->firstOrFail();
        
        $newItem = Group::create(
                array(
                        'cycle_id' => $cycle->id,
                        'name' => "firstgroup",
                        'status_id' => $groupStatus->id,
                ));
        
        $errors = $newItem->getErrors();
        if (count($errors) > 0) {
            throw new Exception($errors);
        }        
        
    }
}
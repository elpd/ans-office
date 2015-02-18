<?php

use Illuminate\Database\Seeder;
use App\Role;

class RoleTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('roles')->delete();
        
        $itemsData = array(
                array(
                        'name' => 'admin'
                ),
                array(
                        'name' => 'employee'
                ),
                array(
                        'name' => 'user'
                ),
                array(
                        'name' => 'guest'
                ),
        );
        
        foreach ($itemsData as $itemData) {
        
            $newItem = Role::create($itemData);
        
            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };
    }
}
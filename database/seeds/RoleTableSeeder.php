<?php

use Illuminate\Database\Seeder;
use Bican\Roles\Models\Role;

class RoleTableSeeder extends Seeder
{
    public function run ()
    {
        DB::table('roles')->delete();

        $itemsData = array(
          array(
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => '',
            //'level' => 1,
          ),
          array(
            'name' => 'Employee',
            'slug' => 'employee',
            'description' => '',
            //'level' => 1,
          ),
          array(
            'name' => 'User',
            'slug' => 'user',
            'description' => '',
            //'level' => 1,
          ),
          array(
            'name' => 'Guest',
            'slug' => 'guest',
            'description' => '',
            //'level' => 1,
          ),
        );

        foreach ($itemsData as $itemData) {

          $newItem = Role::create($itemData);

          /* TODO: way to detect errors on Role creation. Role currently
            is not using Watson\Validating\ValidatingTrait.
           */

          //$errors = $newItem->getErrors();
          //if (count($errors) > 0) {
          //  throw new Exception($errors);
          //}
        };
    }
}

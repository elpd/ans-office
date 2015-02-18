<?php

use Illuminate\Database\Seeder;
use App\Permission;

class PermissionTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('permissions')->delete();
        
        $newItem = Permission::create(
                array(
                        'name' => 'access_templates',
                        'display_name' => 'Access Templates'
                ));
        
        $errors = $newItem->getErrors();
        if (count($errors) > 0) {
            throw new Exception($errors);
        }
    }
}
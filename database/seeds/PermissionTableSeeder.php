<?php

use Illuminate\Database\Seeder;
use Bican\Roles\Models\Permission;

class PermissionTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('permissions')->delete();

        $itemsData = array(
            array(
                'name' => 'Edit Template',
                'slug' => 'edit',
                'description' => '',
                'model' => 'DocumentTemplate',
            ),
            array(
                'name' => 'View Template',
                'slug' => 'view',
                'description' => '',
                'model' => 'DocumentTemplate',
            ),
        );

        foreach ($itemsData as $itemData) {

            $newItem = Permission::create($itemData);

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

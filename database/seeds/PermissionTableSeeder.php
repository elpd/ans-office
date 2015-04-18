<?php

use Illuminate\Database\Seeder;
use Bican\Roles\Models\Permission;

class PermissionTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('permissions')->delete();

        $itemsData = [
            [
                'name' => '',
                'slug' => 'api.contact.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.contact.show',
                'description' => '',
                'model' => '',
            ],
            [
                'name' => '',
                'slug' => 'api.contact.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.contact.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.contact.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.cycle.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.cycle.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.cycle.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.cycle.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.cycle.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.etgar22.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.etgar22.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.etgar22.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.etgar22.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.etgar22.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.groups-members.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.groups-members.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.groups-members.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.groups-members.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.groups-members.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group-members-status.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group-members-status.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group-members-status.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group-members-status.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group-members-status.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.guide.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.guide.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.guide.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.guide.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.guide.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_language.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_language.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_language.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_language.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_language.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.permission.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.permission.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.permission.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.permission.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.permission.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.role.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.role.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.role.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.role.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.role.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_bootstrap_theme.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_bootstrap_theme.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_bootstrap_theme.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_bootstrap_theme.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_bootstrap_theme.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_jquery_ui_theme.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_jquery_ui_theme.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_jquery_ui_theme.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_jquery_ui_theme.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.ui_jquery_ui_theme.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.language.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.language.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.language.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.language.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.language.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.user.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.user.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.user.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.user.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.user.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group-status.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group-status.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group-status.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group-status.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => '',
                'slug' => 'api.group-status.destroy',
                'description' => '',
                'model' => '',
            ],
        ];

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

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
                'name' => 'api.contact.index',
                'slug' => 'api.contact.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.contact.show',
                'slug' => 'api.contact.show',
                'description' => '',
                'model' => '',
            ],
            [
                'name' => 'api.contact.store',
                'slug' => 'api.contact.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.contact.update',
                'slug' => 'api.contact.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.contact.destroy',
                'slug' => 'api.contact.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.cycle.index',
                'slug' => 'api.cycle.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.cycle.show',
                'slug' => 'api.cycle.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.cycle.store',
                'slug' => 'api.cycle.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.cycle.update',
                'slug' => 'api.cycle.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.cycle.destroy',
                'slug' => 'api.cycle.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.index',
                'slug' => 'api.etgar22.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.show',
                'slug' => 'api.etgar22.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.store',
                'slug' => 'api.etgar22.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.update',
                'slug' => 'api.etgar22.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.destroy',
                'slug' => 'api.etgar22.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group.index',
                'slug' => 'api.group.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group.show',
                'slug' => 'api.group.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group.store',
                'slug' => 'api.group.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group.update',
                'slug' => 'api.group.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group.destroy',
                'slug' => 'api.group.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.groups-members.index',
                'slug' => 'api.groups-members.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.groups-members.show',
                'slug' => 'api.groups-members.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.groups-members.store',
                'slug' => 'api.groups-members.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.groups-members.update',
                'slug' => 'api.groups-members.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.groups-members.destroy',
                'slug' => 'api.groups-members.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-members-status.index',
                'slug' => 'api.group-members-status.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-members-status.show',
                'slug' => 'api.group-members-status.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-members-status.store',
                'slug' => 'api.group-members-status.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-members-status.update',
                'slug' => 'api.group-members-status.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-members-status.destroy',
                'slug' => 'api.group-members-status.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.guide.index',
                'slug' => 'api.guide.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.guide.show',
                'slug' => 'api.guide.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.guide.store',
                'slug' => 'api.guide.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.guide.update',
                'slug' => 'api.guide.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.guide.destroy',
                'slug' => 'api.guide.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_language.index',
                'slug' => 'api.ui_language.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_language.show',
                'slug' => 'api.ui_language.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_language.store',
                'slug' => 'api.ui_language.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_language.update',
                'slug' => 'api.ui_language.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_language.destroy',
                'slug' => 'api.ui_language.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission.index',
                'slug' => 'api.permission.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission.show',
                'slug' => 'api.permission.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission.store',
                'slug' => 'api.permission.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission.update',
                'slug' => 'api.permission.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission.destroy',
                'slug' => 'api.permission.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role.index',
                'slug' => 'api.role.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role.show',
                'slug' => 'api.role.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role.store',
                'slug' => 'api.role.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role.update',
                'slug' => 'api.role.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role.destroy',
                'slug' => 'api.role.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_bootstrap_theme.index',
                'slug' => 'api.ui_bootstrap_theme.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_bootstrap_theme.show',
                'slug' => 'api.ui_bootstrap_theme.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_bootstrap_theme.store',
                'slug' => 'api.ui_bootstrap_theme.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_bootstrap_theme.update',
                'slug' => 'api.ui_bootstrap_theme.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_bootstrap_theme.destroy',
                'slug' => 'api.ui_bootstrap_theme.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_jquery_ui_theme.index',
                'slug' => 'api.ui_jquery_ui_theme.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_jquery_ui_theme.show',
                'slug' => 'api.ui_jquery_ui_theme.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_jquery_ui_theme.store',
                'slug' => 'api.ui_jquery_ui_theme.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_jquery_ui_theme.update',
                'slug' => 'api.ui_jquery_ui_theme.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_jquery_ui_theme.destroy',
                'slug' => 'api.ui_jquery_ui_theme.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.language.index',
                'slug' => 'api.language.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.language.show',
                'slug' => 'api.language.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.language.store',
                'slug' => 'api.language.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.language.update',
                'slug' => 'api.language.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.language.destroy',
                'slug' => 'api.language.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.user.index',
                'slug' => 'api.user.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.user.show',
                'slug' => 'api.user.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.user.store',
                'slug' => 'api.user.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.user.update',
                'slug' => 'api.user.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.user.destroy',
                'slug' => 'api.user.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-status.index',
                'slug' => 'api.group-status.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-status.show',
                'slug' => 'api.group-status.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-status.store',
                'slug' => 'api.group-status.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-status.update',
                'slug' => 'api.group-status.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-status.destroy',
                'slug' => 'api.group-status.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role-user.index',
                'slug' => 'api.role-user.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role-user.show',
                'slug' => 'api.role-user.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role-user.store',
                'slug' => 'api.role-user.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role-user.update',
                'slug' => 'api.role-user.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role-user.destroy',
                'slug' => 'api.role-user.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-user.index',
                'slug' => 'api.permission-user.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-user.show',
                'slug' => 'api.permission-user.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-user.store',
                'slug' => 'api.permission-user.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-user.update',
                'slug' => 'api.permission-user.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-user.destroy',
                'slug' => 'api.permission-user.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-role.index',
                'slug' => 'api.permission-role.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-role.show',
                'slug' => 'api.permission-role.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-role.store',
                'slug' => 'api.permission-role.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-role.update',
                'slug' => 'api.permission-role.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-role.destroy',
                'slug' => 'api.permission-role.destroy',
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

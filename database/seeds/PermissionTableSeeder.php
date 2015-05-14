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
                'name' => 'api.contact.action.index',
                'slug' => 'api.contact.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.contact.action.show',
                'slug' => 'api.contact.action.show',
                'description' => '',
                'model' => '',
            ],
            [
                'name' => 'api.contact.action.store',
                'slug' => 'api.contact.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.contact.action.update',
                'slug' => 'api.contact.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.contact.action.destroy',
                'slug' => 'api.contact.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.cycle.action.index',
                'slug' => 'api.cycle.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.cycle.action.show',
                'slug' => 'api.cycle.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.cycle.action.store',
                'slug' => 'api.cycle.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.cycle.action.update',
                'slug' => 'api.cycle.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.cycle.action.destroy',
                'slug' => 'api.cycle.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.action.index',
                'slug' => 'api.etgar22.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.action.show',
                'slug' => 'api.etgar22.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.action.store',
                'slug' => 'api.etgar22.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.action.update',
                'slug' => 'api.etgar22.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.action.destroy',
                'slug' => 'api.etgar22.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group.action.index',
                'slug' => 'api.group.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group.action.show',
                'slug' => 'api.group.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group.action.store',
                'slug' => 'api.group.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group.action.update',
                'slug' => 'api.group.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group.action.destroy',
                'slug' => 'api.group.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.groups-members.action.index',
                'slug' => 'api.groups-members.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.groups-members.action.show',
                'slug' => 'api.groups-members.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.groups-members.action.store',
                'slug' => 'api.groups-members.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.groups-members.action.update',
                'slug' => 'api.groups-members.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.groups-members.action.destroy',
                'slug' => 'api.groups-members.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-members-status.action.index',
                'slug' => 'api.group-members-status.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-members-status.action.show',
                'slug' => 'api.group-members-status.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-members-status.action.store',
                'slug' => 'api.group-members-status.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-members-status.action.update',
                'slug' => 'api.group-members-status.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-members-status.action.destroy',
                'slug' => 'api.group-members-status.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.guide.action.index',
                'slug' => 'api.guide.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.guide.action.show',
                'slug' => 'api.guide.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.guide.action.store',
                'slug' => 'api.guide.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.guide.action.update',
                'slug' => 'api.guide.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.guide.action.destroy',
                'slug' => 'api.guide.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_language.action.index',
                'slug' => 'api.ui_language.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_language.action.show',
                'slug' => 'api.ui_language.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_language.action.store',
                'slug' => 'api.ui_language.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_language.action.update',
                'slug' => 'api.ui_language.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_language.action.destroy',
                'slug' => 'api.ui_language.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission.action.index',
                'slug' => 'api.permission.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission.action.show',
                'slug' => 'api.permission.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission.action.store',
                'slug' => 'api.permission.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission.action.update',
                'slug' => 'api.permission.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission.action.destroy',
                'slug' => 'api.permission.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role.action.index',
                'slug' => 'api.role.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role.action.show',
                'slug' => 'api.role.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role.action.store',
                'slug' => 'api.role.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role.action.update',
                'slug' => 'api.role.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role.action.destroy',
                'slug' => 'api.role.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_bootstrap_theme.action.index',
                'slug' => 'api.ui_bootstrap_theme.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_bootstrap_theme.action.show',
                'slug' => 'api.ui_bootstrap_theme.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_bootstrap_theme.action.store',
                'slug' => 'api.ui_bootstrap_theme.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_bootstrap_theme.action.update',
                'slug' => 'api.ui_bootstrap_theme.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_bootstrap_theme.action.destroy',
                'slug' => 'api.ui_bootstrap_theme.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_jquery_ui_theme.action.index',
                'slug' => 'api.ui_jquery_ui_theme.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_jquery_ui_theme.action.show',
                'slug' => 'api.ui_jquery_ui_theme.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_jquery_ui_theme.action.store',
                'slug' => 'api.ui_jquery_ui_theme.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_jquery_ui_theme.action.update',
                'slug' => 'api.ui_jquery_ui_theme.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.ui_jquery_ui_theme.action.destroy',
                'slug' => 'api.ui_jquery_ui_theme.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.language.action.index',
                'slug' => 'api.language.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.language.action.show',
                'slug' => 'api.language.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.language.action.store',
                'slug' => 'api.language.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.language.action.update',
                'slug' => 'api.language.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.language.action.destroy',
                'slug' => 'api.language.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.user.action.index',
                'slug' => 'api.user.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.user.action.show',
                'slug' => 'api.user.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.user.action.store',
                'slug' => 'api.user.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.user.action.update',
                'slug' => 'api.user.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.user.action.destroy',
                'slug' => 'api.user.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-status.action.index',
                'slug' => 'api.group-status.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-status.action.show',
                'slug' => 'api.group-status.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-status.action.store',
                'slug' => 'api.group-status.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-status.action.update',
                'slug' => 'api.group-status.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-status.action.destroy',
                'slug' => 'api.group-status.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role-user.action.index',
                'slug' => 'api.role-user.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role-user.action.show',
                'slug' => 'api.role-user.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role-user.action.store',
                'slug' => 'api.role-user.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role-user.action.update',
                'slug' => 'api.role-user.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.role-user.action.destroy',
                'slug' => 'api.role-user.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-user.action.index',
                'slug' => 'api.permission-user.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-user.action.show',
                'slug' => 'api.permission-user.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-user.action.store',
                'slug' => 'api.permission-user.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-user.action.update',
                'slug' => 'api.permission-user.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-user.action.destroy',
                'slug' => 'api.permission-user.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-role.action.index',
                'slug' => 'api.permission-role.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-role.action.show',
                'slug' => 'api.permission-role.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-role.action.store',
                'slug' => 'api.permission-role.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-role.action.update',
                'slug' => 'api.permission-role.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.permission-role.action.destroy',
                'slug' => 'api.permission-role.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.contact-note.action.index',
                'slug' => 'api.contact-note.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.contact-note.action.show',
                'slug' => 'api.contact-note.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.contact-note.action.store',
                'slug' => 'api.contact-note.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.contact-note.action.update',
                'slug' => 'api.contact-note.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.contact-note.action.destroy',
                'slug' => 'api.contact-note.action.destroy',
                'description' => '',
                'model' => '',
            ],  [
                'name' => 'api.etgar22.registration.request.action.store',
                'slug' => 'api.etgar22.registration.request.action.store',
                'description' => '',
                'model' => '',
            ],  [
                'name' => 'api.etgar22.registration.request.action.index',
                'slug' => 'api.etgar22.registration.request.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.registration.request.action.show',
                'slug' => 'api.etgar22.registration.request.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.registration.request.action.store',
                'slug' => 'api.etgar22.registration.request.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.registration.request.action.update',
                'slug' => 'api.etgar22.registration.request.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22.registration.request.action.destroy',
                'slug' => 'api.etgar22.registration.request.action.destroy',
                'description' => '',
                'model' => '',
            ],  [
                'name' => 'api.request-status.action.index',
                'slug' => 'api.request-status.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.request-status.action.show',
                'slug' => 'api.request-status.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.request-status.action.store',
                'slug' => 'api.request-status.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.request-status.action.update',
                'slug' => 'api.request-status.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.request-status.action.destroy',
                'slug' => 'api.request-status.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-member-guide.action.index',
                'slug' => 'api.group-member-guide.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-member-guide.action.show',
                'slug' => 'api.group-member-guide.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-member-guide.action.store',
                'slug' => 'api.group-member-guide.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-member-guide.action.update',
                'slug' => 'api.group-member-guide.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.group-member-guide.action.destroy',
                'slug' => 'api.group-member-guide.action.destroy',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.data-from-csv.action.add',
                'slug' => 'api.data-from-csv.action.add',
                'description' => '',
                'model' => '',
            ],
            [
                'name' => 'api.etgar22-progress-status.action.index',
                'slug' => 'api.etgar22-progress-status.action.index',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22-progress-status.action.show',
                'slug' => 'api.etgar22-progress-status.action.show',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22-progress-status.action.store',
                'slug' => 'api.etgar22-progress-status.action.store',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22-progress-status.action.update',
                'slug' => 'api.etgar22-progress-status.action.update',
                'description' => '',
                'model' => '',
            ], [
                'name' => 'api.etgar22-progress-status.action.destroy',
                'slug' => 'api.etgar22-progress-status.action.destroy',
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

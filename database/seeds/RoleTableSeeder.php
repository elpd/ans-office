<?php

use Illuminate\Database\Seeder;
use App\Role;
use Illuminate\Database\Eloquent\Collection;
use App\Permission;

class RoleTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('roles')->delete();

        $allApiPermissions = Permission::where('slug', 'LIKE', 'api.%')->get();

        $basicEnumPermissions = [
            Permission::where('slug', '=', 'api.group.status.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.group.members.status.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.uilanguage.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.uilanguage.action.show')->firstOrFail(),
            Permission::where('slug', '=', 'api.uibootstraptheme.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.uijqueryuitheme.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.language.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.request.status.action.index')->firstOrFail(),
        ];

        $employeeReadingPermissions = [
            Permission::where('slug', '=', 'api.user.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.contact.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.etgar22.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.contact.note.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.group.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.groups.members.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.guide.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.cycle.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.etgar22.registration.request.action.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.group.member.guide.action.index')->firstOrFail(),
        ];

        $employeeWritingPermissions = [
            Permission::where('slug', 'LIKE', 'api.contact.action.%')->get(),
            Permission::where('slug', 'LIKE', 'api.etgar22.action.%')->get(),
            Permission::where('slug', 'LIKE', 'api.contact.note.action.%')->get(),
            Permission::where('slug', 'LIKE', 'api.group.action.%')->get(),
            Permission::where('slug', 'LIKE', 'api.groups.members.action.%')->get(),
            Permission::where('slug', 'LIKE', 'api.cycle.action.%')->get(),
            Permission::where('slug', 'LIKE', 'api.group.member.guide.action.%')->firstOrFail(),
        ];

        $etgar22registratorPermissions = [
            Permission::where('slug', '=', 'api.etgar22.registration.request.action.store')->get(),
        ];

        $itemsData = array(
            array(
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => '',
                'level' => 100,
                'permissions' => [
                    $allApiPermissions
                ]
            ),
            array(
                'name' => 'Employee',
                'slug' => 'employee',
                'description' => '',
                'level' => 20,
                'permissions' => [
                    $employeeReadingPermissions,
                    $employeeWritingPermissions,
                ]
            ), [
                'name' => 'Guide',
                'slug' => 'guide',
                'description' => '',
                'level' => 20,
                'permissions' => [
                    $employeeReadingPermissions,
                    $employeeWritingPermissions,
                ]
            ],
            [
                'name' => 'etgar22registrator',
                'slug' => 'etgar22registrator',
                'description' => 'api account for etgar22 registration',
                'level' => 20,
                'permissions' => [
                    $etgar22registratorPermissions
                ]
            ],
            array(
                'name' => 'User',
                'slug' => 'user',
                'description' => '',
                'level' => 10,
                'permissions' => [
                    $basicEnumPermissions
                ]
            ),
            array(
                'name' => 'Guest',
                'slug' => 'guest',
                'description' => '',
                'level' => 1,
                'permissions' => [

                ]
            ),

        );

        foreach ($itemsData as $itemData) {

            $newItem = Role::create([
                'name' => $itemData['name'],
                'slug' => $itemData['slug'],
                'description' => $itemData['description'],
                'level' => $itemData['level'],
            ]);

            if (isset($itemData['permissions'])) {
                $this->attachPermissionsToModel($newItem, $itemData['permissions']);
            }

            $newItem->saveOrFail();

            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };
    }

    protected function attachPermissionsToModel($model, $permissionsTree)
    {
        foreach ($permissionsTree as $permissionsNode) {
            if ($permissionsNode instanceof \App\Permission) {
                $model->permissions()->attach($permissionsNode);

            } elseif (is_array($permissionsNode) || $permissionsNode instanceof Collection) {
                $this->attachPermissionsToModel($model, $permissionsNode);

            } else {
                //var_dump($permissionsNode);
                throw new \Exception('malformed permissions tree');
            }
        }
    }
}

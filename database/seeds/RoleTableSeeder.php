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
            Permission::where('slug', '=', 'api.group.status.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.group.members.status.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.uilanguage.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.uilanguage.show')->firstOrFail(),
            Permission::where('slug', '=', 'api.uibootstraptheme.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.uijqueryuitheme.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.language.index')->firstOrFail(),
        ];

        $employeeReadingPermissions = [
            Permission::where('slug', '=', 'api.contact.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.etgar22.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.group.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.groups.members.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.guide.index')->firstOrFail(),
            Permission::where('slug', '=', 'api.cycle.index')->firstOrFail(),
        ];

        $itemsData = array(
            array(
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => '',
                'level' => 4,
                'permissions' => [
                    $allApiPermissions
                ]
            ),
            array(
                'name' => 'Employee',
                'slug' => 'employee',
                'description' => '',
                'level' => 3,
                'permissions' => [
                    $employeeReadingPermissions
                ]
            ),
            array(
                'name' => 'User',
                'slug' => 'user',
                'description' => '',
                'level' => 2,
                'permissions' => [
                    $basicEnumPermissions
                ]
            ),
            array(
                'name' => 'Guest',
                'slug' => 'guest',
                'description' => '',
                'level' => 1,
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

    protected function attachPermissionsToModel($model, $permissionsTree) {
        foreach($permissionsTree as $permissionsNode) {
            if ($permissionsNode instanceof \App\Permission){
               $model->permissions()->attach($permissionsNode);

            } elseif (is_array($permissionsNode) || $permissionsNode instanceof Collection){
                $this->attachPermissionsToModel($model, $permissionsNode);

            } else {
                //var_dump($permissionsNode);
                throw new \Exception('malformed permissions tree');
            }
        }
    }
}

<?php

use Illuminate\Database\Seeder;
use Bican\Roles\Models\Role;
use App\User;

class UserTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('users')->delete();

        $initialPassword = Hash::make('root');
        $initialUserPassword = Hash::make('user');

        $adminRole = Role::where('slug', '=', 'admin')->firstOrFail();
        $employeeRole = Role::where('slug', '=', 'employee')->firstOrFail();

        $sampleData = [
            [
                'user' => [
                    'name' => 'root',
                    'email' => 'root@example.com',
                    'password' => $initialPassword,
                ],
                'roles' => [
                    $adminRole,
                    $employeeRole,
                ]
            ],
            [
                'user' => [
                    'name' => 'user_1',
                    'email' => 'user_1@example.com',
                    'password' => $initialUserPassword,
                ],
                'roles' => [
                    $employeeRole
                ]
            ]
        ];

        foreach ($sampleData as $sampleUser) {
            $newItem = User::create($sampleUser['user']);

            foreach ($sampleUser['roles'] as $desiredRole) {
                $newItem->attachRole($desiredRole);
            }

            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        }
    }
}

<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;

class AssignedRoleTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('assigned_roles')->delete();
        
        $user = User::where('username', '=', 'root')->firstOrFail();
        $role = Role::where('name', '=', 'admin')->firstOrFail();
        
        $user->roles()->attach($role);
        
        $role = Role::where('name', '=', 'employee')->firstOrFail();
        
        $user->roles()->attach($role);
    }
}
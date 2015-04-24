<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call('UiLanguageTableSeeder');
        $this->call('UiBootstrapThemeTableSeeder');
        $this->call('UiJqueryUiThemeTableSeeder');
        $this->call('RequestStatusTableSeeder');
        $this->call('PermissionTableSeeder');
        $this->call('RoleTableSeeder');
        $this->call('UserTableSeeder');
        $this->call('GroupMembersStatusTableSeeder');
        $this->call('GroupStatusTableSeeder');
        $this->call('ContactTableSeeder');
        $this->call('CycleTableSeeder');
        $this->call('GroupTableSeeder');
        $this->call('GuideTableSeeder');
        $this->call('GroupsMembersTableSeeder');
        $this->call('ContactNotesTableSeeder');
        $this->call('Etgar22RegistrationRequestTableSeeder');
    }

}

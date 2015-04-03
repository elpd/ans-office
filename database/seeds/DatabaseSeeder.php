<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

        $this->call('UiLanguageTableSeeder');
        $this->call('UiThemeTableSeeder');
		$this->call('RoleTableSeeder');
		$this->call('PermissionTableSeeder');
		$this->call('UserTableSeeder');
		//$this->call('UserSettingsTableSeeder');
		//$this->call('AssignedRoleTableSeeder');
		$this->call('GroupMembersStatusTableSeeder');
		$this->call('GroupStatusTableSeeder');
		$this->call('ContactTableSeeder');
		$this->call('CycleTableSeeder');
		$this->call('GroupTableSeeder');
		$this->call('GuideTableSeeder');
		$this->call('GroupsMembersTableSeeder');
	}

}

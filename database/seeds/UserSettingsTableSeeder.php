<?php

use Illuminate\Database\Seeder;
use App\UserSettings;

class UserSettingsTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('user_settings')->delete();
        
        $user = User::where('username', '=', 'root')->firstOrFail();
        
        $newItem = UserSettings::create(
                array(
                        'user_id' => $user->id,
                        'theme_id' => 'simplex',
                ));
        
        $errors = $newItem->getErrors();
        if (count($errors) > 0) {
            throw new Exception($errors);
        }
        
    }
}
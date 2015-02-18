<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('users')->delete();
        
        $initialPassword = Hash::make('root');
        
        $newItem = User::create(
                array(
                        'name' => 'root',
                        'email' => 'root@example.com',
                        'password' => $initialPassword,
                        //'password_confirmation' => $initialPassword,
                        //'confirmation_code' => Hash::make('first_confirmation'),
                        //'confirmed' => 1,
                ));
        
        $errors = $newItem->getErrors();
        if (count($errors) > 0) {
            throw new Exception($errors);
        }
    }
}
<?php
use Illuminate\Database\Seeder;
use App\Contact;

class ContactTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('contacts')->delete();
                
        $newItem = Contact::create(
                array(
                        'registration_date' => '2014-01-01 00:00:00',
                        'email' => 'contact1@example.com',
                        'first_name' => 'contact1',
                        'last_name' => 'c',
                        'phone' => '054-1112222',
                        'facebook' => 'contact1@facebook.com',
                        'birth_year' => 2000,
                        'donate' => 0,
                        'blacklisted' => 0,
                ));
        
        $errors = $newItem->getErrors();
        if (count($errors) > 0) {
            throw new Exception($errors);
        }
        
    }
}
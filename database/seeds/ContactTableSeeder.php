<?php
use Illuminate\Database\Seeder;
use App\Contact;

class ContactTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('contacts')->delete();
      
        $itemsData = array(
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
          ),
          array(
            'registration_date' => '2014-02-01 00:00:00',
            'email' => 'contact2@example.com',
            'first_name' => 'contact2',
            'last_name' => 'c',
            'phone' => '054-4442222',
            'facebook' => 'contact2@facebook.com',
            'birth_year' => 2000,
            'donate' => 0,
            'blacklisted' => 0,
          )
        );

        foreach ($itemsData as $itemData) {

          $newItem = Contact::create($itemData);

          $errors = $newItem->getErrors();
          if (count($errors) > 0) {
            throw new Exception($errors);
          }
        };
    }
}

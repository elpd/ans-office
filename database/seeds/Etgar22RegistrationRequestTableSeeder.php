<?php
use Illuminate\Database\Seeder;
use App\Etgar22RegistrationRequest;

class Etgar22RegistrationRequestTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('etgar22_registration_requests')->delete();

        $newRequestStatus = \App\RequestStatus::where('name', '=', 'new')->firstOrFail();

        $itemsData = array(
            array(
                'full_name' => 'user1 user',
                'facebook_account_name' => 'user1@facebook.com',
                'email' => 'user1@example.com',
                'phone' => '050-5554444',
                'birth_year' => '2000',
                'request_status_id' => $newRequestStatus->id
            ),
        );

        foreach ($itemsData as $itemData) {

            $newItem = Etgar22RegistrationRequest::create($itemData);

            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };
    }
}

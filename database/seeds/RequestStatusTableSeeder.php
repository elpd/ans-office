<?php

use Illuminate\Database\Seeder;
use App\RequestStatus;

class RequestStatusTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('request_status')->delete();

        $itemsData = [
            [
                'name' => 'opened',
            ],
            [
                'name' => 'in_process',
            ],
            [
                'name' => 'done'
            ]
        ];

        foreach ($itemsData as $itemData) {

            $newItem = RequestStatus::create($itemData);

            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };
    }
}
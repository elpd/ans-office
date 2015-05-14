<?php

use Illuminate\Database\Seeder;
use App\Etgar22ProgressStatus;

class Etgar22ProgressStatusTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('etgar22_progress_statuses')->delete();

        $itemsData = [
            [
                'name' => 'בדרך לטבעונות'
            ],
            [
                'name' => 'בטבעונות'
            ],
            [
                'name' => 'לא שווה השקעה'
            ],
        ];

        foreach ($itemsData as $itemData) {

            $newItem = Etgar22ProgressStatus::create($itemData);

            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };
    }
}
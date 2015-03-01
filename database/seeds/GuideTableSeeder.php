<?php

use Illuminate\Database\Seeder;
use App\Guide;

class GuideTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('guides')->delete();

        $itemsData = array(
          array(
            'name' => "israel",
          ),
          array(
            'name' => 'john',
          ),
        );

        foreach ($itemsData as $itemData) {

          $newItem = Guide::create($itemData);

          $errors = $newItem->getErrors();
          if (count($errors) > 0) {
            throw new Exception($errors);
          }
        };
    }
}

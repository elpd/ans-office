<?php

use Illuminate\Database\Seeder;
use App\UiLanguage;

class UiLanguageTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('ui_languages')->delete();

        $itemsData = array(
          array(
            'name' => "English",
          ),
          array(
            'name' => 'Hebrew',
          ),
        );

        foreach ($itemsData as $itemData) {

          $newItem = UiLanguage::create($itemData);

          $errors = $newItem->getErrors();
          if (count($errors) > 0) {
            throw new Exception($errors);
          }
        };
    }
}

<?php

use Illuminate\Database\Seeder;
use App\UiTheme;

class UiThemeTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('ui_themes')->delete();

        $itemsData = array(
          array(
            'name' => "cerulean",
          ),
          array(
            'name' => 'lumen',
          ),
        );

        foreach ($itemsData as $itemData) {

          $newItem = UiTheme::create($itemData);

          $errors = $newItem->getErrors();
          if (count($errors) > 0) {
            throw new Exception($errors);
          }
        };
    }
}

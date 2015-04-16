<?php

use Illuminate\Database\Seeder;
use App\UiJqueryUiTheme;

class UiJqueryUiThemeTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('ui_jquery_ui_themes')->delete();

        $itemsData = array(
            array(
                'name' => "black-tie",
                'folder' => 'black-tie'
            ),
            array(
                'name' => 'blitzer',
                'folder' => 'blitzer'
            ),
            array(
                'name' => 'cupertino',
                'folder' => 'cupertino'
            ),
            array(
                'name' => 'dark-hive',
                'folder' => 'dark-hive'
            ),
            array(
                'name' => 'dot-luv',
                'folder' => 'dot-luv'
            ),
            array(
                'name' => 'eggplant',
                'folder' => 'eggplant'
            ),
            array(
                'name' => 'excite-bike',
                'folder' => 'excite-bike'
            ),
            array(
                'name' => 'flick',
                'folder' => 'flick'
            ),
            array(
                'name' => 'hot-sneaks',
                'folder' => 'hot-sneaks'
            ),
            array(
                'name' => 'humanity',
                'folder' => 'humanity'
            ),
            array(
                'name' => 'le-frog',
                'folder' => 'le-frog'
            ),
            array(
                'name' => 'mint-choc',
                'folder' => 'mint-choc'
            ),
            array(
                'name' => 'overcast',
                'folder' => 'overcast'
            ),
            array(
                'name' => 'pepper-grinder',
                'folder' => 'pepper-grinder'
            ),
            array(
                'name' => 'redmond',
                'folder' => 'redmond'
            ),
            array(
                'name' => 'smoothness',
                'folder' => 'smoothness'
            ),
            array(
                'name' => 'south-street',
                'folder' => 'south-street'
            ),
            array(
                'name' => 'start',
                'folder' => 'start'
            ),
            array(
                'name' => 'sunny',
                'folder' => 'sunny'
            ),
            array(
                'name' => 'swanky-purse',
                'folder' => 'swanky-purse'
            ),
            array(
                'name' => 'trontastic',
                'folder' => 'trontastic'
            ),
            array(
                'name' => 'ui-darkness',
                'folder' => 'ui-darkness'
            ),
            array(
                'name' => 'ui-lightness',
                'folder' => 'ui-lightness'
            ),
            array(
                'name' => 'vader',
                'folder' => 'vader'
            ),

        );

        foreach ($itemsData as $itemData) {

            $newItem = UiJqueryUiTheme::create($itemData);

            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };
    }
}

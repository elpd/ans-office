<?php

use Illuminate\Database\Seeder;
use App\UiBootstrapTheme;

class UiBootstrapThemeTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('ui_bootstrap_themes')->delete();

        $itemsData = array(
            array(
                'name' => "cerulean",
                'css_file' => 'cerulean-bootstrap.min.css'
            ),
            array(
                'name' => 'lumen',
                'css_file' => 'lumen-bootstrap.min.css'
            ),
            array(
                'name' => 'paper',
                'css_file' => 'paper-bootstrap.min.css'
            ),
            array(
                'name' => 'sandstone',
                'css_file' => 'sandstone-bootstrap.min.css'
            ),
            array(
                'name' => 'simplex',
                'css_file' => 'simplex-bootstrap.min.css'
            ),
            array(
                'name' => 'slate',
                'css_file' => 'slate-bootstrap.min.css'
            ),
            array(
                'name' => 'spacelab',
                'css_file' => 'spacelab-bootstrap.min.css'
            ),
            array(
                'name' => 'superhero',
                'css_file' => 'superhero-bootstrap.min.css'
            ),
            array(
                'name' => 'united',
                'css_file' => 'united-bootstrap.min.css'
            ),
            array(
                'name' => 'yeti',
                'css_file' => 'yeti-bootstrap.min.css'
            ),
            array(
                'name' => 'cosmo',
                'css_file' => 'cosmo-bootstrap.min.css'
            ),
            array(
                'name' => 'cyborg',
                'css_file' => 'cyborg-bootstrap.min.css'
            ),
            array(
                'name' => 'darkly',
                'css_file' => 'darkly-bootstrap.min.css'
            ),
            array(
                'name' => 'flatly',
                'css_file' => 'flatly-bootstrap.min.css'
            ),
            array(
                'name' => 'journal',
                'css_file' => 'journal-bootstrap.min.css'
            ),

        );

        foreach ($itemsData as $itemData) {

            $newItem = UiBootstrapTheme::create($itemData);

            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };
    }
}

<?php

use Illuminate\Database\Seeder;
use App\Guide;

class GuideTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('guides')->delete();                
             
        $newItem = Guide::create(
                array(
                        'name' => "israel",
                ));
        
        $errors = $newItem->getErrors();
        if (count($errors) > 0) {
            throw new Exception($errors);
        }        
        
    }
}
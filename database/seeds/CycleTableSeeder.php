<?php
use Illuminate\Database\Seeder;
use App\Cycle;

class CycleTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('cycles')->delete();
                
        $newItem = Cycle::create(
                array(
                        'startDate' => '2015-01-01'
                ));
        
        $errors = $newItem->getErrors();
        if (count($errors) > 0) {
            throw new Exception($errors);
        }
    }
}
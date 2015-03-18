<?php
use Illuminate\Database\Seeder;
use App\Cycle;

class CycleTableSeeder extends Seeder
{
    public function run ()
    {
        DB::table('cycles')->delete();

        $itemsData = array(
          array(
            'startDate' => '2015-01-01',
            'num' => 1
          ),
          array(
            'startDate' => '2015-02-01',
            'num' => 1
          )
        );

        foreach ($itemsData as $itemData) {

          $newItem = Cycle::create($itemData);

          $errors = $newItem->getErrors();
          if (count($errors) > 0) {
            throw new Exception($errors);
          }
        };
    }
}

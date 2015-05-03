<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Cycle extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    public $fillable = array(
            'startDate',
            'num',
    );

    protected $rules = array(
            "startDate" => array(
                    'required',
                    'date'
            )
    );

    public $nullable = [];

    protected $toStringFields = [
        'id',
        'startDate',
        'num',
    ];

    /*
    * Relationships
    */

    public $relationshipMethods = [
        'groups'
    ];

    public function groups()
    {
      return $this->hasMany('App\Group');
    }
}

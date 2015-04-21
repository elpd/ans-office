<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Group extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    public $fillable = array(
            'cycle_id',
            'name',
            'status_id',
    );

    protected $rules = array(
            'cycle_id' => array(
                    'required',
                    'exists:cycles,id'
            ),
            "name" => array(
                    'required',
                    'alpha_dash'
            ),
            "status_id" => array(
                    'required',
                    'exists:group_status,id'
            ),
    );

    public $nullable = [];

    protected static $linksInfos = [
        'cycle_id' => [
            'fieldName' => 'cycle_id',
            'functionOnChild' => 'cycle',
            'linkedTable' => 'cycles',
            'linkedField' => 'id',
            'linkedClass' => 'App\Cycle'
        ],
        'status_id' => [
            'fieldName' => 'status_id',
            'functionOnChild' => 'status',
            'linkedTable' => 'group_status',
            'linkedField' => 'id',
            'linkedClass' => 'App\GroupStatus'
        ],
    ];

    public function cycle() {
      return $this->belongsTo('App\Cycle');
    }

    public function status() {
        return $this->belongsTo('App\GroupStatus');
    }
}

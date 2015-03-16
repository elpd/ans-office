<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Group extends Model
{
    use ValidatingTrait;

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

    public function cycle() {
      return $this->belongsTo('App\Cycle');
    }
}

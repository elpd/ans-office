<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Log extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    public $fillable = [
            'event_time',
    ];

    protected $rules = [
            'event_time' => [
                    'required',
                    'date'
            ],
    ];

    public $nullable = [];

    public function user_log()
    {
        return $this->hasOne('App\UserLog');
    }
}

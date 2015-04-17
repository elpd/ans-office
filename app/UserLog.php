<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class UserLog extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'user_logs';

    protected $fillable = [
        'log_id',
        'user_id',
        'user_action_type_id',
        'description',
    ];

    protected $rules = [
        'log_id' => [
            'required',
        ],
        'user_id' => [
            'required'
        ],
        'user_action_type_id' => [
            'required'
        ],
    ];

    public $nullable = [];

    public function log()
    {
        return $this->belongsTo('App\Log');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function user_action_type() {
        return $this->belongsTo('App\UserActionType');
    }
}

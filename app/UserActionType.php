<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class UserActionType extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'user_action_types';

    protected $fillable = [
        'name',
    ];

    protected $rules = [
        'name' => [
            'required',
            'alpha_dash'
        ],
    ];

    public $nullable = [];

}

<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class PermissionUser extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'permission_user';

    protected $fillable = [
            'permission_id',
            'user_id',
    ];

    protected $rules = [
            "permission_id" => [
                    'required',
                    'exists:permissions,id'
            ],
            "user_id" => [
                    'required',
                    'exists:users,id'
            ],
    ];

    protected static $linksInfos = [
        'user_id' => [
            'fieldName' => 'user_id',
            'functionOnChild' => 'user',
            'linkedTable' => 'users',
            'linkedField' => 'id',
            'linkedClass' => 'App\User'
        ],
        'permission_id' => [
            'fieldName' => 'permission_id',
            'functionOnChild' => 'permission',
            'linkedTable' => 'permissions',
            'linkedField' => 'id',
            'linkedClass' => 'App\Permission'
        ]
    ];

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function permission() {
        return $this->belongsTo('App\Permission');
    }

}

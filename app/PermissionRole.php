<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class PermissionRole extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'permission_role';

    protected $fillable = [
            'permission_id',
            'role_id',
    ];

    protected $rules = [
            "permission_id" => [
                    'required',
                    'exists:permissions,id'
            ],
            "role_id" => [
                    'required',
                    'exists:roles,id'
            ],
    ];

    protected static $linksInfos = [
        'role_id' => [
            'fieldName' => 'role_id',
            'functionOnChild' => 'role',
            'linkedTable' => 'roles',
            'linkedField' => 'id',
            'linkedClass' => 'App\Role'
        ],
        'permission_id' => [
            'fieldName' => 'permission_id',
            'functionOnChild' => 'permission',
            'linkedTable' => 'permissions',
            'linkedField' => 'id',
            'linkedClass' => 'App\Permission'
        ]
    ];

    protected $toStringFields = [
        'permission_id',
        'role_id'
    ];

    /*
     * Relationships
     */

    public $relationshipMethods = [
        'role',
        'permission',
    ];

    public function role() {
        return $this->belongsTo('App\Role');
    }

    public function permission() {
        return $this->belongsTo('App\Permission');
    }

}

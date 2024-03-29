<?php namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class RoleUser extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'role_user';

    protected $fillable = [
            'role_id',
            'user_id',
    ];

    protected $rules = [
            "role_id" => [
                    'required',
                    'exists:roles,id'
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
        'role_id' => [
            'fieldName' => 'role_id',
            'functionOnChild' => 'role',
            'linkedTable' => 'roles',
            'linkedField' => 'id',
            'linkedClass' => 'App\Role'
        ]
    ];

    protected $toStringFields = [
        'role_id',
        'user_id'
    ];

    /*
     * Relationships
     */

    public $relationshipMethods = [
        'user',
        'role',
    ];


    public function user() {
        return $this->belongsTo('App\User');
    }

    public function role() {
        return $this->belongsTo('App\Role');
    }

    /*
     * Scopes
     */

    public function scopeWhoAreGuides(Builder $query){
        return $query->whereHas('role', function($q)
        {
            $q->where('name', '=', 'guide');
        });
    }
}

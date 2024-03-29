<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Query\Builder;
use Watson\Validating\ValidatingTrait;
use Bican\Roles\Contracts\HasRoleAndPermissionContract;
use Bican\Roles\Traits\HasRoleAndPermission;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{

    use Authenticatable, CanResetPassword;
    use GeneralModel;

    use ValidatingTrait;

    use HasRoleAndPermission;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    protected $rules = [
        'name' => [
            'required',
            'between:4,50'
        ],
        'email' => [
            'required',
            'email'
        ],
    ];

    public $nullable = [];

    protected $toStringFields = [
        'email',
        'name'
    ];

    /*
     * Relationships
     */

    public function settings()
    {
        return $this->hasOne('App\Settings');
    }

    public function guidedGroupMembers() {
        return $this->hasManyThrough('App\GroupsMember', 'App\GroupMemberGuide', 'user_id', 'groups_member_id');
    }

    /*
    * Scopes
    */

    public function scopeAreGuides($query) {
        return $query->whereHas('role', function($subQuery){
           $subQuery->where('roles.slug', '=', 'guide');
        });
    }
}

<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class GroupMemberGuide extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'groups_members_guides';

    public $fillable = array(
            'groups_member_id',
            'user_id',
    );

    public $nullable = array(

    );

    protected $rules = array(
            "groups_member_id" => array(
                    'required',
                    'exists:groups_members,id'
            ),
            "user_id" => array(
                    'required',
                    'exists:users,id'
            ),
    );

    protected static $linksInfos = [
        'groups_member_id' => [
            'fieldName' => 'groups_member_id',
            'functionOnChild' => 'groupMember',
            'linkedTable' => 'groups_members',
            'linkedField' => 'id',
            'linkedClass' => 'App\GroupsMember'
        ],
        'user_id' => [
            'fieldName' => 'user_id',
            'functionOnChild' => 'user',
            'linkedTable' => 'users',
            'linkedField' => 'id',
            'linkedClass' => 'App\User'
        ],
    ];

    /*
     * Relationships
     */

    public $relationshipMethods = [
        'groupMember',
        'user',
    ];

    public function groupMember() {
        return $this->belongsTo('App\GroupsMember', 'groups_member_id');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }
}

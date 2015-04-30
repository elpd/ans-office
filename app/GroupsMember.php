<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class GroupsMember extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'groups_members';

    public $fillable = array(
            'group_id',
            'contact_id',
            'status_id',
    );

    public $nullable = array(

    );

    protected $rules = array(
            "group_id" => array(
                    'required',
                    'exists:groups,id'
            ),
            "contact_id" => array(
                    'required',
                    'exists:contacts,id'
            ),
            "status_id" => array(
                    'required',
                    'exists:group_members_status,id'
            ),
    );

    protected static $linksInfos = [
        'status_id' => [
            'fieldName' => 'status_id',
            'functionOnChild' => 'status',
            'linkedTable' => 'group_members_status',
            'linkedField' => 'id',
            'linkedClass' => 'App\GroupMembersStatus'
        ],
        'contact_id' => [
            'fieldName' => 'contact_id',
            'functionOnChild' => 'contact',
            'linkedTable' => 'contacts',
            'linkedField' => 'id',
            'linkedClass' => 'App\Contact'
        ],
        'group_id' => [
            'fieldName' => 'group_id',
            'functionOnChild' => 'group',
            'linkedTable' => 'groups',
            'linkedField' => 'id',
            'linkedClass' => 'App\Group'
        ],
    ];

    /*
     * Relationships
     */

    public $relationshipMethods = [
        'status',
        'contact',
        'group',
        'guides',
    ];

    public function status() {
        return $this->belongsTo('App\GroupMembersStatus');
    }

    public function contact() {
        return $this->belongsTo('App\Contact');
    }

    public function group() {
        return $this->belongsTo('App\Group');
    }

    public function guides() {
        return $this->belongsToMany('App\User', 'groups_members_guides');
    }
}

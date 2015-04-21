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
            'guide_id_1',
            'guide_id_2',
    );

    public $nullable = array(
      'guide_id_1',
      'guide_id_2'
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
            "guide_id_1" => array(
                    'exists:guides,id'
            ),
            "guide_id_2" => array(
                    'exists:guides,id'
            )
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
        'guide_id_1' => [
            'fieldName' => 'guide_id_1',
            'functionOnChild' => 'guide1',
            'linkedTable' => 'guides',
            'linkedField' => 'id',
            'linkedClass' => 'App\Guide'
        ],
        'guide_id_2' => [
            'fieldName' => 'guide_id_2',
            'functionOnChild' => 'guide2',
            'linkedTable' => 'guides',
            'linkedField' => 'id',
            'linkedClass' => 'App\Guide'
        ],
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

    public function guide1() {
        return $this->belongsTo('App\Guide', 'guide_id_1');
    }

    public function guide2() {
        return $this->belongsTo('App\Guide', 'guide_id_2');
    }

    // Accessors & Mutators

    public function setGuideId2Attribute($value)
    {
        $val = ($value === '') ? null : $value;

        $this->attributes['guide_id_2'] = $val;
    }
}

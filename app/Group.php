<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Group extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    public $fillable = array(
        'cycle_id',
        'name',
        'status_id',
    );

    protected $rules = array(
        'cycle_id' => array(
            'required',
            'exists:cycles,id'
        ),
        "name" => array(
            'required',
        ),
        "status_id" => array(
            'required',
            'exists:group_status,id'
        ),
    );

    public $nullable = [];

    protected static $linksInfos = [
        'cycle_id' => [
            'fieldName' => 'cycle_id',
            'functionOnChild' => 'cycle',
            'linkedTable' => 'cycles',
            'linkedField' => 'id',
            'linkedClass' => 'App\Cycle'
        ],
        'status_id' => [
            'fieldName' => 'status_id',
            'functionOnChild' => 'status',
            'linkedTable' => 'group_status',
            'linkedField' => 'id',
            'linkedClass' => 'App\GroupStatus'
        ],
    ];

    protected $toStringFields = [
        'name',
    ];

    /*
     * Relationships
     */

    public $relationshipMethods = [
        'cycle',
        'status',
    ];

    public $scopeMethods = [
        'arrangeByCycleDateDesc'
    ];

    public function cycle()
    {
        return $this->belongsTo('App\Cycle');
    }

    public function status()
    {
        return $this->belongsTo('App\GroupStatus');
    }

    public function groupMembers()
    {
        return $this->hasMany('App\GroupsMember');
    }

    /*
     * Scopes
     */

    public function scopeGuidedByUser($query, $guide_id)
    {
        $query->whereHas('groupMembers', function ($groupMembersQuery)
        use ($guide_id) {

            $groupMembersQuery->whereHas('guides', function ($guidesQuery)
            use ($guide_id) {

                $guidesQuery->where('users.id', '=', $guide_id);
            });
        });
    }

    public function scopeArrangeByCycleDateDesc($query)
    {
        $sql = 'select startDate
                from cycles
                where cycles.id = groups.id';
        $sql = '(' . $sql . ') DESC';
        $query->orderByRaw($sql);
    }
}

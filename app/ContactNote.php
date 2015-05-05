<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class ContactNote extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'contact_notes';

    protected $fillable = [
        'contact_id',
        'text',
        'user_id',
    ];

    protected $rules = [
        'contact_id' => [
            'required',
            'exists:contacts,id'
        ],
        'user_id' => [
            'required',
            'exists:users,id'
        ],
        'text' => [

        ]
    ];

    protected static $linksInfos = [
        'contact_id' => [
            'fieldName' => 'contact_id',
            'functionOnChild' => 'contact',
            'linkedTable' => 'contacts',
            'linkedField' => 'id',
            'linkedClass' => 'App\Contact'
        ],
        'user_id' => [
            'fieldName' => 'user_id',
            'functionOnChild' => 'user',
            'linkedTable' => 'users',
            'linkedField' => 'id',
            'linkedClass' => 'App\User'
        ],
    ];

    protected $toStringFields = [
        'id',
        'contact_id',
        'created_at',
    ];

    /*
     * Relationships
     */

    public $relationshipMethods = [
        'contact',
        'user',
    ];

    public function contact()
    {
        return $this->belongsTo('App\Contact');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }
}
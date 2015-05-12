<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Contact extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    public $fillable = array(
        'registration_date',
        'email',
        'first_name',
        'last_name',
        'phone',
        'facebook',
        'birth_year',
        'donate',
        'blacklisted',
    );

    public $nullable = [];

    protected $rules = array(
        'registration_date' => [
            'required',
            'date_format:Y-n-j H:i:s',
            'after:2000-01-01'
        ],
        "email" => array(
            'required',
            'email'
        ),
        "first_name" => array(
            'required',
            // Extreme case: first name composed from two names
            'min:2'
        ),
        "last_name" => array(// Extreme case: last name composed from two last names
        ),
        "phone" => array(
            'required',
        //    'phone:IL',
        ),
        "facebook" => array(),
        "birth_year" => [
            'numeric'
        ],
        "donate" => array(),
        "blacklisted" => array(),
    );

    protected $toStringFields = [
        'email',
        'first_name'
    ];

    /*
     * Relationships
     */

    public $relationshipMethods = [
        'etgar22',
        'guides',
    ];

    public $scopeMethods = [
        'singular',
        'inGroup',
        'guidedByUser'
    ];

    public function etgar22()
    {
        return $this->hasOne('App\Etgar22');
    }

    public function groupMembers()
    {
        return $this->hasMany('App\GroupsMember');
    }

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'donate' => 'boolean',
        'blacklisted' => 'boolean',
    ];

    /*public function getRegistrationDateAttribute($value)
    {
        return new \Carbon\Carbon($value);
    }*/

    public function scopeSingular($query, $email, $firstName)
    {
        return $query->where('email', '=', $email)
            ->where('first_name', '=', $firstName);
    }

    public function scopeInGroup($query, $group_id)
    {
        $query->whereHas('groupMembers', function ($groupMembersQuery)
        use ($group_id) {

            $groupMembersQuery->whereHas('group', function ($groupQuery)
            use ($group_id) {

                $groupQuery->where('groups.id', '=', $group_id);
            });
        });
    }

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

    /*
     * Static helpers
     */

    public static function translateFullName($fullName)
    {
        $contactNames = new \stdClass();
        $contactNames->firstName = '';
        $contactNames->lastName = '';

        $tempArray = explode(' ', $fullName);
        if (count($tempArray) > 0) {
            $contactNames->firstName = $tempArray[0];
        }
        if (count($tempArray) > 1) {
            $contactNames->lastName = $tempArray[1];
        }

        return $contactNames;
    }

    public static function findByEmailName($email, $firstName)
    {
        $contactResults = self::singular($email, $firstName)->get();

        switch ($contactResults->count()) {
            case 0:
                return null;
            case 1:
                return $contactResults[0];
            default:
                throw new \Exception(
                    'Multiple contacts with same email and first name'); // TODO: custom exception.
        }
    }

    public static function findByEmailNameOrNew($email, $firstName)
    {
        $contacts = self::singular($email, $firstName)->get();

        if ($contacts->count() == 0) {
            $contact = new static;
        } else {
            $contact = $contacts[0];
        }

        return $contact;
    }
}

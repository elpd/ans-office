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
        "last_name" => array(
            // Extreme case: last name composed from two last names
        ),
        "phone" => array(
            'required',
            'phone:IL',
        ),
        "facebook" => array(),
        "birth_year" => [
            'numeric'
        ],
        "donate" => array(),
        "blacklisted" => array(),
    );

    /*
     * Relationships
     */

    public function etgar22()
    {
        return $this->hasOne('App\Etgar22');
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
}

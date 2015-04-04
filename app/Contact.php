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
        "first_name" => array(
            'required',
        ),
        "last_name" => array(
        ),
        "phone" => array(
            'required',
            'alpha_dash'
        ),
        "facebook" => array(),
        "birth_year" => array(),
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
}

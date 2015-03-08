<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Contact extends Model
{
    use ValidatingTrait;

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
                    'alpha_dash'
            ),
            "last_name" => array(
                    'required',
                    'alpha_dash'
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

}

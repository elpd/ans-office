<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Guide extends Model
{
    use ValidatingTrait;
    
    protected $fillable = array(
            'name',
    );

    protected $rules = array(
            "name" => array(
                    'required',
                    'alpha_dash'
            ),
    );
    
}
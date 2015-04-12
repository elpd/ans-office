<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class UiLanguage extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'ui_languages';

    protected $fillable = array(
            'name',
            'code'
    );

    protected $rules = array(
            "name" => array(
                    'required',
                    'alpha_dash'
            ),
            'code' => [
                'required',
                'alpha_dash'
            ]
    );
    
}
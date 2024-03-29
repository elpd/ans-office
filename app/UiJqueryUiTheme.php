<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class UiJqueryUiTheme extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'ui_jquery_ui_themes';

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
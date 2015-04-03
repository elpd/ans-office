<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Settings extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'settings_user';

    protected $fillable = array(
        'ui_language_id',
        'ui_theme_id'
    );

    protected $rules = [

    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function ui_theme()
    {
        return $this->belongsTo('App\UiTheme');
    }

    public function ui_language()
    {
        return $this->belongsTo('App\UiLanguage');
    }

}
<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Etgar22 extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'etgar22';

    protected $fillable = [
        'contact_id',
        'facebook_know_how',
        'call_for_facebook_help',
        'registration_date',
        'notes',
        'next_call',
        'why_go_vegan',
        'parent_name',
        'parent_email',
    ];

    protected $rules = [];

    /*
    * Relationships
    */

    public function contact()
    {
        return $this->belongsTo('App\Contact');
    }
}
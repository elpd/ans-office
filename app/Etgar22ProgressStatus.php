<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Etgar22ProgressStatus extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'etgar22_progress_statuses';
    
    protected $fillable = array(
            'name',
    );
    
    protected $rules = array();

    protected $toStringFields = [
        'id',
        'name',
    ];

    /*
     * Relationships
     */

    public $relationshipMethods = [

    ];
}
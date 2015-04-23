<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class RequestStatus extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'request_status';
    
    protected $fillable = array(
            'name',
    );
    
    protected $rules = array();    
}
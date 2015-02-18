<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class GroupStatus extends Model
{
    use ValidatingTrait;
    
    protected $table = 'group_status';
    
    protected $fillable = array(
            'status',
    );
    
    protected $rules = array();    
}
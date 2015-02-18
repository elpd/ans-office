<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Etgar22 extends Model
{
    use ValidatingTrait;
    
    protected $table = 'etgar22';
    
    protected $rules = array();    
}
<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class GroupsMember extends Model
{
    use ValidatingTrait;

    protected $table = 'groups_members';

    public $fillable = array(
            'group_id',
            'contact_id',
            'status_id',
            'guide_id_1',
            'guide_id_2',
    );

    public $nullable = array(
      'guide_id_1',
      'guide_id_2'
    );

    protected $rules = array(
            "group_id" => array(
                    'required',
                    'exists:groups,id'
            ),
            "contact_id" => array(
                    'required',
                    'exists:contacts,id'
            ),
            "status_id" => array(
                    'required',
                    'exists:group_members_status,id'
            ),
            "guide_id_1" => array(
                    'exists:guides,id'
            ),
            "guide_id_2" => array(
                    'exists:guides,id'
            )
    );

}

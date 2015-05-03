<?php namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;
use App\GeneralModel;

class Permission extends \Bican\Roles\Models\Permission
{
    use ValidatingTrait;
    use GeneralModel;

    public $nullable = [];
    protected $rules = [];

    protected $toStringFields = [
        'name',
        'slug'
    ];

    /*
     * Relationships
     */

    public $relationshipMethods = [
        'users',
        'roles',
    ];
}

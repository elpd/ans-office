<?php

namespace App\Utilities\Query;


class SchemaRepository
{
    protected $tables = [
    ];

    public function __construct()
    {
        $models = [
            'App\Contact',
            'App\ContactNote',
            'App\Cycle',
            'App\Etgar22',
            'App\Etgar22RegistrationRequest',
            'App\Group',
            'App\GroupMemberGuide',
            'App\GroupMembersStatus',
            'App\GroupsMember',
            'App\Permission',
            'App\PermissionRole',
            'App\PermissionUser',
            'App\Role',
            'App\RoleUser',
            'App\Settings',
            'App\UiBootstrapTheme',
            'App\UiJqueryUiTheme',
            'App\UiLanguage',
            'App\User',
        ];

        foreach ($models as $modelClass) {
            $newItem = new $modelClass();
            $this->addTable(
              new TableData($newItem->getTable(), $modelClass)
            );
        }
    }

    public function getModelForTableName($table_name)
    {
        foreach ($this->tables as $table) {
            if ($table->getName() == $table_name){
                return $table->getModelClass();
            }
        }

        throw new \Exception('item not found');
    }

    protected function addTable(TableData $tableData)
    {
        if ($this->isTableExists($tableData->getName())){
            throw new \Exception('item already exists');
        }

        $this->tables[] = $tableData;
    }

    protected function isTableExists($table_name){
        foreach ($this->tables as $table){
            if ($table->getName() == $table_name){
                return true;
            }
        }

        return false;
    }
}
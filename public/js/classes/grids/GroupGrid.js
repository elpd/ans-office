define([
    'require',
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/GroupSubRow',
    'classes/bi/Cycle',
    'classes/bi/GroupStatus',
    'services/language',
    'classes/grids/CycleGrid'
], function (require,
             _,
             utilities,
             Grid,
             GroupSubRow,
             Cycle,
             GroupStatus,
             lang,
             CycleGrid) {

    var CONTROLLER_URL = '/api/group';

    var defaultColumns = null;

    var Class = function (params) {
        var self = this;

        CycleGrid = require('classes/grids/CycleGrid');

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inharitance.
        params.caption = lang.get('bo.groups');
        params.SubRow = GroupSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.children().add({
            name: 'cycle',
            title: lang.get('bo.cycle'),
            queryJoinTable: 'cycles',
            queryLinkMethod: 'cycle',
            columns: _.values(_.values(Object.create(CycleGrid.prototype).getDefaultColumnsDefinitions()))
        });

        self.columns().selectAbsolute([
            'id',
            'cycle_id',
            'name',
            'status_id',
            'updated_at'
        ]);
    };

    var static_defaultColumnsDefinitions = null;

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnsDefinitions: {
            get: function () {
                if (static_defaultColumnsDefinitions != null) {
                    return static_defaultColumnsDefinitions;
                }

                static_defaultColumnsDefinitions =
                {
                    cycle_id: {
                        label: _.capitalize(lang.get('bo.group_cycle-id')),
                        name: 'cycle_id',
                        editable: true,
                        edittype: 'select',
                        formatter: 'select',
                        editoptions: {
                            value: utilities.generateGetItems('/api/cycle', Cycle)(),
                            dataUrl: '/api/cycle',
                            buildSelect: utilities.generateBuildSelect(Cycle)
                        }
                        ,
                        extraInfo: {
                            linkMethod: 'cycle',
                            searchByRelationshipMethod: true,
                            sortByForeignLinkToString: true
                        }
                    }
                    ,
                    name: {
                        label: _.capitalize(lang.get('bo.group_name')),
                        name: 'name',
                        editable: true,
                        editoptions: {}
                        //search:true,
                        //stype:'text',

                    }
                    ,
                    status_id: {
                        label: _.capitalize(lang.get('bo.group_status-id')),
                        name: 'status_id',
                        editable: true,
                        edittype: 'select',
                        formatter: 'select',
                        editoptions: {
                            value: utilities.generateGetItems('/api/group-status', GroupStatus)(),
                            dataUrl: '/api/group-status',
                            buildSelect: utilities.generateBuildSelect(GroupStatus)
                        }
                        ,
                        extraInfo: {
                            linkMethod: 'status',
                            searchByRelationshipMethod: true,
                            sortByForeignLinkToString: true
                        }
                    }
                }

                return static_defaultColumnsDefinitions;
            }
        }

    });

    return Class;
});
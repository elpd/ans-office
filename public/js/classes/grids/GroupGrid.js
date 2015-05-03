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

    var defaultColumns = {
        id: {
            label: _.capitalize(lang.get('bo.id')),
            name: 'id',
            width: 50,
            key: true,
            searchoptions: {
                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
            },
            searchrules: {
                integer: true
            }
        },
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
            },
            extraInfo: {
                linkMethod: 'cycle',
                searchByForeignLinkToString: true,
                sortByForeignLinkToString: true
            }
        },
        name: {
            label: _.capitalize(lang.get('bo.group_name')),
            name: 'name',
            editable: true,
            editoptions: {}
            //search:true,
            //stype:'text',

        },
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
            },
            extraInfo: {
                linkMethod: 'status',
                searchByForeignLinkToString: true,
                sortByForeignLinkToString: true
            }
        }
    };

    var Class = function (params) {
        var self = this;

        CycleGrid = require('classes/grids/CycleGrid');

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inharitance.
        params.caption = lang.get('bo.groups');
        params.SubRow = GroupSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.cycle_id);
        self.columns().add(self.defaultColumnDefs.name);
        self.columns().add(self.defaultColumnDefs.status_id);

        self.children().add({
            name: 'cycle',
            title: lang.get('bo.cycle'),
            queryJoinTable: 'cycles',
            columns: _.values(CycleGrid.prototype.defaultColumnDefs)
        });

        self.columns().selectAbsoluteAll();
    };

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnDefs: {
            get: function () {
                return _.cloneDeep(defaultColumns);
            }
        }
    });

    return Class;
});
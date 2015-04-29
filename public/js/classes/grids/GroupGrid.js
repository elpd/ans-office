define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/GroupSubRow',
    'classes/bi/Cycle',
    'classes/bi/GroupStatus',
    'services/language',
    'services/userSettings'
], function (_,
             utilities,
             Grid,
             GroupSubRow,
             Cycle,
             GroupStatus,
             lang,
             userSettingService) {

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
            label: _.capitalize(lang.get('bo.group_cycle')),
            name: 'cycle_id',
            editable: true,
            edittype: 'select',
            formatter: 'select',
            editoptions: {
                value: utilities.generateGetItems('/api/cycle', Cycle)(),
                dataUrl: '/api/cycle',
                buildSelect: utilities.generateBuildSelect(Cycle)
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
            label: _.capitalize(lang.get('bo.group_status')),
            name: 'status_id',
            editable: true,
            edittype: 'select',
            formatter: 'select',
            editoptions: {
                value: utilities.generateGetItems('/api/group-status', GroupStatus)(),
                dataUrl: '/api/group-status',
                buildSelect: utilities.generateBuildSelect(GroupStatus)
            }
        }
    };

    var Class = function (params) {
        var self = this;

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
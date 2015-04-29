define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/PermissionRoleSubRow',
    'classes/bi/Role',
    'classes/bi/Permission',
    'services/language'
], function (_,
             utilities,
             Grid,
             PermissionRoleSubRow,
             Role,
             Permission,
             lang) {

    var CONTROLLER_URL = '/api/permission-role';

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
        permission_id: {
            label: _.capitalize(lang.get('bo.permission-role_permission-id')),
            name: 'permission_id',
            editable: true,
            edittype: 'select',
            formatter: 'select',
            editoptions: {
                value: utilities.generateGetItems('/api/permission', Permission)(),
                dataUrl: '/api/permission',
                buildSelect: utilities.generateBuildSelect(Permission)
            }
        },
        role_id: {
            label: _.capitalize(lang.get('bo.permission-role_role-id')),
            name: 'role_id',
            editable: true,
            edittype: 'select',
            formatter: 'select',
            editoptions: {
                value: utilities.generateGetItems('/api/role', Role)(),
                dataUrl: '/api/role',
                buildSelect: utilities.generateBuildSelect(Role)
            }
        }
    };

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        params.caption = lang.get('bo.permission-role');
        params.SubRow = PermissionRoleSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.permission_id);
        self.columns().add(self.defaultColumnDefs.role_id);
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
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

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        params.caption = lang.get('bo.permission-role');
        params.SubRow = PermissionRoleSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.columns().selectAbsolute([
            'id',
            'permission_id',
            'role_id',
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

                static_defaultColumnsDefinitions = {
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
                        },
                        extraInfo: {
                            linkMethod: 'permission',
                            searchByRelationshipMethod: true,
                            sortByForeignLinkToString: true
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
                        },
                        extraInfo: {
                            linkMethod: 'role',
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
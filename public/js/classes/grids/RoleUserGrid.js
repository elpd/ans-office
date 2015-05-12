define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/RoleUserSubRow',
    'services/language',
    'classes/bi/Role',
    'classes/bi/User'
], function (_,
             utilities,
             Grid,
             RoleUserSubRow,
             lang,
             Role,
             User) {

    var CONTROLLER_URL = '/api/role-user';

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        params.caption = lang.get('bo.role-user');
        params.SubRow = RoleUserSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.columns().selectAbsolute([
            'id',
            'role_id',
            'user_id',
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
                    role_id: {

                        label: _.capitalize(lang.get('bo.role-user_role-id')),
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
                    },
                    user_id: {
                        label: _.capitalize(lang.get('bo.role-user_user-id')),
                        name: 'user_id',
                        editable: true,
                        edittype: 'select',
                        formatter: 'select',
                        editoptions: {
                            value: utilities.generateGetItems('/api/user', User)(),
                            dataUrl: '/api/user',
                            buildSelect: utilities.generateBuildSelect(User)
                        },
                        extraInfo: {
                            linkMethod: 'user',
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
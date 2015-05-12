define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/PermissionUserSubRow',
    'services/language',
    'classes/bi/Permission',
    'classes/bi/User'
], function (_,
             utilities,
             Grid,
             PermissionUserSubRow,
             lang,
             Permission,
             User) {

    var CONTROLLER_URL = '/api/permission-user';

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        params.caption = lang.get('bo.permission-user');
        params.SubRow = PermissionUserSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.columns().selectAbsolute([
            'id',
            'permission_id',
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
                    permission_id: {

                        label: _.capitalize(lang.get('bo.permission-user_permission-id')),
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
                    user_id: {
                        label: _.capitalize(lang.get('bo.permission-user_user-id')),
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
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
                searchByForeignLinkToString: true,
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
                searchByForeignLinkToString: true,
                sortByForeignLinkToString: true
            }
        }
    };

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        params.caption = lang.get('bo.permission-user');
        params.SubRow = PermissionUserSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.permission_id);
        self.columns().add(self.defaultColumnDefs.user_id);

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
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

    var defaultColumns = null;



    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        params.caption = lang.get('bo.role-user');
        params.SubRow = RoleUserSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.role_id);
        self.columns().add(self.defaultColumnDefs.user_id);

        self.columns().selectAbsoluteAll();
    };

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnDefs: {
            get: function () {
                var self = this;
                if (defaultColumns == null) {
                    defaultColumns = generateDefaultColumns();
                }
                return _.cloneDeep(defaultColumns);
            }
        }
    });

    function generateDefaultColumns() {
        var columnsDefs = {
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
                    searchByForeignLinkToString: true,
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
                    searchByForeignLinkToString: true,
                    sortByForeignLinkToString: true
                }
            }
        };

        return columnsDefs;
    }

    return Class;
});
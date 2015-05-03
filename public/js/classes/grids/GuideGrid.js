define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/GuideSubRow',
    'classes/bi/User',
    'classes/bi/Role',
    'services/language'
], function (_,
             utilities,
             Grid,
             GuideSubRow,
             User,
             Role,
             lang
             ) {

    var CONTROLLER_URL = '/api/guide';

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
        user_id: {
            label: _.capitalize(lang.get('bo.role-user_user-id')),
            name: 'user_id',
            width: 200,
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
        },
        role_id: {
            label: _.capitalize(lang.get('bo.role-user_role-id')),
            name: 'role_id',
            width: 200,
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
        }
    };

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        params.caption = lang.get('bo.guides');
        params.SubRow = GuideSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.user_id);
        self.columns().add(self.defaultColumnDefs.role_id);

        self.columns().selectAbsoluteAll();
    };

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnDefs: {
            get: function () {
                return _.cloneDeep(defaultColumns);
            }
        },
        defaultJoins: {
            get: function () {
                return _.cloneDeep(defaultJoins);
            }
        }
    });

    return Class;
});
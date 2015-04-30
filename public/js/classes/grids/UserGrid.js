define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/UserSubRow',
    'services/language',
    'services/userSettings'
], function (_,
             utilities,
             Grid,
             UserSubRow,
             lang,
             userSettingService) {

    var CONTROLLER_URL = '/api/user';

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
        name: {
            label: lang.get('bo.user_name'),
            name: 'name',
            editable: true,
            //edittype: 'select',
            //formatter: 'integer',
            editoptions: {}
        },
        email: {
            label: lang.get('bo.user_email'),
            name: 'email',
            editable: true,
            //edittype: 'select',
            //formatter: 'integer',
            editoptions: {},
            editrules: {
                required: true,
                email: true
            }
        },
        password: {
            label: lang.get('bo.user_password'),
            name: 'password',
            editable: true,
            //hidden: true,
            edittype: 'password',
            editoptions: {},
            editrules: {
                edithidden: true//,
                //required: true
            }
        },
        password_confirmation: {
            label: lang.get('bo.user_password_confirmation'),
            name: 'password_confirmation',
            editable: true,
            //hidden: true,
            edittype: 'password',
            editrules: {
                edithidden: true//,
                //required: true
            }
        }
    };

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inharitance.
        params.caption = lang.get('bo.users');
        params.SubRow = UserSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.name);
        self.columns().add(self.defaultColumnDefs.email);
        self.columns().add(self.defaultColumnDefs.password);
        self.columns().add(self.defaultColumnDefs.password_confirmation);

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
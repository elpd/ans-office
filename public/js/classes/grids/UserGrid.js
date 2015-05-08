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

    var defaultColumns = null;

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inharitance.
        params.caption = lang.get('bo.users');
        params.SubRow = UserSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.columns().selectAbsolute([
            'id',
            'name',
            'email',
            'password',
            'password_confirmation',
            'updated_at'
        ]);
    };

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnsDefinitions: {
            value: {
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
            }
        }

    });

    return Class;
});
define([
    'require',
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/ContactSubRow',
    'services/language',
    'services/userSettings'
], function (require,
             _,
             utilities,
             Grid,
             ContactSubRow,
             lang,
             userSettingService) {

    var CONTROLLER_URL = '/api/contact';

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
        registration_date: {
            label: lang.get('bo.registration_date'),
            name: 'registration_date',
            editable: true,
            //edittype: 'select',
            formatter: 'datetime',
            datefmt: 'yyyy-mm-dd',
            editoptions: {
                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                // use it to place a third party control to customize the toolbar
                dataInit: utilities.generateDateTimePicker
            },
            //stype: 'datetime',
            searchoptions: {
                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'],
                dataInit: utilities.generateDateTimePicker
            },
            searchrules: {
                date: true
            }
        },
        email: {
            label: lang.get('bo.email'),
            name: 'email',
            editable: true,
            editoptions: {}
            //search:true,
            //stype:'text',

        },
        first_name: {
            label: lang.get('bo.first_name'),
            name: 'first_name',
            editable: true,
            editoptions: {}
        },
        last_name: {
            label: lang.get('bo.last_name'),
            name: 'last_name',
            editable: true,
            editoptions: {}
        },
        phone: {
            label: lang.get('bo.phone'),
            name: 'phone',
            editable: true,
            editoptions: {}
        },
        facebook: {
            label: lang.get('bo.facebook_account'),
            name: 'facebook',
            editable: true,
            editoptions: {}
        },
        birth_year: {
            label: lang.get('bo.birth_year'),
            name: 'birth_year',
            editable: true,
            editoptions: {},
            searchoptions: {
                // show search options
                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
            }
        },
        donate: {
            label: lang.get('bo.donate'),
            name: 'donate',
            editable: true,
            formatter: 'checkbox',
            align: 'center',
            width: 100,
            fixed: true,
            edittype: 'checkbox',
            editoptions: {
                value: "1:0"
            },
            stype: "select",
            searchoptions: {
                sopt: ['eq', 'ne'],
                value: ":All;1:Yes;0:No"
            }
        },
        blacklisted: {
            label: lang.get('bo.blacklisted'),
            name: 'blacklisted',
            editable: true,
            formatter: 'checkbox',
            align: 'center',
            width: 100,
            fixed: true,
            edittype: 'checkbox',
            editoptions: {
                value: "1:0"
            },
            stype: "select",
            searchoptions: {
                sopt: ['eq', 'ne'],
                value: ":All;1:Yes;0:No"
            }
        }
    };

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inharitance.
        params.caption = lang.get('bo.contacts');
        //var ContactSubRow = require('classes/subRows/ContactSubRow');
        params.SubRow = ContactSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.registration_date);
        self.columns().add(self.defaultColumnDefs.email);
        self.columns().add(self.defaultColumnDefs.first_name);
        self.columns().add(self.defaultColumnDefs.last_name);
        self.columns().add(self.defaultColumnDefs.phone);
        self.columns().add(self.defaultColumnDefs.facebook);
        self.columns().add(self.defaultColumnDefs.birth_year);
        self.columns().add(self.defaultColumnDefs.donate);
        self.columns().add(self.defaultColumnDefs.blacklisted);
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
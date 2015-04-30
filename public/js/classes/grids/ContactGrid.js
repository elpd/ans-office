define([
    'require',
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/ContactSubRow',
    'services/language',
    'classes/grids/Etgar22Grid'
], function (require,
             _,
             utilities,
             Grid,
             ContactSubRow,
             lang,
             Etgar22Grid) {

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
            label: _.capitalize(lang.get('bo.registration_date')),
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
            label: _.capitalize(lang.get('bo.email')),
            name: 'email',
            editable: true,
            editoptions: {}
            //search:true,
            //stype:'text',

        },
        first_name: {
            label: _.capitalize(lang.get('bo.first_name')),
            name: 'first_name',
            editable: true,
            editoptions: {}
        },
        last_name: {
            label: _.capitalize(lang.get('bo.last_name')),
            name: 'last_name',
            editable: true,
            editoptions: {}
        },
        phone: {
            label: _.capitalize(lang.get('bo.phone')),
            name: 'phone',
            editable: true,
            editoptions: {}
        },
        facebook: {
            label: _.capitalize(lang.get('bo.facebook_account')),
            name: 'facebook',
            editable: true,
            editoptions: {}
        },
        birth_year: {
            label: _.capitalize(lang.get('bo.birth_year')),
            name: 'birth_year',
            editable: true,
            editoptions: {},
            searchoptions: {
                // show search options
                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
            }
        },
        donate: {
            label: _.capitalize(lang.get('bo.donate')),
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
            label: _.capitalize(lang.get('bo.blacklisted')),
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

        self.children().add({
            name: 'etgar22',
            title: lang.get('bo.etgar22'),
            queryJoinTable: 'etgar22',
            columns: _.values(Etgar22Grid.prototype.defaultColumnDefs)
        });

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
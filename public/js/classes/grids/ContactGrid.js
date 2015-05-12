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

    var defaultColumns = null;

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inharitance.
        params.caption = lang.get('bo.contacts');
        params.SubRow = ContactSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.children().add({
            name: 'etgar22',
            title: lang.get('bo.etgar22'),
            queryJoinTable: 'etgar22',
            queryLinkMethod: 'etgar22',
            columns: _.values(_.values(Object.create(Etgar22Grid.prototype).getDefaultColumnsDefinitions()))
        });

        self.columns().selectAbsolute([
            'id',
            'registration_date',
            'email',
            'first_name',
            'last_name',
            'phone',
            'facebook',
            'birth_year',
            'donate',
            'blacklisted',
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

                static_defaultColumnsDefinitions =
                {
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
                }

                return static_defaultColumnsDefinitions;
            }
        }
    });

    return Class;
});
define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/Etgar22SubRow',
    'classes/bi/Contact',
    'services/language'
], function (_,
             utilities,
             Grid,
             Etgar22SubRow,
             Contact,
             lang) {

    var CONTROLLER_URL = '/api/etgar22';

    var defaultColumns = null;



    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inharitance.
        params.caption = lang.get('bo.etgar22');
        params.SubRow = Etgar22SubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.contact_id);
        self.columns().add(self.defaultColumnDefs.facebook_know_how);
        self.columns().add(self.defaultColumnDefs.call_for_facebook_help);
        self.columns().add(self.defaultColumnDefs.registration_date);
        self.columns().add(self.defaultColumnDefs.notes);
        self.columns().add(self.defaultColumnDefs.next_call);
        self.columns().add(self.defaultColumnDefs.why_go_vegan);
        self.columns().add(self.defaultColumnDefs.parent_name);
        self.columns().add(self.defaultColumnDefs.parent_email);

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
            contact_id: {
                label: _.capitalize(lang.get('bo.etgar22_contact-id')),
                name: 'contact_id',
                editable: true,
                edittype: 'select',
                formatter: 'select',
                editoptions: {
                    value: utilities.generateGetItems('/api/contact', Contact)(),
                    dataUrl: '/api/contact',
                    buildSelect: utilities.generateBuildSelect(Contact)
                },
                extraInfo: {
                    linkMethod: 'contact',
                    searchByForeignLinkToString: true,
                    sortByForeignLinkToString: true
                }
            },
            facebook_know_how: {
                label: _.capitalize(lang.get('bo.etgar22_facebook-know-how')),
                name: 'facebook_know_how',
                editable: true,
                formatter: 'checkbox',
                align: 'center',
                width: 100,
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
            call_for_facebook_help: {
                label: _.capitalize(lang.get('bo.etgar22_call-for-facebook-help')),
                name: 'call_for_facebook_help',
                editable: true,
                formatter: 'checkbox',
                align: 'center',
                width: 100,
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
            registration_date: {
                label: _.capitalize(lang.get('bo.etgar22_registration-date')),
                name: 'registration_date',
                editable: true,
                formatter: 'datetime',
                datefmt: 'yyyy-mm-dd',
                editoptions: {
                    // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                    // use it to place a third party control to customize the toolbar
                    dataInit: utilities.generateDateTimePicker
                },
                //stype: 'datetime',
                searchoptions: {
                    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                    // TODO: bug in jqgrid ? find out why same id as parent search.
                    //dataInit: utilities.generateDateTimePicker
                },
                searchrules: {
                    date: true
                }
            },
            notes: {
                label: _.capitalize(lang.get('bo.etgar22_notes')),
                name: 'notes',
                editable: true,
                editoptions: {}
                //search:true,
                //stype:'text',

            },
            next_call: {
                label: _.capitalize(lang.get('bo.etgar22_next-call')),
                name: 'next_call',
                editable: true,
                formatter: 'datetime',
                datefmt: 'yyyy-mm-dd',
                editoptions: {
                    // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                    // use it to place a third party control to customize the toolbar
                    dataInit: utilities.generateDateTimePicker
                },
                //stype: 'datetime',
                searchoptions: {
                    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                    // TODO: bug in jqgrid ? find out why same id as parent search.
                    //dataInit: utilities.generateDateTimePicker
                },
                searchrules: {
                    date: true
                }
            },
            why_go_vegan: {
                label: _.capitalize(lang.get('bo.etgar22_why-go-vegan')),
                name: 'why_go_vegan',
                editable: true,
                editoptions: {}
                //search:true,
                //stype:'text',

            },
            parent_name: {
                label: _.capitalize(lang.get('bo.etgar22_parent-name')),
                name: 'parent_name',
                editable: true,
                editoptions: {}
                //search:true,
                //stype:'text',

            },
            parent_email: {
                label: _.capitalize(lang.get('bo.etgar22_parent-email')),
                name: 'parent_email',
                editable: true,
                editoptions: {}
                //search:true,
                //stype:'text',

            }
        };

        return columnsDefs;
    }

    return Class;
});
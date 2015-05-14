define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/ContactNoteSubRow',
    'services/language',
    'classes/bi/User',
    'classes/bi/Contact'
], function (_,
             utilities,
             Grid,
             ContactNoteSubRow,
             lang,
             User,
             Contact) {

    var CONTROLLER_URL = '/api/contact-note';

    var defaultColumns = null;

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inharitance.
        params.caption = lang.get('bo.contact-notes');
        params.SubRow = ContactNoteSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.columns().selectAbsolute([
            'id',
            'contact_id',
            'user_id',
            'text',
            'created_at',
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
                    contact_id: {
                        label: _.capitalize(lang.get('bo.contact-note_contact-id')),
                        name: 'contact_id',
                        width: 200,
                        editable: false,
                        edittype: 'select',
                        formatter: 'select',
                        editoptions: {
                            value: utilities.generateGetItems('/api/contact', Contact)(),
                            dataUrl: '/api/contact',
                            buildSelect: utilities.generateBuildSelect(Contact)
                        },
                        extraInfo: {
                            linkMethod: 'user',
                            searchByRelationshipMethod: true,
                            sortByForeignLinkToString: true
                        }
                    },
                    user_id: {
                        label: _.capitalize(lang.get('bo.contact-note_user-id')),
                        name: 'user_id',
                        width: 200,
                        editable: false,
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
                    },
                    text: {
                        label: _.capitalize(lang.get('bo.contact-note_text')),
                        name: 'text',
                        editable: true,
                        editoptions: {}
                        //search:true,
                        //stype:'text',

                    },
                    created_at: {
                        label: _.capitalize(lang.get('bo.contact-note_created-at')),
                        name: 'created_at',
                        editable: false,
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
                            //dataInit: generateDateTimePicker
                        },
                        searchrules: {
                            date: true
                        }
                    }


                }
                return static_defaultColumnsDefinitions;
            }
        }
    });

    return Class;
});
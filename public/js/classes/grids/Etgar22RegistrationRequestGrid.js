define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/Etgar22RegistrationRequestSubRow',
    'services/language',
    'classes/bi/RequestStatus'
], function (_,
             utilities,
             Grid,
             Etgar22RegistrationRequestSubRow,
             lang,
             RequestStatus) {

    var CONTROLLER_URL = '/api/etgar22-registration-request';

    var defaultColumns = null;



    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inheritance.
        params.caption = lang.get('bo.etgar-22-registration-request');
        params.SubRow = Etgar22RegistrationRequestSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.columns().selectAbsolute([
            'id',
            'full_name',
            'facebook_account_name',
            'email',
            'phone',
            'birth_year',
            'call_for_donation',
            'facebook_know_how',
            'call_for_facebook_help',
            'why_go_vegan',
            'parent_name',
            'parent_email',
            'request_status_id',
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

                static_defaultColumnsDefinitions =
                {
                    full_name: {
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_full_name')),
                        name: 'full_name',
                        editable: false,
                        editoptions: {}
                    },
                    facebook_account_name: {
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_facebook_account_name')),
                        name: 'facebook_account_name',
                        editable: false,
                        editoptions: {}
                    },
                    email: {
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_email')),
                        name: 'email',
                        editable: false,
                        editoptions: {}
                    },
                    phone: {
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_phone')),
                        name: 'phone',
                        editable: false,
                        editoptions: {}
                    },
                    birth_year: {
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_birth_year')),
                        name: 'birth_year',
                        editable: false,
                        editoptions: {}
                    },
                    call_for_donation: {
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_call_for_donation')),
                        name: 'call_for_donation',
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
                    facebook_know_how: {
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_facebook_know_how')),
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
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_call_for_facebook_help')),
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
                    why_go_vegan: {
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_why_go_vegan')),
                        name: 'why_go_vegan',
                        editable: false,
                        editoptions: {}
                    },
                    parent_name: {
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_parent_name')),
                        name: 'parent_name',
                        editable: false,
                        editoptions: {}
                    },
                    parent_email: {
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_parent_email')),
                        name: 'parent_email',
                        editable: false,
                        editoptions: {}
                    },
                    request_status_id: {
                        label: _.capitalize(lang.get('bo.etgar-22-registration-request_status')),
                        name: 'request_status_id',
                        editable: false,
                        edittype: 'select',
                        formatter: 'select',
                        editoptions: {
                            value: utilities.generateGetItems('/api/request-status', RequestStatus)(),
                            dataUrl: '/api/request-status',
                            buildSelect: utilities.generateBuildSelect(RequestStatus)
                        }
                    },
                    created_at: {
                        label: _.capitalize(lang.get('bo.general_created_at')),
                        name: 'created_at',
                        editable: false,
                        editoptions: {}
                    }
                }

                return static_defaultColumnsDefinitions;
            }

        }
    });

    return Class;
});
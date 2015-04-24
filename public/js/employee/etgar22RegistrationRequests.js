define([
        'lodash',
        'classes/utilities',
        'classes/bi/Etgar22RegistrationRequest',
        'classes/bi/RequestStatus',
        'classes/EmptySubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings',
        'classes/GeneralContentPageObject'
    ],
    function (_,
              utilities,
              Etgar22RegistrationRequest,
              RequestStatus,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid,
              userSettingsGService,
              GeneralContentPageObject) {

        $(document).ready(function () {

            var page = new GeneralContentPageObject({
                name: 'etgar22_registration_requests'
            });

            userSettingsGService.load().then(function () {

                    var grid = new GeneralGrid({
                        getDesiredHeightInContainer: function () {
                            return page.getGridDesiredHeight();
                        },
                        getDesiredWidthInContainer: function () {
                            return page.getGridDesiredWidth();
                        },
                        lang: lang,
                        userSettingsGService: userSettingsGService,
                        controllerUrl: '/api/etgar22-registration-request',
                        biName: 'etgar22_registration_request',
                        biNamePlural: 'etgar22_registration_requests',
                        caption: _.capitalize(lang.get('bo.etgar-22-registration-requests')),
                        SubRow: SubRow,
                        direction: userSettingsGService.getLanguage().direction,
                        colModel: [{
                            label: _.capitalize(lang.get('bo.id')),
                            name: 'id',
                            width: 30,
                            key: true,
                            searchoptions: {
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                            },
                            searchrules: {
                                integer: true
                            }
                        }, {
                            label: _.capitalize(lang.get('bo.etgar-22-registration-request_full_name')),
                            name: 'full_name',
                            editable: false,
                            editoptions: {}
                        }, {
                            label: _.capitalize(lang.get('bo.etgar-22-registration-request_facebook_account_name')),
                            name: 'facebook_account_name',
                            editable: false,
                            editoptions: {}
                        }, {
                            label: _.capitalize(lang.get('bo.etgar-22-registration-request_email')),
                            name: 'email',
                            editable: false,
                            editoptions: {}
                        }, {
                            label: _.capitalize(lang.get('bo.etgar-22-registration-request_phone')),
                            name: 'phone',
                            editable: false,
                            editoptions: {}
                        }, {
                            label: _.capitalize(lang.get('bo.etgar-22-registration-request_birth_year')),
                            name: 'birth_year',
                            editable: false,
                            editoptions: {}
                        }, {
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
                        }, {
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
                        }, {
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
                        }, {
                            label: _.capitalize(lang.get('bo.etgar-22-registration-request_why_go_vegan')),
                            name: 'why_go_vegan',
                            editable: false,
                            editoptions: {}
                        }, {
                            label: _.capitalize(lang.get('bo.etgar-22-registration-request_parent_name')),
                            name: 'parent_name',
                            editable: false,
                            editoptions: {}
                        }, {
                            label: _.capitalize(lang.get('bo.etgar-22-registration-request_parent_email')),
                            name: 'parent_email',
                            editable: false,
                            editoptions: {}
                        }, {
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
                        }, {
                            label: _.capitalize(lang.get('bo.general_created_at')),
                            name: 'created_at',
                            editable: false,
                            editoptions: {}
                        }],
                        colModelExtraFunction: function () {
                            return JSON.stringify({
                                request_status_id: {
                                    sortOnLinkField: 'name',
                                    searchOnLinkField: 'name'
                                }
                            });
                        }
                    });

                    grid.activate();
                }
            )
            ;

        });

    });

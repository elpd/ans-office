define([
        'lodash',
        'classes/utilities',
        'classes/bi/Contact',
        'employee/contacts.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings'
    ],
    function (_,
              utilities,
              Contact,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid,
              userSettingsGService) {

        $(document).ready(function () {


            userSettingsGService.load().then(function () {

                    var grid = new GeneralGrid({
                        lang: lang,
                        userSettingsGService: userSettingsGService,
                        controllerUrl: '/api/contact',
                        biName: 'contact',
                        biNamePlural: 'contacts',
                        caption: _.capitalize(lang.get('bo.contacts')),
                        SubRow: SubRow,
                        direction: userSettingsGService.getLanguage().direction,
                        colModel: [{
                            label: lang.get('bo.id'),
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
                            label: lang.get('bo.registration_date'),
                            name: 'registration_date',
                            editable: true,
                            //edittype: 'select',
                            formatter: 'datetime',
                            datefmt: 'yyyy-mm-dd',
                            editoptions: {
                                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                                // use it to place a third party control to customize the toolbar
                                dataInit: generateDateTimePicker
                            },
                            //stype: 'datetime',
                            searchoptions: {
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'],
                                dataInit: generateDateTimePicker
                            },
                            searchrules: {
                                date: true
                            }
                        }, {
                            label: lang.get('bo.email'),
                            name: 'email',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        }, {
                            label: lang.get('bo.first_name'),
                            name: 'first_name',
                            editable: true,
                            editoptions: {}
                        }, {
                            label: lang.get('bo.last_name'),
                            name: 'last_name',
                            editable: true,
                            editoptions: {}
                        }, {
                            label: lang.get('bo.phone'),
                            name: 'phone',
                            editable: true,
                            editoptions: {}
                        }, {
                            label: lang.get('bo.facebook_account'),
                            name: 'facebook',
                            editable: true,
                            editoptions: {}
                        }, {
                            label: lang.get('bo.birth_year'),
                            name: 'birth_year',
                            editable: true,
                            editoptions: {},
                            searchoptions: {
                                // show search options
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                            }
                        }, {
                            label: lang.get('bo.donate'),
                            name: 'donate',
                            editable: true,
                            formatter: 'checkbox',
                            align: 'center',
                            width: 100,
                            fixed: 100,
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
                        }]
                    });

                    grid.activate();
                }
            )
            ;

        });

        // TODO: make global
        function generateDateTimePicker(element) {
            $(element).datetimepicker({
                dateFormat: 'yy-mm-dd',
                timeFormat: 'HH:mm:ss'
            });
        }
    });



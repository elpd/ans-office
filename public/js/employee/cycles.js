define([
        'lodash',
        'classes/utilities',
        'classes/bi/Cycle',
        'employee/cycles.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings'
    ],
    function (_,
              utilities,
              Cycle,
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
                        controllerUrl: '/api/cycle',
                        biName: 'cycle',
                        biNamePlural: 'cycles',
                        caption: _.capitalize(lang.get('bo.cycles')),
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
                            label: lang.get('bo.cycle_start_date'),
                            name: 'startDate',
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
                            label: lang.get('bo.cycle_num'),
                            name: 'num',
                            editable: true,
                            editoptions: {

                            },
                            editrules: {
                                integer: true
                            },
                            searchoptions: {
                                // show search options
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                            },
                            searchrules: {
                                integer: true
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


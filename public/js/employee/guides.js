define([
        'lodash',
        'classes/utilities',
        'classes/bi/Guide',
        'employee/emptySubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings'
    ],
    function (_,
              utilities,
              Guide,
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
                        controllerUrl: '/api/guide',
                        biName: 'guide',
                        biNamePlural: 'guides',
                        caption: _.capitalize(lang.get('bo.guides')),
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
                        },  {
                            label: lang.get('bo.guide_name'),
                            name: 'name',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

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



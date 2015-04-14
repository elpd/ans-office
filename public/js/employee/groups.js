define([
        'lodash',
        'classes/utilities',
        'classes/bi/Group',
        'classes/bi/Cycle',
        'classes/bi/GroupStatus',
        'employee/groups.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings'
    ],
    function (_,
              utilities,
              Group,
              Cycle,
              GroupStatus,
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
                        controllerUrl: '/api/group',
                        biName: 'group',
                        biNamePlural: 'groups',
                        caption: _.capitalize(lang.get('bo.groups')),
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
                            label: lang.get('bo.group_cycle'),
                            name: 'cycle_id',
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/cycle', Cycle)(),
                                dataUrl: '/api/cycle',
                                buildSelect: utilities.generateBuildSelect(Cycle)
                            },
                            searchoptions: {
                                // show search options
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                            }
                        }, {
                            label: lang.get('bo.group_name'),
                            name: 'name',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        }, {
                            label: 'Statue',
                            name: 'status_id',
                            width: 75,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/group-status', GroupStatus)(),
                                dataUrl: '/api/group-status',
                                buildSelect: utilities.generateBuildSelect(GroupStatus)
                            },
                            searchoptions: {
                                // show search options
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
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



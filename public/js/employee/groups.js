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
        'services/userSettings',
        'classes/GeneralContentPageObject'
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
              userSettingsGService,
              GeneralContentPageObject) {

        $(document).ready(function () {

            var page = new GeneralContentPageObject({
                name: 'groups'
            });

            userSettingsGService.load().then(function () {

                    var grid = new GeneralGrid({
                        getDesiredHeightInContainer: function(){
                            return page.getGridDesiredHeight();
                        },
                        getDesiredWidthInContainer: function() {
                            return page.getGridDesiredWidth();
                        },
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
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/cycle', Cycle)(),
                                dataUrl: '/api/cycle',
                                buildSelect: utilities.generateBuildSelect(Cycle)
                            }
                        }, {
                            label: lang.get('bo.group_name'),
                            name: 'name',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        }, {
                            label: lang.get('bo.group_status'),
                            name: 'status_id',
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/group-status', GroupStatus)(),
                                dataUrl: '/api/group-status',
                                buildSelect: utilities.generateBuildSelect(GroupStatus)
                            }
                        }],
                        colModelExtraFunction: function () {
                            return JSON.stringify({
                                cycle_id: {
                                    sortOnLinkField: 'startDate',
                                    searchOnLinkField: 'startDate'
                                },
                                status_id: {
                                    sortOnLinkField: 'status',
                                    searchOnLinkField: 'status'
                                }
                            });
                        }
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



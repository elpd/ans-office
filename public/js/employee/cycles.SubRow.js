define([
        'lodash',
        'classes/utilities',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/GeneralGrid',
        'classes/EmptySubRow',
        'classes/GeneralGrid',
        'classes/bi/GroupStatus',
        'classes/GeneralGridSubRowPageObject'
    ],
    function (_,
              utilities,
              GridTab,
              ChildTabsPanel,
              GeneralGrid,
              EmptySubRow,
              GeneralGrid,
              GroupStatus,
              GeneralGridSubRowPageObject) {

        var Class = function SubRow(params) {
            this.parentControllerUrl = params.parentControllerUrl;
            this.lang = params.lang;
            this.userSettingsGService = params.userSettingsGService;
        };

        Class.prototype = {
            // the event handler on expanding parent row receives two parameters
            // the ID of the grid row  and the primary key of the row
            show: function (parentRowID, parentRowKey) {
                var self = this;

                var page = new GeneralGridSubRowPageObject({
                    pageId: parentRowID
                });

                var groupsTabs = new GridTab({
                    parentRowId: parentRowID,
                    name: 'groups',
                    lang: self.lang,
                    langCaption: 'bo.groups'
                });

                var childTabsPanel = new ChildTabsPanel({
                    id: parentRowID,
                    tabs: [
                        groupsTabs
                    ],
                    direction: self.userSettingsGService.getLanguage().direction
                });

                $('#' + parentRowID).append(
                    childTabsPanel.createElement()
                );

                $('#' + groupsTabs.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        getDesiredHeightInContainer: function(){
                            return page.getGridDesiredHeight();
                        },
                        getDesiredWidthInContainer: function() {
                            return page.getGridDesiredWidth();
                        },
                        lang: self.lang,
                        controllerUrl: '/api/group',
                        parentLink: {
                            id: parentRowKey,
                            childFieldName: 'cycle_id'
                        },
                        gridId: groupsTabs.gridId,
                        biName: 'group',
                        biNamePlural: 'groups',
                        caption: _.capitalize(self.lang.get('bo.groups')),
                        SubRow: EmptySubRow,
                        direction: self.userSettingsGService.getLanguage().direction,
                        colModel: [{
                            label: _.capitalize(self.lang.get('bo.id')),
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
                            label: _.capitalize(self.lang.get('bo.group_name')),
                            name: 'name',
                            editable: true,
                            editoptions: {}

                        }, {
                            label: _.capitalize(self.lang.get('bo.group_status')),
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
                                status_id: {
                                    sortOnLinkField: 'status',
                                    searchOnLinkField: 'status'
                                }
                            });
                        }
                    });

                    grid.activate();

                    $(this).tab('show');
                });

            }
        };

        function generateDateTimePicker(element) {
            $(element).datetimepicker({
                dateFormat: 'yy-mm-dd',
                timeFormat: 'HH:mm:ss'
            });
        }

        return Class;
    });


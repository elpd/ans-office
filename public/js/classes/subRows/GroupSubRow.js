define([
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'services/language',
        'services/userSettings',
        'classes/grids/GroupMemberGrid',
        'classes/grids/CycleGrid'
    ],
    function (_,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
              lang,
              userSettingsService,
              GroupMemberGrid,
              CycleGrid) {

        var Class = function (params) {
            SubRow.call(this, params);
        };

        Class.prototype = Object.create(SubRow.prototype, {
            execute: {
                value: function () {
                    var self = this;

                    userSettingsService.ready().then(function () {
                        var rowData = self.getRowData();

                        var groupMembersTab = new GridTab({
                            mainId: self.subRowId + '_group_member',
                            Grid: require('classes/grids/GroupMemberGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.group_group-members')),
                            beforeGridCreation: function (gridParams) {
                                gridParams.calcDesiredHeightInContainer = function () {
                                    return self.calcGridDesiredHeight();
                                };
                                gridParams.calcDesiredWidthInContainer = function () {
                                    return self.calcGridDesiredWidth();
                                };
                                gridParams.hasParent = true;
                                gridParams.parentLink = {
                                    id: rowData.id,
                                    childFieldName: 'group_id'
                                };
                            },

                            beforeGridExecution: function (grid) {
                                grid.columns().hide('group_id');

                            },

                            afterGridExecution: function (grid) {

                            }

                        });

                        var cycleTab = new GridTab({
                            mainId: self.subRowId + '_cycle',
                            Grid: require('classes/grids/CycleGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.group_cycle-id')),
                            beforeGridCreation: function (gridParams) {
                                gridParams.calcDesiredHeightInContainer = function () {
                                    return self.calcGridDesiredHeight();
                                };
                                gridParams.calcDesiredWidthInContainer = function () {
                                    return self.calcGridDesiredWidth();
                                };
                                gridParams.hasParent = true;
                                gridParams.parentLink = {
                                    id: rowData.cycle_id,
                                    childFieldName: 'id'
                                };
                            },
                            beforeGridExecution: function (grid) {

                            }
                        });

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                groupMembersTab,
                                cycleTab
                            ],
                            direction: userSettingsService.getLanguage().direction
                        });

                        $('#' + self.subRowId).append(
                            childTabsPanel.createElement()
                        );

                        childTabsPanel.clickToOpenFirstTab();
                    });
                }
            }
        });

        return Class;
    });

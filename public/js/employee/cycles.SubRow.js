define([
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'services/language',
        'services/userSettings',
        'classes/grids/GroupGrid'
    ],
    function (_,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
              lang,
              userSettingsService,
              GroupGrid) {

        var Class = function (params) {
            SubRow.call(this, params);
        };

        Class.prototype = Object.create(SubRow.prototype, {
            execute: {
                value: function () {
                    var self = this;

                    userSettingsService.ready().then(function () {
                        var rowData = self.getRowData();

                        var groupsTab = new GridTab({
                            mainId: self.subRowId + '_groups',
                            Grid: require('classes/grids/GroupGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.cycle_groups')),
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
                                    childFieldName: 'cycle_id'
                                };
                            },

                            beforeGridExecution: function (grid) {
                                grid.columns().makeHidden('cycle_id');

                            },

                            afterGridExecution: function (grid) {

                            }

                        });

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                groupsTab,

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

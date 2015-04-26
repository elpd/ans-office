define([
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/grids/GroupsMembersGuideGrid',
        'services/language',
        'services/userSettings'
    ],
    function (_,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
              GroupsMembersGuideGrid,
              lang,
              userSettingsService) {

        var Class = function (params) {
            SubRow.call(this, params);
        };

        Class.prototype = Object.create(SubRow.prototype, {
            execute: {
                value: function () {
                    var self = this;

                    userSettingsService.ready().then(function () {
                        var rowData = self.getRowData();

                        var groupsMembersAssociationTab = new GridTab({
                            mainId: self.subRowId,
                            caption: lang.get('bo.group-member'),
                            //direction: userSettingsService.getLanguage().direction,
                            gridInitialization: function (gridId) {
                                var grid = new GroupsMembersGuideGrid({
                                    gridId: gridId,
                                    caption: _.capitalize(lang.get('bo.group-member')),
                                    calcDesiredHeightInContainer: function () {
                                        return self.calcGridDesiredHeight();
                                    },
                                    calcDesiredWidthInContainer: function () {
                                        return self.calcGridDesiredWidth();
                                    },
                                    hasParent: true,
                                    parentLink: {
                                        id: rowData.user_id,
                                        childFieldName: 'user_id'
                                    },
                                    direction: userSettingsService.getLanguage().direction
                                });
                                return grid;
                            }
                        });

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                groupsMembersAssociationTab
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

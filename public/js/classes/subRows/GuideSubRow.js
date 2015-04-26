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

        var Class = function SubRow(params) {
            SubRow.call(this, params);
        };

        Class.prototype = Object.create(SubRow.prototype, {
            execute: {
                value: function () {
                    var self = this;

                    userSettingsService.ready().then(function () {
                        var rowData = self.getRowData();

                        var groupsMembersAssociationTabs = new GridTab({
                            mainId: self.subRowId,
                            caption: lang.get('bo.group-member'),
                            gridInitialization: function (gridId) {
                                var grid = new GroupsMembersGuideGrid({
                                    gridId: gridId,
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
                                    }
                                });
                                return grid;
                            }
                        });

                        var childTabsPanel = new ChildTabsPanel({
                            id: self.rowId,
                            tabs: [
                                groupsMembersAssociationTabs
                            ],
                            direction: userSettingsService.getLanguage().direction
                        });

                        $('#' + self.rowId).append(
                            childTabsPanel.createElement()
                        );
                    });
                }
            }
        });

        return Class;
    });

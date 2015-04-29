define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/grids/GroupMemberGrid',
        'classes/grids/GroupGrid',
        'classes/grids/ContactGrid',
        'services/language',
        'services/userSettings'
    ],
    function (require,
              _,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
              GroupMemberGrid,
              GroupGrid,
              ContactGrid,
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

                        var groupMemberTab = new GridTab({
                            mainId: self.subRowId + '_group_member_guide_group_member',
                            Grid: require('classes/grids/GroupMemberGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.group-member-guide_group-member-id')),
                            beforeGridCreation: function (gridParams) {
                                gridParams.calcDesiredHeightInContainer = function () {
                                    return self.calcGridDesiredHeight();
                                };
                                gridParams.calcDesiredWidthInContainer = function () {
                                    return self.calcGridDesiredWidth();
                                };
                                gridParams.hasParent = true;
                                gridParams.parentLink = {
                                    id: rowData.groups_member_id,
                                    childFieldName: 'id'
                                };
                            },

                            beforeGridExecution: function (grid) {

                            },

                            afterGridExecution: function (grid) {

                            }

                        });

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                groupMemberTab
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

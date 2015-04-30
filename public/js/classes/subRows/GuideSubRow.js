define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/grids/GroupMemberGuideGrid',
        'classes/grids/UserGrid',
        'services/language',
        'services/userSettings',
        'classes/bi/Group',
        'classes/bi/Contact',
        'classes/bi/GroupMembersStatus'
    ],
    function (require,
              _,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
              GroupMemberGuideGrid,
              UserGrid,
              lang,
              userSettingsService,
              Group,
              Contact,
              GroupMembersStatus) {

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
                            mainId: self.subRowId + '_group_member_association',
                            Grid: require('classes/grids/GroupMemberGuideGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: lang.get('bo.group-member-guide'),
                            beforeGridCreation: function (gridParams) {
                                gridParams.calcDesiredHeightInContainer = function () {
                                    return self.calcGridDesiredHeight();
                                };
                                gridParams.calcDesiredWidthInContainer = function () {
                                    return self.calcGridDesiredWidth();
                                };
                                gridParams.hasParent = true;
                                gridParams.parentLink = {
                                    id: rowData.user_id,
                                    childFieldName: 'user_id'
                                };
                            },

                            beforeGridExecution: function (grid) {
                                grid.columns().makeHidden('user_id');
                            }
                        });

                        var usersTab = new GridTab({
                            mainId: self.subRowId + '_user',
                            Grid: UserGrid,
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.user')),
                            beforeGridCreation: function (gridParams) {
                                gridParams.calcDesiredHeightInContainer = function () {
                                    return self.calcGridDesiredHeight();
                                };
                                gridParams.calcDesiredWidthInContainer = function () {
                                    return self.calcGridDesiredWidth();
                                };
                                gridParams.hasParent = true;
                                gridParams.parentLink = {
                                    id: rowData.user_id,
                                    childFieldName: 'id'
                                };
                            },
                            beforeGridExecution: function (grid) {

                            }
                        });

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                groupsMembersAssociationTab,
                                usersTab
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

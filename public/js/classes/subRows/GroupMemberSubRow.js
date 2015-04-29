define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/grids/ContactGrid',
        'classes/grids/GroupGrid',
        'classes/grids/GroupMemberGuideGrid',
        'services/language',
        'services/userSettings'
    ],
    function (require,
              _,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
              ContactGrid,
              GroupGrid,
              GuideGrid,
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

                        var contactTab = new GridTab({
                            mainId: self.subRowId + '_contact',
                            Grid: require('classes/grids/ContactGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: lang.get('bo.group-member_contact-id'),
                            beforeGridCreation: function (gridParams) {
                                gridParams.calcDesiredHeightInContainer = function () {
                                    return self.calcGridDesiredHeight();
                                };
                                gridParams.calcDesiredWidthInContainer = function () {
                                    return self.calcGridDesiredWidth();
                                };
                                gridParams.hasParent = true;
                                gridParams.parentLink = {
                                    id: rowData.contact_id,
                                    childFieldName: 'id'
                                };
                            },
                            beforeGridExecution: function (grid) {
                            },
                            afterGridExecution: function (grid) {
                            }
                        });

                        var groupTab = new GridTab({
                            mainId: self.subRowId + '_group',
                            Grid: require('classes/grids/GroupGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: lang.get('bo.group-member_group-id'),
                            beforeGridCreation: function (gridParams) {
                                gridParams.calcDesiredHeightInContainer = function () {
                                    return self.calcGridDesiredHeight();
                                };
                                gridParams.calcDesiredWidthInContainer = function () {
                                    return self.calcGridDesiredWidth();
                                };
                                gridParams.hasParent = true;
                                gridParams.parentLink = {
                                    id: rowData.group_id,
                                    childFieldName: 'id'
                                };
                            },
                            beforeGridExecution: function (grid) {
                            },
                            afterGridExecution: function (grid) {
                            }
                        });

                        var guidesTab = new GridTab({
                            mainId: self.subRowId + '_guides',
                            Grid: require('classes/grids/GroupMemberGuideGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: lang.get('bo.group-member_guides'),
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
                                    childFieldName: 'groups_member_id'
                                };
                            },
                            beforeGridExecution: function (grid) {
                                grid.columns().hide('groups_member_id');
                            },
                            afterGridExecution: function (grid) {
                            }
                        });

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                guidesTab,
                                contactTab,
                                groupTab
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

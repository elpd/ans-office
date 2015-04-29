define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/grids/UserGrid',
        'classes/grids/RoleGrid',
        'services/language',
        'services/userSettings'
    ],
    function (require,
              _,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
              UserGrid,
              RoleGrid,
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

                        var userTab = new GridTab({
                            mainId: self.subRowId + '_user',
                            Grid: require('classes/grids/UserGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.role-user_user-id')),
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
                            },
                            afterGridExecution: function (grid) {
                            }
                        });

                        var roleTab = new GridTab({
                            mainId: self.subRowId + '_role',
                            Grid: require('classes/grids/RoleGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.role-user_role-id')),
                            beforeGridCreation: function (gridParams) {
                                gridParams.calcDesiredHeightInContainer = function () {
                                    return self.calcGridDesiredHeight();
                                };
                                gridParams.calcDesiredWidthInContainer = function () {
                                    return self.calcGridDesiredWidth();
                                };
                                gridParams.hasParent = true;
                                gridParams.parentLink = {
                                    id: rowData.role_id,
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
                                userTab,
                                roleTab
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

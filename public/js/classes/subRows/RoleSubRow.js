define([
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'services/language',
        'services/userSettings',
        'classes/grids/RoleUserGrid',
        'classes/grids/PermissionRoleGrid'
    ],
    function (_,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
              lang,
              userSettingsService,
              RoleUserGrid,
              PermissionRoleGrid) {

        var Class = function (params) {
            SubRow.call(this, params);
        };

        Class.prototype = Object.create(SubRow.prototype, {
            execute: {
                value: function () {
                    var self = this;

                    userSettingsService.ready().then(function () {
                        var rowData = self.getRowData();

                        var roleUsersTab = new GridTab({
                            mainId: self.subRowId + '_role_users',
                            Grid: require('classes/grids/RoleUserGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.role_users')),
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
                                    childFieldName: 'role_id'
                                };
                            },

                            beforeGridExecution: function (grid) {
                                grid.columns().makeHidden('role_id');

                            },

                            afterGridExecution: function (grid) {

                            }

                        });

                        var rolePermissionsTab = new GridTab({
                            mainId: self.subRowId + '_role_permissions',
                            Grid: require('classes/grids/PermissionRoleGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.role_permissions')),
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
                                    childFieldName: 'role_id'
                                };
                            },

                            beforeGridExecution: function (grid) {
                                grid.columns().makeHidden('role_id');
                            },

                            afterGridExecution: function (grid) {

                            }

                        });

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                roleUsersTab,
                                rolePermissionsTab
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

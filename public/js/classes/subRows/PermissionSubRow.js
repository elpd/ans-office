define([
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'services/language',
        'services/userSettings',
        'classes/grids/PermissionUserGrid',
        'classes/grids/PermissionRoleGrid'
    ],
    function (_,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
              lang,
              userSettingsService,
              PermissionUserGrid,
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

                        var permissionUsersTab = new GridTab({
                            mainId: self.subRowId + '_permission_users',
                            Grid: require('classes/grids/PermissionUserGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.permission_users')),
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
                                    childFieldName: 'permission_id'
                                };
                            },

                            beforeGridExecution: function (grid) {
                                grid.columns().makeHidden('permission_id');

                            },

                            afterGridExecution: function (grid) {

                            }

                        });

                        var permissionRolesTab = new GridTab({
                            mainId: self.subRowId + '_permission_roles',
                            Grid: require('classes/grids/PermissionRoleGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.permission_roles')),
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
                                    childFieldName: 'permission_id'
                                };
                            },

                            beforeGridExecution: function (grid) {
                                grid.columns().makeHidden('permission_id');

                            },

                            afterGridExecution: function (grid) {

                            }

                        });

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                permissionUsersTab,
                                permissionRolesTab
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

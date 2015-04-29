define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/grids/RoleGrid',
        'classes/grids/PermissionGrid',
        'services/language',
        'services/userSettings'
    ],
    function (require,
              _,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
              RoleGrid,
              PermissionGrid,
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

                        var permissionTab = new GridTab({
                            mainId: self.subRowId + '_permission',
                            Grid: require('classes/grids/PermissionGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: lang.get('bo.permission-role_permission-id'),
                            beforeGridCreation: function (gridParams) {
                                gridParams.calcDesiredHeightInContainer = function () {
                                    return self.calcGridDesiredHeight();
                                };
                                gridParams.calcDesiredWidthInContainer = function () {
                                    return self.calcGridDesiredWidth();
                                };
                                gridParams.hasParent = true;
                                gridParams.parentLink = {
                                    id: rowData.permission_id,
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
                            caption: lang.get('bo.permission-role_role-id'),
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
                                permissionTab,
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

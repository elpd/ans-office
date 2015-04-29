define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/grids/Etgar22Grid',
        'classes/grids/GroupMemberGrid',
        'services/language',
        'services/userSettings'
    ],
    function (require,
              _,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
              Etgar22Grid,
              GroupMemberGrid,
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

                        var etgar22Tab = new GridTab({
                            mainId: self.subRowId + '_etgar22',
                            Grid: require('classes/grids/Etgar22Grid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.contact_etgar22')),
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
                                    childFieldName: 'contact_id'
                                };
                            },

                            beforeGridExecution: function (grid) {
                                grid.columns().hide('contact_id');
                            }
                        });

                        var groupMembersTab = new GridTab({
                            mainId: self.subRowId + '_group_member',
                            Grid: require('classes/grids/GroupMemberGrid'),
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.contact_group-members')),
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
                                    childFieldName: 'contact_id'
                                };
                            },

                            beforeGridExecution: function (grid) {
                                grid.columns().hide('contact_id');

                            },

                            afterGridExecution: function (grid) {

                            }

                        });

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                groupMembersTab,
                                etgar22Tab
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

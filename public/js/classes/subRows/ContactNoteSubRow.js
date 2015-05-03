define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/grids/ContactGrid',
        'classes/grids/UserGrid',
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
              UserGrid,
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
                            caption: lang.get('bo.contact-note_contact_id'),
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
                            }
                        });

                        var userTab = new GridTab({
                            mainId: self.subRowId + '_user',
                            Grid: UserGrid,
                            direction: userSettingsService.getLanguage().direction,
                            caption: _.capitalize(lang.get('bo.contact-note_user-id')),
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
                                contactTab,
                                userTab
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

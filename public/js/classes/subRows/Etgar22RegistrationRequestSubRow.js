define([
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'services/language',
        'services/userSettings'
    ],
    function (_,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
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

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                //groupsMembersAssociationTab
                            ],
                            direction: userSettingsService.getLanguage().direction
                        });

                        $('#' + self.subRowId).append(
                            childTabsPanel.createElement()
                        );

                        //childTabsPanel.clickToOpenFirstTab();
                    });
                }
            }
        });

        return Class;
    });

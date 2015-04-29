define([
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
    function (_,
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

                        var groupMembersTab = new GridTab({
                            mainId: self.subRowId + '_group_member',
                            Grid: GroupMemberGrid,
                            direction: userSettingsService.getLanguage().direction,
                            caption: lang.get('bo.group-member'),
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
                                //grid.columns().remove('user_id');

                                // Group

                                grid.columns().add(
                                    _.merge({}, GroupGrid.prototype.defaultColumnDefs.cycle_id, {
                                        name: 'groups.cycle_id',
                                        classes: 'joined_child_cell',
                                        editable: false
                                    }));

                                grid.columns().add(
                                    _.merge({}, GroupGrid.prototype.defaultColumnDefs.name, {
                                        name: 'groups.name',
                                        classes: 'joined_child_cell',
                                        editable: false
                                    }));

                                grid.columns().add(
                                    _.merge({}, GroupGrid.prototype.defaultColumnDefs.status_id, {
                                        name: 'groups.status_id',
                                        classes: 'joined_child_cell',
                                        editable: false
                                    }));

                                // Contact

                                grid.columns().add(
                                    _.merge({}, ContactGrid.prototype.defaultColumnDefs.email, {
                                        name: 'contacts.email',
                                        classes: 'joined_child_cell',
                                        editable: false
                                    }));

                                grid.columns().add(
                                    _.merge({}, ContactGrid.prototype.defaultColumnDefs.first_name, {
                                        name: 'contacts.first_name',
                                        classes: 'joined_child_cell',
                                        editable: false
                                    }));

                                grid.columns().add(
                                    _.merge({}, ContactGrid.prototype.defaultColumnDefs.last_name, {
                                        name: 'contacts.last_name',
                                        classes: 'joined_child_cell',
                                        editable: false
                                    }));
                            },

                            afterGridExecution: function (grid) {
                                grid.setGroupHeaders({
                                    useColSpanStyle: false,
                                    groupHeaders: [
                                        {
                                            startColumnName: 'groups.cycle_id',
                                            numberOfColumns: 3,
                                            titleText: '<em>' + _.capitalize(lang.get('bo.group')) + '</em>'
                                        },
                                        {
                                            startColumnName: 'contacts.email',
                                            numberOfColumns: 3,
                                            titleText: '<em>' + _.capitalize(lang.get('bo.contact')) + '</em>'
                                        }
                                    ]
                                });
                            }

                        });

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                groupMembersTab
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

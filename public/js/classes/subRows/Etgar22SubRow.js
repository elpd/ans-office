define([
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'services/language',
        'services/userSettings',
        'classes/bi/Group',
        'classes/bi/Contact',
        'classes/bi/GroupMembersStatus'
    ],
    function (_,
              utilities,
              SubRow,
              GridTab,
              ChildTabsPanel,
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

                        /*var groupsMembersAssociationTab = new GridTab({
                            mainId: self.subRowId,
                            Grid: GroupsMembersGuideGrid,
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
                                    id: rowData.user_id,
                                    childFieldName: 'user_id'
                                };
                            },

                            beforeGridExecution: function (grid) {
                                grid.columns().remove('user_id');
                                grid.columns().add([
                                    {
                                        label: _.capitalize(lang.get('bo.group-member_group')),
                                        name: 'groups_members.group_id',
                                        editable: false,
                                        edittype: 'select',
                                        formatter: 'select',
                                        editoptions: {
                                            value: utilities.generateGetItems('/api/group', Group)(),
                                            dataUrl: '/api/group',
                                            buildSelect: utilities.generateBuildSelect(Group)
                                        }
                                    }, {
                                        label: _.capitalize(lang.get('bo.group-member_contact')),
                                        name: 'groups_members.contact_id',
                                        editable: false,
                                        edittype: 'select',
                                        formatter: 'select',
                                        editoptions: {
                                            value: utilities.generateGetItems('/api/contact', Contact)(),
                                            dataUrl: '/api/contact',
                                            buildSelect: utilities.generateBuildSelect(Contact)
                                        }
                                    }, {
                                        label: _.capitalize(lang.get('bo.group-member_status')),
                                        name: 'groups_members.status_id',
                                        editable: false,
                                        edittype: 'select',
                                        formatter: 'select',
                                        editoptions: {
                                            value: utilities.generateGetItems('/api/group-members-status',
                                                GroupMembersStatus)(),
                                            dataUrl: '/api/group-members-status',
                                            buildSelect: utilities.generateBuildSelect(GroupMembersStatus)
                                        }
                                    }
                                ]);

                            }
                        });*/

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

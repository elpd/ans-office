define([
        'lodash',
        'classes/utilities',
        'classes/SubRow',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/grids/GroupsMembersGuideGrid',
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
              GroupsMembersGuideGrid,
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

                        var groupsMembersAssociationTab = new GridTab({
                            mainId: self.subRowId,
                            caption: lang.get('bo.group-member'),
                            //direction: userSettingsService.getLanguage().direction,
                            gridInitialization: function (gridId) {
                                var grid = new GroupsMembersGuideGrid({
                                    gridId: gridId,
                                    caption: _.capitalize(lang.get('bo.group-member')),
                                    calcDesiredHeightInContainer: function () {
                                        return self.calcGridDesiredHeight();
                                    },
                                    calcDesiredWidthInContainer: function () {
                                        return self.calcGridDesiredWidth();
                                    },
                                    hasParent: true,
                                    parentLink: {
                                        id: rowData.user_id,
                                        childFieldName: 'user_id'
                                    },
                                    direction: userSettingsService.getLanguage().direction
                                });

                                grid.query().addFirstChildJoin('groups_member_id',
                                    ['group_id', 'contact_id', 'status_id']);

                                grid.columns().remove('user_id');
                                grid.columns().add([
                                    {
                                        label: _.capitalize(lang.get('bo.group-member_group')),
                                        name: 'groups_members.group_id',
                                        editable: true,
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
                                        editable: true,
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
                                        editable: true,
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

                                return grid;
                            }
                        });

                        var childTabsPanel = new ChildTabsPanel({
                            mainId: self.subRowId,
                            tabs: [
                                groupsMembersAssociationTab
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

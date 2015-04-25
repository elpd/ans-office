define([
        'lodash',
        'classes/utilities',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/GeneralGrid',
        'classes/EmptySubRow',
        'classes/bi/Group',
        'classes/bi/GroupMembersStatus',
        'classes/bi/Guide',
        'classes/bi/Contact',
        'classes/GeneralGridSubRowPageObject',
        'classes/grids/GroupsMembersGuideGrid'
    ],
    function (_,
              utilities,
              GridTab,
              ChildTabsPanel,
              GeneralGrid,
              EmptySubRow,
              Group,
              GroupMembersStatus,
              Guide,
              Contact,
              GeneralGridSubRowPageObject,
              GroupsMembersGuideGrid) {

        var Class = function SubRow(params) {
            this.parentControllerUrl = params.parentControllerUrl;
            this.lang = params.lang;
            this.userSettingsGService = params.userSettingsGService;
        };

        Class.prototype = {
            // the event handler on expanding parent row receives two parameters
            // the ID of the grid row  and the primary key of the row
            show: function (parentRowID, parentRowKey) {
                var self = this;

                var page = new GeneralGridSubRowPageObject({
                    pageId: parentRowID
                });

                var groupsMembersAssociationTabs = new GridTab({
                    parentRowId: parentRowID,
                    name: 'groups_members',
                    lang: self.lang,
                    langCaption: 'bo.group-member',
                    gridInitialization: function(lang, userSettingsGService,
                        gridId) {
                        var grid = new GroupsMembersGuideGrid({
                            lang: lang,
                            userSettingsGService: userSettingsGService,
                            gridId: gridId
                        });
                        return grid;
                    }
                });

                var childTabsPanel = new ChildTabsPanel({
                    id: parentRowID,
                    tabs: [
                        groupsMembersAssociationTabs
                    ],
                    direction: self.userSettingsGService.getLanguage().direction
                });

                $('#' + parentRowID).append(
                    childTabsPanel.createElement()
                );

                // Bind the tabs
/*
                $('#' + groupsTabs.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GroupsMembersGuideGrid({

                    });

                    grid.activate();

                    $(this).tab('show');

                    var grid2 = new GeneralGrid({
                        getDesiredHeightInContainer: function(){
                            return page.getGridDesiredHeight();
                        },
                        getDesiredWidthInContainer: function() {
                            return page.getGridDesiredWidth();
                        },
                        lang: self.lang,
                        controllerUrl: '/api/groups-members',
                        parentLink: {
                            id: parentRowKey,
                            childFieldName: 'user_id'
                        },
                        gridId: groupsTabs.gridId,
                        biName: 'groups_members',
                        biNamePlural: 'groups_members',
                        caption: _.capitalize(self.lang.get('bo.group-member')),
                        SubRow: EmptySubRow,
                        direction: self.userSettingsGService.getLanguage().direction,
                        colModel: [{
                            label: _.capitalize(self.lang.get('bo.id')),
                            name: 'id',
                            width: 30,
                            key: true,
                            searchoptions: {
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                            },
                            searchrules: {
                                integer: true
                            }
                        }, {
                            label: _.capitalize(self.lang.get('bo.group-member_group')),
                            name: 'group_id',
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/group', Group)(),
                                dataUrl: '/api/group',
                                buildSelect: utilities.generateBuildSelect(Group)
                            }
                        }, {
                            label: _.capitalize(self.lang.get('bo.group-member_contact')),
                            name: 'contact_id',
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/contact', Contact)(),
                                dataUrl: '/api/contact',
                                buildSelect: utilities.generateBuildSelect(Contact)
                            }
                        }, {
                            label: _.capitalize(self.lang.get('bo.group-member_status')),
                            name: 'status_id',
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/group-members-status',
                                    GroupMembersStatus)(),
                                dataUrl: '/api/group-members-status',
                                buildSelect: utilities.generateBuildSelect(GroupMembersStatus)
                            }
                        }, {
                            label: _.capitalize(self.lang.get('bo.group-member_guide_1')),
                            name: 'guide_id_1',
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/guide', Guide)(),
                                dataUrl: '/api/guide',
                                buildSelect: utilities.generateBuildSelect(Guide)
                            }
                        }, {
                            label: _.capitalize(self.lang.get('bo.group-member_guide_2')),
                            name: 'guide_id_2',
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/guide', Guide)(),
                                dataUrl: '/api/guide',
                                buildSelect: utilities.generateBuildSelect(Guide)
                            }
                        }],
                        colModelExtraFunction: function () {
                            return JSON.stringify({
                                group_id: {
                                    sortOnLinkField: 'name',
                                    searchOnLinkField: 'name'
                                },
                                contact_id: {
                                    sortOnLinkField: 'name',
                                    searchOnLinkField: 'name'
                                },
                                status_id: {
                                    sortOnLinkField: 'status',
                                    searchOnLinkField: 'status'
                                },
                                guide_id_1: {
                                    sortOnLinkField: 'name',
                                    searchOnLinkField: 'name'
                                },
                                guide_id_2: {
                                    sortOnLinkField: 'name',
                                    searchOnLinkField: 'name'
                                }
                            });
                        }
                    });


                });
                */
            }
        };

        return Class;
    });

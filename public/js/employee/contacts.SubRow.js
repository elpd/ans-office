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
        'classes/bi/User',
        'classes/GeneralGridSubRowPageObject'
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
              User,
              GeneralGridSubRowPageObject) {

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

                var etgar22Tab = new GridTab({
                    parentRowId: parentRowID,
                    name: 'etgar22',
                    lang: self.lang,
                    langCaption: 'bo.etgar22'
                });

                var groupsTabs = new GridTab({
                    parentRowId: parentRowID,
                    name: 'groups',
                    lang: self.lang,
                    langCaption: 'bo.groups'
                });

                var notesTab = new GridTab({
                    parentRowId: parentRowID,
                    name: 'notes',
                    lang: self.lang,
                    langCaption: 'bo.contact-notes'
                });

                var childTabsPanel = new ChildTabsPanel({
                    id: parentRowID,
                    tabs: [
                        groupsTabs,
                        etgar22Tab,
                        notesTab
                    ],
                    direction: self.userSettingsGService.getLanguage().direction
                });

                $('#' + parentRowID).append(
                    childTabsPanel.createElement()
                );

                // Bind the tabs

                $('#' + etgar22Tab.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        getDesiredHeightInContainer: function () {
                            return page.getGridDesiredHeight();
                        },
                        getDesiredWidthInContainer: function () {
                            return page.getGridDesiredWidth();
                        },
                        lang: self.lang,
                        controllerUrl: '/api/etgar22',
                        parentLink: {
                            id: parentRowKey,
                            childFieldName: 'contact_id'
                        },
                        gridId: etgar22Tab.gridId,
                        biName: 'etgar22',
                        biNamePlural: 'etgar22s',
                        caption: _.capitalize(self.lang.get('bo.etgar22')),
                        SubRow: EmptySubRow,
                        direction: self.userSettingsGService.getLanguage().direction,
                        colModel: [{
                            label: _.capitalize(self.lang.get('bo.id')),
                            name: 'id',
                            width: 50,
                            key: true,
                            searchoptions: {
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                            },
                            searchrules: {
                                integer: true
                            }
                        }, {
                            label: _.capitalize(self.lang.get('bo.etgar22_facebook_know_how')),
                            name: 'facebook_know_how',
                            editable: true,
                            formatter: 'checkbox',
                            align: 'center',
                            width: 100,
                            edittype: 'checkbox',
                            editoptions: {
                                value: "1:0"
                            },
                            stype: "select",
                            searchoptions: {
                                sopt: ['eq', 'ne'],
                                value: ":All;1:Yes;0:No"
                            }
                        }, {
                            label: _.capitalize(self.lang.get('bo.etgar22_call_for_facebook_help')),
                            name: 'call_for_facebook_help',
                            editable: true,
                            formatter: 'checkbox',
                            align: 'center',
                            width: 100,
                            edittype: 'checkbox',
                            editoptions: {
                                value: "1:0"
                            },
                            stype: "select",
                            searchoptions: {
                                sopt: ['eq', 'ne'],
                                value: ":All;1:Yes;0:No"
                            }
                        }, {
                            label: _.capitalize(self.lang.get('bo.etgar22_registration_date')),
                            name: 'registration_date',
                            editable: true,
                            formatter: 'datetime',
                            datefmt: 'yyyy-mm-dd',
                            editoptions: {
                                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                                // use it to place a third party control to customize the toolbar
                                dataInit: generateDateTimePicker
                            },
                            //stype: 'datetime',
                            searchoptions: {
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                // TODO: bug in jqgrid ? find out why same id as parent search.
                                //dataInit: generateDateTimePicker
                            },
                            searchrules: {
                                date: true
                            }
                        }, {
                            label: _.capitalize(self.lang.get('bo.etgar22_notes')),
                            name: 'notes',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        }, {
                            label: _.capitalize(self.lang.get('bo.etgar22_next_call')),
                            name: 'next_call',
                            editable: true,
                            formatter: 'datetime',
                            datefmt: 'yyyy-mm-dd',
                            editoptions: {
                                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                                // use it to place a third party control to customize the toolbar
                                dataInit: generateDateTimePicker
                            },
                            //stype: 'datetime',
                            searchoptions: {
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                // TODO: bug in jqgrid ? find out why same id as parent search.
                                //dataInit: generateDateTimePicker
                            },
                            searchrules: {
                                date: true
                            }
                        }, {
                            label: _.capitalize(self.lang.get('bo.etgar22_why_go_vegan')),
                            name: 'why_go_vegan',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        }, {
                            label: _.capitalize(self.lang.get('bo.etgar22_parent_name')),
                            name: 'parent_name',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        }, {
                            label: _.capitalize(self.lang.get('bo.etgar22_parent_email')),
                            name: 'parent_email',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        }]
                    });

                    grid.activate();

                    $(this).tab('show');
                });

                $('#' + groupsTabs.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        getDesiredHeightInContainer: function () {
                            return page.getGridDesiredHeight();
                        },
                        getDesiredWidthInContainer: function () {
                            return page.getGridDesiredWidth();
                        },
                        lang: self.lang,
                        controllerUrl: '/api/groups-members',
                        parentLink: {
                            id: parentRowKey,
                            childFieldName: 'contact_id'
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
                        }, /*{
                         label: lang.get('bo.group_members_contact'),
                         name: 'contact_id',
                         editable: true,
                         edittype: 'select',
                         formatter: 'select',
                         editoptions: {
                         value: utilities.generateGetItems('/api/contact', Contact)(),
                         dataUrl: '/api/contact',
                         buildSelect: utilities.generateBuildSelect(Contact)
                         }
                         },*/ {
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

                    grid.activate();

                    $(this).tab('show');
                });

                $('#' + notesTab.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        getDesiredHeightInContainer: function () {
                            return page.getGridDesiredHeight();
                        },
                        getDesiredWidthInContainer: function () {
                            return page.getGridDesiredWidth();
                        },
                        lang: self.lang,
                        controllerUrl: '/api/contact-note',
                        parentLink: {
                            id: parentRowKey,
                            childFieldName: 'contact_id'
                        },
                        gridId: notesTab.gridId,
                        biName: 'contact_note',
                        biNamePlural: 'contact_notes',
                        caption: _.capitalize(self.lang.get('bo.contact-notes')),
                        SubRow: EmptySubRow,
                        direction: self.userSettingsGService.getLanguage().direction,
                        colModel: [{
                            label: self.lang.get('bo.id'),
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
                            label: self.lang.get('bo.contact-note_user'),
                            name: 'user_id',
                            editable: false,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/user', User)(),
                                dataUrl: '/api/user',
                                buildSelect: utilities.generateBuildSelect(User)
                            }
                        }, {
                            label: _.capitalize(self.lang.get('bo.contact-note_text')),
                            name: 'text',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        }, {
                            label: _.capitalize(self.lang.get('bo.contact-note_created_at')),
                            name: 'created_at',
                            editable: false,
                            formatter: 'datetime',
                            datefmt: 'yyyy-mm-dd',
                            editoptions: {
                                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                                // use it to place a third party control to customize the toolbar
                                dataInit: generateDateTimePicker
                            },
                            //stype: 'datetime',
                            searchoptions: {
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                // TODO: bug in jqgrid ? find out why same id as parent search.
                                //dataInit: generateDateTimePicker
                            },
                            searchrules: {
                                date: true
                            }
                        }],
                        colModelExtraFunction: function () {
                            return JSON.stringify({
                                user_id: {
                                    sortOnLinkField: 'email',
                                    searchOnLinkField: 'email'
                                }
                            });
                        }
                    });

                    grid.activate();

                    $(this).tab('show');
                });
            }
        };

        function generateDateTimePicker(element) {
            $(element).datetimepicker({
                dateFormat: 'yy-mm-dd',
                timeFormat: 'HH:mm:ss'
            });
        }

        return Class;
    });

define([
        'lodash',
        'classes/utilities',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/GeneralGrid',
        'classes/EmptySubRow',
        'classes/bi/User',
        'classes/bi/Role',
        'classes/GeneralGridSubRowPageObject'
    ],
    function (_,
              utilities,
              GridTab,
              ChildTabsPanel,
              GeneralGrid,
              EmptySubRow,
              User,
              Role,
              GeneralGridSubRowPageObject) {

        var Class = function RolesSubRow(params) {
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

                var usersTab = new GridTab({
                    parentRowId: parentRowID,
                    name: 'users',
                    lang: self.lang,
                    langCaption: 'bo.users'
                });

                var rolesTab = new GridTab({
                    parentRowId: parentRowID,
                    name: 'roles',
                    lang: self.lang,
                    langCaption: 'bo.roles'
                });

                var childTabsPanel = new ChildTabsPanel({
                    id: parentRowID,
                    tabs: [
                        usersTab,
                        rolesTab
                    ]
                });

                $('#' + parentRowID).append(
                    childTabsPanel.createElement()
                );

                // Bind the tabs

                $('#' + usersTab.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        getDesiredHeightInContainer: function(){
                            return page.getGridDesiredHeight();
                        },
                        getDesiredWidthInContainer: function() {
                            return page.getGridDesiredWidth();
                        },
                        lang: self.lang,
                        controllerUrl: '/api/permission-user',
                        parentLink: {
                            id: parentRowKey,
                            childFieldName: 'permission_id'
                        },
                        gridId: usersTab.gridId,
                        biName: 'permission-user',
                        biNamePlural: 'permission-user',
                        caption: _.capitalize(self.lang.get('bo.permission_users')),
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
                            label: _.capitalize(self.lang.get('bo.permission-user_user')),
                            name: 'user_id',
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/user', User)(),
                                dataUrl: '/api/user',
                                buildSelect: utilities.generateBuildSelect(User)
                            }
                        }],
                        colModelExtraFunction: function () {
                            return JSON.stringify({
                                user_id: {
                                    sortOnLinkField: 'name',
                                    searchOnLinkField: 'name'
                                }
                            });
                        }
                    });

                    grid.activate();

                    $(this).tab('show');
                });

                $('#' + rolesTab.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        getDesiredHeightInContainer: function(){
                            return page.getGridDesiredHeight();
                        },
                        getDesiredWidthInContainer: function() {
                            return page.getGridDesiredWidth();
                        },
                        lang: self.lang,
                        controllerUrl: '/api/permission-role',
                        parentLink: {
                            id: parentRowKey,
                            childFieldName: 'permission_id'
                        },
                        gridId: rolesTab.gridId,
                        biName: 'permission-role',
                        biNamePlural: 'permission-role',
                        caption: _.capitalize(self.lang.get('bo.permission_roles')),
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
                            label: _.capitalize(self.lang.get('bo.permission-role_role')),
                            name: 'role_id',
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/role', Role)(),
                                dataUrl: '/api/role',
                                buildSelect: utilities.generateBuildSelect(Role)
                            }
                        }],
                        colModelExtraFunction: function () {
                            return JSON.stringify({
                                role_id: {
                                    sortOnLinkField: 'name',
                                    searchOnLinkField: 'name'
                                }
                            });
                        }
                    });

                    grid.activate();

                    $(this).tab('show');
                });
            }
        };

        return Class;
    });



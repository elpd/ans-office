define([
        'lodash',
        'classes/utilities',
        'classes/GridTab',
        'classes/ChildTabsPanel',
        'classes/GeneralGrid',
        'classes/EmptySubRow',
        'classes/bi/Role',
        'classes/bi/Permission'
    ],
    function (_,
              utilities,
              GridTab,
              ChildTabsPanel,
              GeneralGrid,
              EmptySubRow,
              Role,
              Permission) {

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

                var rolesTab = new GridTab({
                    parentRowId: parentRowID,
                    name: 'roles',
                    lang: self.lang,
                    langCaption: 'bo.roles'
                });

                var permissionsTab = new GridTab({
                    parentRowId: parentRowID,
                    name: 'permissions',
                    lang: self.lang,
                    langCaption: 'bo.permissions'
                });

                var childTabsPanel = new ChildTabsPanel({
                    id: parentRowID,
                    tabs: [
                        rolesTab,
                        permissionsTab
                    ]
                });

                $('#' + parentRowID).append(
                    childTabsPanel.createElement()
                );

                // Bind the tabs

                $('#' + rolesTab.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        lang: self.lang,
                        controllerUrl: '/api/role-user',
                        parentLink: {
                            id: parentRowKey,
                            childFieldName: 'user_id'
                        },
                        gridId: rolesTab.gridId,
                        biName: 'role-user',
                        biNamePlural: 'role-user',
                        caption: _.capitalize(self.lang.get('bo.user_roles')),
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
                            label: self.lang.get('bo.role-user_role'),
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

                $('#' + permissionsTab.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        lang: self.lang,
                        controllerUrl: '/api/permission-user',
                        parentLink: {
                            id: parentRowKey,
                            childFieldName: 'user_id'
                        },
                        gridId: permissionsTab.gridId,
                        biName: 'permission-user',
                        biNamePlural: 'permission-user',
                        caption: _.capitalize(self.lang.get('bo.user_permissions')),
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
                            label: self.lang.get('bo.permission-user_permission'),
                            name: 'permission_id',
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/permission', Permission)(),
                                dataUrl: '/api/permission',
                                buildSelect: utilities.generateBuildSelect(Permission)
                            }
                        }],
                        colModelExtraFunction: function () {
                            return JSON.stringify({
                                permission_id: {
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

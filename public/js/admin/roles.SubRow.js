define([
        'lodash',
        'classes/utilities',
        'classes/GeneralGrid',
        'classes/EmptySubRow',
        'classes/bi/User',
        'classes/bi/Permission'
    ],
    function (_,
              utilities,
              GeneralGrid,
              EmptySubRow,
              User,
              Permission) {

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

                // Create the sub page. Tabs interface for each wanted child and info.
                // TODO: active indication

                var usersTab = new GridTab({
                    parentRowId: parentRowID,
                    name: 'users'
                });

                var permissionsTab = new GridTab({
                    parentRowId: parentRowID,
                    name: 'permissions'
                });

                $('#' + parentRowID).append(
                    '<div id="' + parentRowID + '_subcontent" role="tabpanel">' +

                    '<ul class="nav nav-tabs" role="tablist">' +

                    '<li role="presentation">' +
                    '<a id="' + permissionsTab.tabLinkId +
                    '" href="#' + permissionsTab.tabId + '" aria-controls="' + permissionsTab.tabId +
                    '" role="tab" data-toggle="tab">' +
                    self.lang.get('bo.permissions') +
                    '</a>' +
                    '</li>' +

                    '<li role="presentation">' +
                    '<a id="' + usersTab.tabLinkId +
                    '" href="#' + usersTab.tabId + '" aria-controls="' + usersTab.tabId +
                    '" role="tab" data-toggle="tab">' +
                    self.lang.get('bo.users') +
                    '</a>' +
                    '</li>' +

                    '</ul>' +

                    '<div class="tab-content">' +

                    '<div role="tabpanel" class="tab-pane" id="' + usersTab.tabId + '">' +
                    '<table id="' + usersTab.gridId + '"></table>' +
                    '<div id="' + usersTab.pagerId + '"></div>' +
                    '</div>' +

                    '<div role="tabpanel" class="tab-pane" id="' + permissionsTab.tabId + '">' +
                    '<table id="' + permissionsTab.gridId + '"></table>' +
                    '<div id="' + permissionsTab.pagerId + '"></div>' +
                    '</div>' +

                    '</div>' +

                    '</div>'
                );

                // Bind the tabs

                $('#' + usersTab.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        lang: self.lang,
                        controllerUrl: '/api/role-user',
                        parentLink: {
                            id: parentRowKey,
                            childFieldName: 'role_id'
                        },
                        gridId: usersTab.gridId,
                        biName: 'role-user',
                        biNamePlural: 'role-user',
                        caption: _.capitalize(self.lang.get('bo.role_users')),
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
                            label: self.lang.get('bo.role-user_user'),
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

                $('#' + permissionsTab.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        lang: self.lang,
                        controllerUrl: '/api/permission-role',
                        parentLink: {
                            id: parentRowKey,
                            childFieldName: 'role_id'
                        },
                        gridId: permissionsTab.gridId,
                        biName: 'permission-role',
                        biNamePlural: 'permission-role',
                        caption: _.capitalize(self.lang.get('bo.role_permissions')),
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
                            label: self.lang.get('bo.permission-role_permission'),
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

        function GridTab(params) {
            this.setParams(params);
            this.setVariables();
        }

        GridTab.prototype = {
            setParams: function (params) {
                this.parentRowId = params.parentRowId;
                this.name = params.name;
            },

            setVariables: function () {
                var self = this;

                self.tabId = self.parentRowId + '_' + self.name + 'Tab';
                self.tabLinkId = self.tabId + '_link';
                self.gridId = self.tabId + '_grid';
                self.pagerId = self.gridId + '_pager';
            }
        };

        return Class;
    });


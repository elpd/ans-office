define([
        'lodash',
        'classes/utilities',
        'classes/GeneralGrid',
        'classes/EmptySubRow',
        'classes/bi/Role'
    ],
    function (_,
              utilities,
              GeneralGrid,
              EmptySubRow,
              Role) {

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

                // Create the sub page. Tabs interface for each wanted child and info.
                // TODO: active indication

                var rolesTab = new GridTab({
                    parentRowId: parentRowID
                });

                $('#' + parentRowID).append(
                    '<div id="' + parentRowID + '_subcontent" role="tabpanel">' +

                    '<ul class="nav nav-tabs" role="tablist">' +

                    '<li role="presentation"><a id="' + rolesTab.tabLinkId +
                    '" href="#' + rolesTab.tabId + '" aria-controls="' + rolesTab.tabId +
                    '" role="tab" data-toggle="tab">' +
                    self.lang.get('bo.roles') + '</a></li>' +

                    '<li role="presentation"><a href="#">Info 2</a></li>' +
                    '<li role="presentation"><a href="#">Info 3</a></li>' +

                    '</ul>' +

                    '<div class="tab-content">' +

                    '<div role="tabpanel" class="tab-pane" id="' + rolesTab.tabId + '">' +
                    '<table id="' + rolesTab.gridId + '"></table>' +
                    '<div id="' + rolesTab.pagerId + '"></div>' +
                    '</div>' +

                    '<div role="tabpanel" class="tab-pane" id="profile">bbbb</div>' +
                    '<div role="tabpanel" class="tab-pane" id="messages">cccc</div>' +
                    '<div role="tabpanel" class="tab-pane" id="settings">dddd</div>' +

                    '</div>' +

                    '</div>'
                );

                // Bind the tabs

                $('#' + rolesTab.tabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        lang: self.lang,
                        controllerUrl: '/api/role-user/',
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
                        colModelExtraFunction: function() {
                            return JSON.stringify({
                                role_id: {
                                    sortOnLinkField: 'name'
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
            },

            setVariables: function () {
                var self = this;

                self.tabId = self.parentRowId + '_etgar22Tab';
                self.tabLinkId = self.tabId + '_link';
                self.gridId = self.tabId + '_grid';
                self.pagerId = self.gridId + '_pager';
            }
        };

        return Class;
    });

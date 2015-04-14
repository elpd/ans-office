define([
        'lodash',
        'classes/utilities',
        'classes/GeneralGrid',
        'employee/emptySubRow',
        'classes/bi/Group',
        'classes/bi/Contact',
        'classes/bi/GroupMembersStatus',
        'classes/bi/Guide'
    ],
    function (_,
              utilities,
              GeneralGrid,
              SubRow,
              Group,
              Contact,
              GroupMembersStatus,
              Guide) {

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

                var membersTabId = parentRowID + '_groupsMembersTab';
                var membersTabLinkId = membersTabId + '_link';
                var membersGridId = membersTabId + '_grid';
                var membersPagerId = membersGridId + '_pager';

                $('#' + parentRowID).append(
                    '<div id="' + parentRowID + '_subcontent" role="tabpanel">' +

                    '<ul class="nav nav-tabs" role="tablist">' +

                    '<li role="presentation"><a id="' + membersTabLinkId +
                    '" href="#' + membersTabId + '" aria-controls="' + membersTabId +
                    '" role="tab" data-toggle="tab">' +
                    self.lang.get('bo.groups') + '</a></li>' +
                    '<li role="presentation"><a href="#">Info 2</a></li>' +
                    '<li role="presentation"><a href="#">Info 3</a></li>' +

                    '</ul>' +

                    '<div class="tab-content">' +

                    '<div role="tabpanel" class="tab-pane" id="' + membersTabId + '">' +
                    '<table id="' + membersGridId + '"></table>' +
                    '<div id="' + membersPagerId + '"></div>' +
                    '</div>' +

                    '<div role="tabpanel" class="tab-pane" id="profile">bbbb</div>' +
                    '<div role="tabpanel" class="tab-pane" id="messages">cccc</div>' +
                    '<div role="tabpanel" class="tab-pane" id="settings">dddd</div>' +

                    '</div>' +

                    '</div>'
                );

                // Bind the tabs

                $('#' + membersTabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        lang: self.lang,
                        controllerUrl: '/api/groups-members',
                        parentClass: '\\App\\Group',
                        parentId: parentRowKey,
                        childParentNick: 'group',
                        childParentField: 'group_id',
                        gridId: membersGridId,
                        biName: 'groups_members',
                        biNamePlural: 'groups_members',
                        caption: _.capitalize(self.lang.get('bo.groups_members')),
                        SubRow: SubRow,
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
                        },
                      /*      {
                            label: self.lang.get('bo.group_members_group'),
                            name: 'group_id',
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/group', Group)(),
                                dataUrl: '/api/group',
                                buildSelect: utilities.generateBuildSelect(Group)
                            }
                        }, */
                            {
                            label: self.lang.get('bo.group_members_contact'),
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
                            label: self.lang.get('bo.group_members_status'),
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
                            label: self.lang.get('bo.group_members_guide_1'),
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
                            label: self.lang.get('bo.group_members_guide_2'),
                            name: 'guide_id_2',
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/guide', Guide)(),
                                dataUrl: '/api/guide',
                                buildSelect: utilities.generateBuildSelect(Guide)
                            }
                        }]
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


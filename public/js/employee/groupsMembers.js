define([
        'lodash',
        'classes/utilities',
        'classes/bi/GroupsMembers',
        'classes/bi/Group',
        'classes/bi/Contact',
        'classes/bi/GroupMembersStatus',
        'classes/bi/Guide',
        'employee/groups_members.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings'
    ],
    function (_,
              utilities,
              GroupsMembers,
              Group,
              Contact,
              GroupMembersStatus,
              Guide,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid,
              userSettingsGService) {

        $(document).ready(function () {


            userSettingsGService.load().then(function () {

                    var grid = new GeneralGrid({
                        lang: lang,
                        userSettingsGService: userSettingsGService,
                        controllerUrl: '/api/groups-members',
                        biName: 'groups_members',
                        biNamePlural: 'groups_members',
                        caption: _.capitalize(lang.get('bo.groups_members')),
                        SubRow: SubRow,
                        direction: userSettingsGService.getLanguage().direction,
                        colModel: [{
                            label: lang.get('bo.id'),
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
                            label: lang.get('bo.group_members_group'),
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
                        }, {
                            label: lang.get('bo.group_members_status'),
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
                            label: lang.get('bo.group_members_guide_1'),
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
                            label: lang.get('bo.group_members_guide_2'),
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
                                    sortOnLinkField: 'email',
                                    searchOnLinkField: 'email'
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
                }
            )
            ;

        });

        // TODO: make global
        function generateDateTimePicker(element) {
            $(element).datetimepicker({
                dateFormat: 'yy-mm-dd',
                timeFormat: 'HH:mm:ss'
            });
        }
    });



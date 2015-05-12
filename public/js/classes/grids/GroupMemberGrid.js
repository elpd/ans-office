define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/GroupMemberSubRow',
    'classes/bi/Group',
    'classes/bi/Contact',
    'classes/bi/GroupMembersStatus',
    'services/language',
    'classes/grids/ContactGrid',
    'classes/grids/GroupGrid'
], function (_,
             utilities,
             Grid,
             GroupMemberSubRow,
             Group,
             Contact,
             GroupMembersStatus,
             lang,
             ContactGrid,
             GroupGrid) {

    var CONTROLLER_URL = '/api/groups-members';

    var defaultColumns = null;

    var Class = function (params) {
        var self = this;

        GroupGrid = require('classes/grids/GroupGrid');
        ContactGrid = require('classes/grids/ContactGrid');

        params.controllerUrl = CONTROLLER_URL;
        params.caption = lang.get('bo.group-member');
        params.SubRow = GroupMemberSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.children().add({
            name: 'group',
            title: lang.get('bo.group'),
            queryJoinTable: 'groups',
            queryLinkMethod: 'group',
            columns: _.values(_.values(Object.create(GroupGrid.prototype).getDefaultColumnsDefinitions()))
        });

        self.children().add({
            name: 'contact',
            title: lang.get('bo.contact'),
            queryJoinTable: 'contacts',
            queryLinkMethod: 'contact',
            columns: _.values(_.values(Object.create(ContactGrid.prototype).getDefaultColumnsDefinitions()))
        });

        self.columns().selectAbsolute([
            'id',
            'group_id',
            'contact_id',
            'status_id',
            'updated_at'
        ]);
    };

    var static_defaultColumnsDefinitions = null;

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnsDefinitions: {
            get: function () {
                if (static_defaultColumnsDefinitions != null) {
                    return static_defaultColumnsDefinitions;
                }

                static_defaultColumnsDefinitions =
                {
                    group_id: {
                        label: _.capitalize(lang.get('bo.group-member_group-id')),
                        name: 'group_id',
                        editable: true,
                        edittype: 'select',
                        formatter: 'select',
                        editoptions: {
                            value: utilities.generateGetItems('/api/group', Group)(),
                            dataUrl: '/api/group',
                            buildSelect: utilities.generateBuildSelect(Group)
                        },
                        extraInfo: {
                            linkMethod: 'group',
                            searchByRelationshipMethod: true,
                            sortByForeignLinkToString: true
                        }
                    },
                    contact_id: {
                        label: _.capitalize(lang.get('bo.group-member_contact-id')),
                        name: 'contact_id',
                        editable: true,
                        edittype: 'select',
                        formatter: 'select',
                        editoptions: {
                            value: utilities.generateGetItems('/api/contact', Contact)(),
                            dataUrl: '/api/contact',
                            buildSelect: utilities.generateBuildSelect(Contact)
                        },
                        extraInfo: {
                            linkMethod: 'contact',
                            searchByRelationshipMethod: true,
                            sortByForeignLinkToString: true
                        }
                    },
                    status_id: {
                        label: _.capitalize(lang.get('bo.group-member_status-id')),
                        name: 'status_id',
                        editable: true,
                        edittype: 'select',
                        formatter: 'select',
                        editoptions: {
                            value: utilities.generateGetItems('/api/group-members-status',
                                GroupMembersStatus)(),
                            dataUrl: '/api/group-members-status',
                            buildSelect: utilities.generateBuildSelect(GroupMembersStatus)
                        },
                        extraInfo: {
                            linkMethod: 'status',
                            searchByRelationshipMethod: true,
                            sortByForeignLinkToString: true
                        }
                    }
                }
                return static_defaultColumnsDefinitions;
            }

        }
    });


    return Class;
});
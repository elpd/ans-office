define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/GroupMemberSubRow',
    'classes/bi/Group',
    'classes/bi/Contact',
    'classes/bi/GroupMembersStatus',
    'services/language',
    'services/userSettings'
], function (_,
             utilities,
             Grid,
             GroupMemberSubRow,
             Group,
             Contact,
             GroupMembersStatus,
             lang,
             userSettingService) {

    var CONTROLLER_URL = '/api/groups-members';

    var defaultColumns = {
        id: {
            label: _.capitalize(lang.get('bo.id')),
            name: 'id',
            width: 50,
            key: true,
            searchoptions: {
                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
            },
            searchrules: {
                integer: true
            }
        },
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
            }
        }
    };

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        params.caption = lang.get('bo.group-member');
        params.SubRow = GroupMemberSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.group_id);
        self.columns().add(self.defaultColumnDefs.contact_id);
        self.columns().add(self.defaultColumnDefs.status_id);
    };

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnDefs: {
            get: function () {
                return _.cloneDeep(defaultColumns);
            }
        },
        defaultJoins: {
            get: function () {
                return _.cloneDeep(defaultJoins);
            }
        }
    });

    return Class;
});
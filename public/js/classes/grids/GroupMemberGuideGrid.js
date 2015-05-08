define([
    'require',
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/GroupMemberGuideSubRow',
    'classes/bi/GroupsMembers',
    'classes/bi/User',
    'services/language',
    'classes/grids/GroupMemberGrid'
], function (require,
             _,
             utilities,
             Grid,
             GroupMemberGuideSubRow,
             GroupsMembers,
             User,
             lang,
             GroupMemberGrid) {

    var CONTROLLER_URL = '/api/group-member-guide';

    var defaultColumns = null;

    var Class = function (params) {
        var self = this;

        GroupMemberGrid = require('classes/grids/GroupMemberGrid');

        params.controllerUrl = CONTROLLER_URL;
        // todo: inharitance of attribute. array merge.
        if (!params.caption) {
            params.caption = _.capitalize(lang.get('bo.group-member-guides'));
        }
        params.SubRow = GroupMemberGuideSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.children().add({
            name: 'groupMember',
            title: lang.get('bo.group-member'),
            queryJoinTable: 'groups_members',
            queryLinkMethod: 'groupMember',
            columns: _.values(_.values(Object.create(GroupMemberGrid.prototype).getDefaultColumnsDefinitions()))
        });

        self.columns().selectAbsolute([
            'id',
            'groups_member_id',
            'user_id',
            'updated_at'
        ]);
    };

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnsDefinitions: {
            value: {
                groups_member_id: {
                    label: _.capitalize(lang.get('bo.group-member-guide_group-member-id')),
                    name: 'groups_member_id',
                    editable: true,
                    edittype: 'select',
                    formatter: 'select',
                    editoptions: {
                        value: utilities.generateGetItems('/api/groups-members', GroupsMembers)(),
                        dataUrl: '/api/groups-members',
                        buildSelect: utilities.generateBuildSelect(GroupsMembers)
                    },
                    extraInfo: {
                        linkMethod: 'groupMember',
                        searchByRelationshipMethod: true,
                        sortByForeignLinkToString: true
                    }
                },

                user_id: {
                    label: _.capitalize(lang.get('bo.group-member-guide_user-id')),
                    name: 'user_id',
                    editable: true,
                    edittype: 'select',
                    formatter: 'select',
                    editoptions: {
                        value: utilities.generateGetItems('/api/user', User)(),
                        dataUrl: '/api/user',
                        buildSelect: utilities.generateBuildSelect(User)
                    },
                    extraInfo: {
                        linkMethod: 'user',
                        searchByRelationshipMethod: true,
                        sortByForeignLinkToString: true
                    }
                }
            }
        }
    });

    return Class;
});
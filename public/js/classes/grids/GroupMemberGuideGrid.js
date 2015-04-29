define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/GroupMemberGuideSubRow',
    'classes/bi/GroupsMembers',
    'classes/bi/User',
    'services/language',
    'services/userSettings'
], function (_,
             utilities,
             Grid,
             GroupMemberGuideSubRow,
             GroupsMembers,
             User,
             lang,
             userSettingService) {

    var CONTROLLER_URL = '/api/group-member-guide';

    var defaultColumns = {
        id: {
            label: _.capitalize(lang.get('bo.id')),
            name: 'id',
            width: 50,
            key: true,
            searchoptions: {
                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
            }
            ,
            searchrules: {
                integer: true
            }
        },

        groups_member_id: {
            label: _.capitalize(lang.get('bo.group-member-guide_group_member')),
            name: 'groups_member_id',
            editable: true,
            edittype: 'select',
            formatter: 'select',
            editoptions: {
                value: utilities.generateGetItems('/api/groups-members', GroupsMembers)(),
                dataUrl: '/api/groups-members',
                buildSelect: utilities.generateBuildSelect(GroupsMembers)
            }
        },

        user_id: {
            label: _.capitalize(lang.get('bo.group-member-guide_user')),
            name: 'user_id',
            editable: true,
            edittype: 'select',
            formatter: 'select',
            editoptions: {
                value: utilities.generateGetItems('/api/user', User)(),
                dataUrl: '/api/user',
                buildSelect: utilities.generateBuildSelect(User)
            }
        }
    };

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // todo: inharitance of attribute. array merge.
        if (! params.caption) {
            params.caption = lang.get('bo.group-member-guides');
        }
        params.SubRow = GroupMemberGuideSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.groups_member_id);
        self.columns().add(self.defaultColumnDefs.user_id);

    };

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnDefs: {
            get: function () {
                return _.cloneDeep(defaultColumns);
            }
        }
    });

    function setParamsColModel(params, colModel) {
        // TODO: deep copy ?
        var processedParams = params;
        processedParams.colModel = colModel;

        return processedParams;
    }

    return Class;
});
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

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.groups_member_id);
        self.columns().add(self.defaultColumnDefs.user_id);

        self.children().add({
            name: 'groupMember',
            title: lang.get('bo.group-member'),
            queryJoinTable: 'groups_members',
            queryLinkMethod: 'groupMember',
            columns: _.values(GroupMemberGrid.prototype.defaultColumnDefs)
        });

        self.columns().selectAbsoluteAll();
    };

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnDefs: {
            get: function () {
                var self = this;
                if (defaultColumns == null) {
                    defaultColumns = generateDefaultColumns();
                }
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

    function generateDefaultColumns() {
        var columnsDefs = {
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
        };

        return columnsDefs;
    }

    return Class;
});
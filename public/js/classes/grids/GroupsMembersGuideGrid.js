define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/bi/GroupsMembers',
    'classes/bi/User',
    'services/language',
    'services/userSettings'
], function (_,
             utilities,
             Grid,
             GroupsMembers,
             User,
             lang,
             userSettingService) {

    var CONTROLLER_URL = '/api/group-member-guide';

    var Class = function (params) {
        var self = this;
        var colModel = [
            _.cloneDeep(self.defaultColumns.id),
            _.cloneDeep(self.defaultColumns.groups_member_id),
            _.cloneDeep(self.defaultColumns.user_id)
        ];

        var processedParams = setParamsColModel(params, colModel);
        processedParams.controllerUrl = CONTROLLER_URL;

        Grid.call(this, processedParams);
    };

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumns: {
            value: {
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
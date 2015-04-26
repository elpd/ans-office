define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/GuideSubRow',
    'classes/bi/User',
    'classes/bi/Role',
    'services/language',
    'services/userSettings'
], function (_,
             utilities,
             Grid,
             GuideSubRow,
             User,
             Role,
             lang,
             userSettingService) {

    var CONTROLLER_URL = '/api/guide';

    var Class = function (params) {
        var colModel = [{
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
        }, {
            label: lang.get('bo.role-user_user'),
            name: 'user_id',
            width: 200,
            editable: true,
            edittype: 'select',
            formatter: 'select',
            editoptions: {
                value: utilities.generateGetItems('/api/user', User)(),
                dataUrl: '/api/user',
                buildSelect: utilities.generateBuildSelect(User)
            }
        }, {
            label: lang.get('bo.role-user_role'),
            name: 'role_id',
            width: 200,
            editable: true,
            edittype: 'select',
            formatter: 'select',
            editoptions: {
                value: utilities.generateGetItems('/api/role', Role)(),
                dataUrl: '/api/role',
                buildSelect: utilities.generateBuildSelect(Role)
            }
        }];
        var colModelExtraFunction = function () {
            return JSON.stringify({
                user_id: {
                    sortOnLinkField: 'name',
                    searchOnLinkField: 'name'
                },
                role_id: {
                    sortOnLinkField: 'name',
                    searchOnLinkField: 'name'
                }
            });
        };

        // todo: standard way to add params in inheritance.
        var processedParams = setParamsColModel(params, colModel);
        processedParams.controllerUrl = CONTROLLER_URL;
        processedParams.colModelExtraFunction = colModelExtraFunction;
        processedParams.caption = lang.get('bo.guides');
        processedParams.SubRow = GuideSubRow;
        processedParams.hasSubGrid = true;

        Grid.call(this, processedParams);
    };

    Class.prototype = Object.create(Grid.prototype, {});

    function setParamsColModel(params, colModel) {
        // TODO: deep copy ?
        var processedParams = params;
        processedParams.colModel = colModel;

        return processedParams;
    }

    return Class;
});
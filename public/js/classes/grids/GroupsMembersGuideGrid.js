define([
    'lodash',
    'classes/Grid'
], function (_,
             Grid) {

    var CONTROLLER_URL = '/api/user'; // TODO

    var Class = function (params) {
        var colModel = [{
            label: _.capitalize(params.lang.get('bo.id')),
            name: 'id',
            width: 100,
            key: true,
            searchoptions: {
                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
            },
            searchrules: {
                integer: true
            }
        }];
        var processedParams = setParamsColModel(params, colModel);
        processedParams.controllerUrl = CONTROLLER_URL;

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
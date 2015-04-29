define([
    'lodash',
    'classes/AttributesObject'
], function (_,
             AttributesObject) {

    var attributesRules = {

    }

    var Class = function () {
        AttributesObject.call(this, params, attributesRules);
    };

    Class.prototype = Object.create(
        AttributesObject.prototype, {


        });

    return Class;
});
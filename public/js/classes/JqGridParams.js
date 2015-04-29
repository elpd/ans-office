define([
    'lodash',
    'classes/AttributesObject'
], function (_,
             AttributesObject) {

    var attributesRules = {
        rawParams: {
            required: true,
            defaults: {
                calculation: {
                    colModel: []
                }
            }
        }

    };

    var Class = function () {
        AttributesObject.call(this, params, attributesRules);
    };

    Class.prototype = Object.create(AttributesObject.prototype, {
        columns: {
            value: function(){
                var self = this;
                return new ColumnsInterface(self);
            }
        }
    });

    function ColumnsInterface(self){
    }
    ColumnsInterface.prototype = Object.create(Object.prototype,{
        remove: {
            value: function(columnId){

            }
        }
    });

    return Class;
});
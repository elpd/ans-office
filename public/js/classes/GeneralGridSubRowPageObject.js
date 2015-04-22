define([
    'classes/StandardObject'
], function (StandardObject) {

    var Class = function (params) {
        this.setParams(params);
        this.setVariables();
    };

    Class.prototype = {
        variablesDefinitions: {
            pageId: {
                dependencies: [],
                defaults: null
            }
        },

        setParams: function(params) {
            var self = this;
            self.pageId = params.pageId;
        },

        get$Page: function () {
            var self = this;
            return $('#' + self.pageId);
        },

        getGridDesiredHeight: function() {
            var self = this;
            //var pageHeight = self.get$Page().outerHeight(true);
            return 100;
        },

        getGridDesiredWidth: function() {
            var self = this;
            return self.get$Page().width() - 10;
        }
    };
    Class.prototype.__proto__ = new StandardObject(); // StandardObjct.__proto__

    return Class;
});
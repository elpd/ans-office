define([
    'lodash',
    'classes/StandardObject'
], function (_,
             StandardObject) {

    var Class = function (params) {
        this.setParams(params);
        this.setVariables();
    };

    Class.prototype = {
        variablesDefinitions: {
            name: {
                dependencies: [],
                defaults: null
            },
            pageId: {
                dependencies: ['name'],
                defaults: function (name) {
                    return name + '_page';
                }
            }
        },

        setParams: function (params) {
            this.name = params.name;
        },

        get$Page: function () {
            return $('#' + this.pageId);
        },

        get$SectionHeader: function () {
            return $('.section_header');
        },

        getGridDesiredHeight: function () {
            var self = this;
            var pageHeight = self.get$Page().outerHeight(true);
            var headerHeight = self.get$SectionHeader().outerHeight(true);

            return pageHeight - headerHeight;
        },

        getGridDesiredWidth: function () {
            var self = this;
            return self.get$Page().width();
        }
    };
    Class.prototype.__proto__ = new StandardObject();

    return Class;
});
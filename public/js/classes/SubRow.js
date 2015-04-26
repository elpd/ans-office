define([
        'classes/utilities',
        'classes/AttributesObject'
    ],
    function (utilities,
              AttributesObject) {

        var attributesRules = {
            parentGridId: {
                required: true
            },
            subRowId: {
                required: true
            },
            rowId: {
                required: true
            }
        };

        var Class = function (params) {
            AttributesObject.call(this, params, attributesRules);
        };

        Class.prototype = Object.create(AttributesObject.prototype, {
            get$Page: {
                value: function () {
                    var self = this;
                    return $('#' + self.subRowId);
                }
            },

            execute: {
                value: function () {

                }
            },

            getRowData: {
                value: function (parentRowKey) {
                    var self = this;
                    return self.get$Grid.jqGrid('getRowData', parentRowKey);
                }
            },

            calcGridDesiredHeight: {
                value: function () {
                    var self = this;
                    //var pageHeight = self.get$Page().outerHeight(true);
                    return 100;
                }
            },

            calcGridDesiredWidth: function () {
                var self = this;
                return self.get$Page().width() - 10;
            }
        });

        return Class;
    });

define([
    'lodash',
    'classes/AttributesObject'
], function (_,
             AttributesObject) {

    var SECTION_HEADER_CLASS = 'section_header';
    var RIGHT_ALIGNED_CLASS = 'right_aligned';

    var attributesRules = {
        mainId: {
            required: true
        },
        Grid: {
            required: true
        },
        gridId: {
            required: true,
            defaults: {
                dependencies: ['mainId'],
                calculation: function (mainId) {
                    return mainId + '_grid';
                }
            }
        },
        direction: {},
        headerTitle: {
            required: true
        },
        beforeGridExecution: {

        },
        afterGridExecution: {}
    };

    var Class = function (params) {
        AttributesObject.call(this, params, attributesRules);
    };

    Class.prototype = Object.create(AttributesObject.prototype, {
        get$Page: {
            value: function () {
                return $('#' + this.mainId);
            }
        },

        get$SectionHeader: {
            value: function () {
                var self = this;
                return self.get$Page().find('.' + SECTION_HEADER_CLASS);
            }
        },

        calcGridDesiredHeight: {
            value: function () {
                var self = this;
                var pageHeight = self.get$Page().outerHeight(true);
                var headerHeight = self.get$SectionHeader().outerHeight(true);

                return pageHeight - headerHeight;
            }
        },

        calcGridDesiredWidth: {
            value: function () {
                var self = this;
                return self.get$Page().width();
            }
        },

        execute: {
            value: function () {
                var self = this;

                makeHeader(self);
                makeGridElements(self);
            }
        }
    });

    function makeHeader(self) {
        var $header = $('<h2>' + self.headerTitle + '</h2>');
        $header.addClass(SECTION_HEADER_CLASS);
        if (self.direction && self.direction == 'right_to_left'){
            $header.addClass(RIGHT_ALIGNED_CLASS);
        }

        self.get$Page().append($header);
    }

    function makeGridElements(self) {
        var gridParams = calcGridParams(self);
        var grid = new self.Grid(gridParams);

        var $divRow = $('<div></div>');
        $divRow.addClass('row');

        var $divCol = $('<div></div>');
        $divCol.addClass('col-xs-12');

        var $gridTable = $('<table></table>');
        $gridTable.attr('id', self.gridId);

        var $pagerDiv = $('<div></div>');
        $pagerDiv.attr('id', grid.pagerId);

        $divCol.append($gridTable);
        $divCol.append($pagerDiv);

        $divRow.append($divCol);

        self.get$Page().append($divRow);

        if (self.beforeGridExecution) {
            self.beforeGridExecution(grid);
        }

        grid.execute();

        if (self.afterGridExecution) {
            self.afterGridExecution(grid);
        }
    }

    function calcGridParams(self) {
        var gridParams = {};

        gridParams.gridId = self.gridId;
        gridParams.calcDesiredHeightInContainer = function () {
            return self.calcGridDesiredHeight();
        };
        gridParams.calcDesiredWidthInContainer = function () {
            return self.calcGridDesiredWidth();
        };

        if (self.direction) {
            gridParams.direction = self.direction;
        }

        return gridParams;
    }

    return Class;
});
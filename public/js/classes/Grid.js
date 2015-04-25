define([
    'classes/EmptySubRow'
], function (EmptySubRow) {

    var GRID_HEIGHT_MIN = 100;
    var GRID_WIDTH_MIN = 500;

    var classAttributes = {
        gridId: {
            required: true
        },
        pagerId: {
            defaults: {
                dependencies: ['gridId'],
                calculation: function (gridId) {
                    return gridId + '_pager';
                }
            },
            required: true
        },
        caption: {},
        direction: {},
        hasSubGrid: {
            required: true,
            defaults: {
                calculation: false
            }
        },
        SubRow: {
            required: function () {
                return this.hasSubGrid ? true : false;
            },
            defaults: {
                calculation: function () {
                    return EmptySubRow
                }
            }
        },
        dataRowClass: {
            required: true,
            defaults: {
                dependencies: ['gridId'],
                calculation: function (gridId) {
                    return gridId + '_row';
                }
            }
        },
        hasParent: {
            required: true,
            defaults: {
                calculation: false
            }
        },
        parentLink: {
            required: function () {
                return this.hasParent ? true : false;
            }
        },
        controllerUrl: {
            required: true
        },
        colModel: {
            required: true
        },
        lang: {
            required: true
        },
        userSettingsGService: {
            required: true
        }
    }

    var Class = function (params) {
        setAttributes(this, classAttributes, params);
    };

    Class.prototype = Object.create(Object.prototype, {
        activate: {
            value: function () {
                var self = this;
                setGridComponent(self);
                setFilterToolbarComponent(self);
                setNavigationComponents(self);
            }
        },

        get$Grid: {
            value: function () {
                var self = this;
                return $('#' + self.gridId);
            }
        }
    });

    function setAttributes(self, attributes, params) {
        var attList = createAttributesListByDependencies(attributes);
        _.forEach(attList, function (attDef, attKey) {
            setAttribute(self, attDef, attKey, params);
        });
    }

    function createAttributesListByDependencies(attributes) {
        // TODO
        return attributes;
    }

    function setAttribute(self, attDef, attKey, params) {
        var required = calcRequired(self, attDef);

        if (params.hasOwnProperty(attKey)) {
            self[attKey] = params[attKey];

        } else if (attDef.defaults && required) {
            self[attKey] = calcAttributeDefault(self, attDef);

        } else if (required) {
            throw new Error('Initialization of object failed. Missing required attribute: ' +
                attKey
            );
        }
    }

    function calcRequired(self, attDef) {
        if (!attDef.hasOwnProperty('required')) {
            return false;
        }
        if (_.isFunction(attDef.required)) {
            attDef.required.apply(self, null);

        } else {
            return attDef.required;
        }
    }

    function calcAttributeDefault(self, attDef) {
        var dependenciesValues = [];
        var defaults = attDef.defaults;

        if (defaults.hasOwnProperty('dependencies')) {

            _.forEach(attDef.defaults.dependencies, function (depName) {
                if (!self.hasOwnProperty(depName)) {
                    throw new Error('something wrong in attributes dependencies list');
                }
                dependenciesValues.push(self[depName]);
            });
        }

        if (_.isFunction(defaults.calculation)) {
            return defaults.calculation.apply(self, dependenciesValues);
        } else {
            return defaults.calculation;
        }
    }

    function calcGridParamsOnActivation(self) {
        var params = {};

        var subRow = self.hasSubGrid ? createSubRow(self) : null;

        params.url = self.controllerUrl;
        params.colModel = self.colModel;

        // show the current page, data rang and total records on the toolbar
        params.viewrecords = true;
        params.width = GRID_WIDTH_MIN;
        params.shrinkToFit = false;
        params.height = GRID_HEIGHT_MIN;
        /* rowNum - number of rows to display
         * options:
         * - "" : all rows
         */
        params.rowNum = 1000;
        params.datatype = 'json';
        params.pager = '#' + self.pagerId;
        params.rowList = [30, 50, 100, 200, 1000];
        if (self.caption) {
            params.caption = self.caption;
        }
        // Direction: instructs the grid to use RTL settings
        if (self.direction) {
            params.direction = self.direction;
        }
        params.autowidth = true;

        if (self.hasSubGrid) {
            params.subGrid = self.hasSubGrid;
            params.subGridRowExpanded = subRow.show.bind(self.subRow);
        }

        /*
         * Post Data
         */

        params.postData = {};
        if (self.hasParent) {
            params.postData.parentLink = self.parentLink;
        }
        if (self.colModelExtraFunction) {
            params.postData.colModelExtra = function () {
                return self.colModelExtraFunction();
            }
        }

        /*
         * Grid Events
         */

        params.ondblClickRow = function (id, iRow, iCol, e) {
            // TODO: logic from general grid.
        };

        params.gridComplete = function () {
            // TODO: loading indicator
        };

        params.rowattr = function (rowData, currentObj, rowId) {
            return {
                "class": ["dataRow " + self.dataRowClass]
            };
        };

        params.serializeRowData = function (postdata) {
            // TODO: from general grid logic.
            var processedData = postdata;
            return processedData;
        };

        params.loadError = function (xhr, status, error) {
            $.jgrid.info_dialog(
                $.jgrid.errors.errcap,
                '<div class="ui-state-error">' +
                '<h3>Server Error</h3>' +
                '<div>Status: ' + status + '</div>' +
                '<div>error: ' + error + '</div>' +
                '<div>xhr status: ' + xhr.status + '</div>' +
                '<div>xhr status text : ' + xhr.statusText + '</div>' +
                '</div>',
                $.jgrid.edit.bClose,
                {
                    buttonalign: 'right'
                });
        };

        return params;
    }

    function createSubRow(self) {
        var subRow = new self.SubRow({
            parentControllerUrl: self.controllerUrl,
            lang: self.lang,
            userSettingsGService: self.userSettingsGService // TODO
        });

        return subRow;
    }

    function setGridComponent(self) {
        var gridParams = calcGridParamsOnActivation(self);
        var $grid = self.get$Grid();
        $grid.jqGrid(gridParams);
    }

    function setFilterToolbarComponent(self) {
        var $grid = self.get$Grid();
        $grid.jqGrid('filterToolbar', {
            // instruct the grid toolbar to show the search options
            searchOperators: true,
            defaultSearch: 'cn'
        });
    }

    function setNavigationComponents(self) {
        var $grid = self.get$Grid();
        $grid.navGrid('#' + self.pagerId,
            // the buttons to appear on the toolbar of the grid
            {
                edit: false,
                add: true,
                del: true,
                refresh: false,
                view: false
            });
    }

    return Class;
});

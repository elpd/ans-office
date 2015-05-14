define([
        'lodash',
        'classes/utilities',
        'classes/AttributesObject',
        'classes/SubRow',
        'classes/LoadingIndicator',
        'classes/database/query/Builder',
        'services/language'
    ], function (_,
                 utilities,
                 AttributesObject,
                 EmptySubRow,
                 LoadingIndicator,
                 QueryBuilder,
                 lang) {

        var GRID_HEIGHT_MIN = 150;
        var GRID_WIDTH_MIN = 1050;
        var FULL_SCREEN_GRID_BOX_CLASS = 'full_screen_grid';
        var GRID_TITLE_BAR_CLASS = 'ui-jqgrid-titlebar';
        var GRID_HEADER_BOX_CLASS = 'ui-jqgrid-hdiv';
        var GRID_INNER_HEADER_BOX_CLASS = 'ui-jqgrid-hbox';
        var GRID_BOTTOM_PAGER_CLASS = 'ui-jqgrid-pager.ui-corner-bottom';
        var POST_DATA_OPERATION_EDIT = 'edit';
        var ROW_SUCCESSFUL_UPDATE_CLASS = 'row_successful_update';

        var JQGRID_FN_GET_ROW_DATA = 'getRowData';
        var JQGRID_FN_RESTORE_ROW = 'restoreRow';
        var JQGRID_FN_EDIT_ROW = 'editRow';
        var JQGRID_FN_SET_ROW_DATA = 'setRowData';
        var JQGRID_FN_SET_GROUP_HEADERS = 'setGroupHeaders';
        var JQGRID_FN_SEARCH_GRID = 'searchGrid';

        var GRID_LOADING_COMPLETE_EVENT_ID = 'grid_events:loading_complete';
        var GRID_LOADING_STARTED_EVENT_ID = 'grid_events:loading_started';

        var attributesRules = {
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
                required: true,
                defaults: {
                    dependencies: [],
                    calculation: function () {
                        return {};
                    }
                }
            },
            gridBoxId: {
                required: true,
                defaults: {
                    dependencies: ['gridId'],
                    calculation: function (gridId) {
                        return 'gbox_' + gridId;
                    }
                }
            },

            pagerLeftId: {
                required: true,
                defaults: {
                    dependencies: ['pagerId'],
                    calculation: function (pagerId) {
                        return pagerId + '_left';
                    }
                }
            },

            pagerCenterId: {
                required: true,
                defaults: {
                    dependencies: ['pagerId'],
                    calculation: function (pagerId) {
                        return pagerId + '_center';
                    }
                }
            },

            pagerRightId: {
                required: true,
                defaults: {
                    dependencies: ['pagerId'],
                    calculation: function (pagerId) {
                        return pagerId + '_right';
                    }
                }
            },

            calcDesiredHeightInContainer: {
                required: true
            },
            calcDesiredWidthInContainer: {
                required: true
            },
            fullScreenButtonId: {
                required: true,
                defaults: {
                    dependencies: ['pagerId'],
                    calculation: function (pagerId) {
                        return pagerId + '_fullscr_button';
                    }
                }
            },
            beforeEditGridData: {
                required: true,
                defaults: {
                    calculation: function () {
                        return {};
                    }
                }
            },
            isExecuted: {
                required: true,
                defaults: {
                    calculation: false
                }
            },
            colModelExtraFunction: {},

            // Tracking of successful edited rows. For visual indication.
            changedRows: {
                required: true,
                defaults: {
                    calculation: function () {
                        return [];
                    }
                }
            },

            _selectedMainColumns: {
                required: true,
                defaults: {
                    calculation: function () {
                        return [];
                    }
                }
            },

            _children: {
                required: true,
                defaults: {
                    calculation: function () {
                        return {};
                    }
                }
            },

            _selectedChildrenGroups: {
                required: true,
                defaults: {
                    calculation: function () {
                        return [];
                    }
                }
            },

            mainQueryFilter: {
                require: true,
                defaults: {
                    calculation: function () {
                        return null;
                    }
                }
            }
        };

        var Class = function (params) {
            var self = this;
            AttributesObject.call(self, params, attributesRules);
        };

        Class.prototype = Object.create(AttributesObject.prototype, {
            defaultColumnsDefinitions: {
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
                    updated_at: {
                        label: _.capitalize(lang.get('bo.general_updated-at')),
                        name: 'updated_at',
                        editable: true,
                        formatter: 'datetime',
                        datefmt: 'yyyy-mm-dd',
                        editoptions: {
                            readonly: true,
                            // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                            // use it to place a third party control to customize the toolbar
                            //dataInit: utilities.generateDateTimePicker
                        },
                        //stype: 'datetime',
                        searchoptions: {
                            sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                            // TODO: bug in jqgrid ? find out why same id as parent search.
                            //dataInit: generateDateTimePicker
                        },
                        searchrules: {
                            date: true
                        }
                    }
                }
            },

            getDefaultColumnsDefinitions: {
                value: function () {
                    var self = this;
                    var columns = {};

                    if (self.hasOwnProperty('defaultColumnsDefinitions')){
                        columns = _.merge({}, _.cloneDeep(self.defaultColumnsDefinitions));
                    }

                    var parent = self.__proto__;
                    if (typeof(parent.getDefaultColumnsDefinitions) !== 'undefined') {
                        var parentColumns = parent.getDefaultColumnsDefinitions();
                        columns = _.merge({}, columns, parentColumns);
                    }

                    return columns;
                }
            },

            execute: {
                value: function () {
                    var self = this;
                    setGridComponent(self);
                    setGridHeaders(self);
                    setFilterToolbarComponent(self);
                    setNavigationComponents(self);
                    setLoadingIndicator(self);
                    setGeneralBehavior(self);

                    // Make grid resize on first activation.
                    $(window).trigger('resize');

                    self.isExecuted = true;
                }
            },

            get$Grid: {
                value: function () {
                    var self = this;
                    return $('#' + self.gridId);
                }
            },

            get$GridBox: {
                value: function () {
                    var self = this;
                    return $('#' + self.gridBoxId);
                }
            },

            get$GridTitleBar: {
                value: function () {
                    var self = this;
                    return self.get$GridBox().find('.' + GRID_TITLE_BAR_CLASS);
                }
            },

            get$GridHeaderBox: {
                value: function () {
                    var self = this;
                    return self.get$GridBox().find('.' + GRID_HEADER_BOX_CLASS);
                }
            },

            get$GridInnerHeaderBox: {
                value: function () {
                    var self = this;
                    return self.get$GridBox().find('.' + GRID_INNER_HEADER_BOX_CLASS);
                }
            },

            get$GridBottomPager: {
                value: function () {
                    var self = this;
                    return self.get$GridBox().find('.' + GRID_BOTTOM_PAGER_CLASS);
                }
            },

            get$PagerLeft: {
                value: function () {
                    var self = this;
                    return $('#' + self.pagerLeftId);
                }
            },

            get$PagerCenter: {
                value: function () {
                    var self = this;
                    return $('#' + self.pagerCenterId);
                }
            },

            get$PagerRight: {
                value: function () {
                    var self = this;
                    return $('#' + self.pagerRightId);
                }
            },

            getRowData: {
                value: function (rowBusinessObjectId) {
                    var self = this;
                    return self.get$Grid().jqGrid(JQGRID_FN_GET_ROW_DATA, rowBusinessObjectId);
                }
            },

            redrawGridDimensions: {
                value: function (params) {
                    var self = this;
                    var desiredGridSize = self.calcDesiredGridSize();

                    var isShrinkToFit = params.hasOwnProperty('shrinkToFit') ?
                        params.shrinkToFit : false;
                    //isShrinkToFit = (desiredGridSize.width <= GRID_WIDTH_MIN) ?
                    //    true : isShrinkToFit;

                    self.redrawGridDimensionsPhase(desiredGridSize, isShrinkToFit);
                }
            },

            calcDesiredGridSize: {
                value: function () {
                    var self = this;

                    var calcHeight = 0;
                    var calcWidth = 0;

                    if (self.isGridInFullScreen()) {
                        calcHeight = self.calcGridHeightWhenFull();
                        calcWidth = self.calcGridWidthWhenFull();
                    } else {
                        calcHeight = self.calcGridHeightWhenNormal();
                        calcWidth = self.calcGridWidthWhenNormal();
                    }

                    // todo: refactor to Rectangle class.
                    return {
                        height: calcHeight,
                        width: calcWidth,
                        equals: function (target) {
                            if (this.height == target.height && this.width == target.width) {
                                return true;
                            }

                            return false;
                        }
                    };
                }
            },

            isGridInFullScreen: {
                value: function () {
                    var self = this;
                    var result = self.get$GridBox().hasClass(FULL_SCREEN_GRID_BOX_CLASS);

                    return result;
                }
            },

            calcGridHeightWhenFull: {
                value: function () {
                    var self = this;

                    var windowHeight = $(window).height();
                    var titleBarHeight = self.get$GridTitleBar().outerHeight(true);
                    var headerBoxHeight = self.get$GridHeaderBox().outerHeight(true);
                    var bottomPagerHeight = self.get$GridBottomPager().outerHeight(true);

                    var calc = windowHeight - (titleBarHeight + headerBoxHeight + bottomPagerHeight);

                    return calc;
                }
            },

            calcGridWidthWhenFull: {
                value: function () {
                    var self = this;
                    var windowWidth = $(window).width();
                    var calc = windowWidth;

                    return calc;
                }
            },

            calcGridHeightWhenNormal: {
                value: function () {
                    var self = this;

                    var desiredHeightInContainer = self.calcDesiredHeightInContainer();
                    var titleBarHeight = self.get$GridTitleBar().outerHeight(true);
                    var headerBoxHeight = self.get$GridHeaderBox().outerHeight(true);
                    var bottomPagerHeight = self.get$GridBottomPager().outerHeight(true);

                    var calcHeight = desiredHeightInContainer - (titleBarHeight + headerBoxHeight + bottomPagerHeight + 5);
                    // Set a minimum for height;
                    calcHeight = calcHeight < GRID_HEIGHT_MIN ? GRID_HEIGHT_MIN : calcHeight;

                    return calcHeight;
                }
            },

            calcGridWidthWhenNormal: {
                value: function () {
                    var self = this;
                    var calc = self.calcDesiredWidthInContainer();

                    // Set a minimum for height;
                    calc = calc < GRID_WIDTH_MIN ? GRID_WIDTH_MIN : calc;

                    return calc;
                }
            },

            redrawGridDimensionsPhase: {
                value: function (gridSize, isShrinkToFit) {
                    var self = this;

                    // Bug in jqGrid. not enough space on pager. all to the left.
                    self.get$PagerLeft().width('');
                    self.get$PagerCenter().width('');
                    self.get$PagerRight().width('');

                    self.get$Grid().setGridHeight(gridSize.height + 'px');
                    self.get$Grid().setGridWidth(gridSize.width, isShrinkToFit);
                }
            },

            setGridToFullScreen: {
                value: function () {
                    var self = this;
                    var $gridBox = self.get$GridBox();

                    $gridBox.addClass(FULL_SCREEN_GRID_BOX_CLASS);

                    self.redrawGridDimensions({shrinkToFit: false});
                }
            },

            exitFullScreen: {
                value: function () {
                    var self = this;
                    var $gridBox = self.get$GridBox();

                    $gridBox.removeClass(FULL_SCREEN_GRID_BOX_CLASS);

                    self.redrawGridDimensions({shrinkToFit: false});
                }
            },

            customButtonFullScreen: {
                value: function () {
                    var self = this;
                    return new CustomButtonFullScreen({
                        id: self.fullScreenButtonId
                    });
                }
            },

            direction: {
                set: function (val) {
                    var modifiedVal = null;
                    switch (val) {
                        case 'right_to_left':
                            modifiedVal = 'rtl';
                            break;
                        case 'left_to_right':
                            modifiedVal = 'ltr';
                            break;
                        case 'rtl':
                            modifiedVal = 'rtl';
                            break;
                        case 'ltr':
                            modifiedVal = 'ltr';
                            break;
                        default:
                            throw new Error('unexpected value'); // TODO:
                    }

                    this._direction = modifiedVal;
                },
                get: function () {
                    return this._direction;
                }
            },

            columns: {
                value: function () {
                    var self = this;
                    return new GridColumnsInterface(self);
                }
            },

            children: {
                value: function () {
                    var self = this;
                    return new GridChildrenInterface(self);
                }
            },

            calcSumOfColumnsWidth: {
                value: function () {
                    var self = this;
                    // todo
                }
            },

            refreshGridIncludeDefinitions: {
                value: function () {
                    var self = this;
                    self.get$Grid().jqGrid('GridUnload', self.gridId);
                    self.execute();
                }
            },

            ready: {
                value: function () {
                    var self = this;
                    return self._readyPromise;
                }
            },

            setMainQueryFilter: {
                value: function (filter) {
                    var self = this;
                    self.mainQueryFilter = filter;
                }
            }
        });

        function GridColumnsInterface(self) {
            return {
                makeHidden: function (columnId) {
                    hideFromColumns(columnId);
                },
                add: function (column) {
                    if (column instanceof Array) {
                        column.forEach(function (item) {
                            addToColumns(item);
                        })
                    } else {
                        addToColumns(column);
                    }
                },
                selectAbsolute: function (selectionParam) {
                    self._selectedMainColumns = [];
                    if (selectionParam instanceof Array) {
                        selectionParam.forEach(function (selectedName) {
                            selectMainSingular(selectedName);
                        });
                    } else {
                        selectMainSingular(selectionParam);
                    }
                },
                selectAbsoluteAll: function () {
                    self._selectedMainColumns = [];
                    _.forEach(self.colModel, function (colDef, colKey) {
                        selectMainSingular(colKey);
                    });
                }
            }

            function selectMainSingular(selectedMain) {
                self._selectedMainColumns.push(selectedMain);
            }

            function hideFromColumns(columnId) {
                self.colModel[columnId] = _.merge({},
                    self.colModel[columnId],
                    {
                        hidden: true
                    });
            }

            function addToColumns(colDef) {
                self.colModel[colDef.name] = colDef;
            }
        }

        function GridChildrenInterface(self) {
            return {
                add: function (childDefParam) {
                    if (childDefParam instanceof Array) {
                        addMultiple(childDefParam);
                    } else {
                        addSingular(childDefParam);
                    }
                },

                selectAbsolute: function (selectionParam) {
                    removeAllSelection();
                    if (selectionParam instanceof Array) {
                        selectionParam.forEach(function (selectionItem) {
                            selectSingular(selectionItem);
                        })
                    } else {
                        selectSingular(selectionItem);
                    }

                    self.refreshGridIncludeDefinitions();
                }
            };

            function addSingular(childDef) {
                var customDef = _.cloneDeep(childDef);

                customDef.columns.forEach(function (columnDef) {
                    // Only one column in the all grid can be a key.
                    columnDef.key = false;

                    // Protect id
                    if (columnDef.name == 'id') {
                        columnDef.editable = true;
                        columnDef.editoptions = {
                            readonly: true
                        };
                    }

                    // Protect parent column reference.
                    if (customDef.parentColumn) {
                        if (columnDef.name == customDef.parentColumn) {
                            columnDef.hidden = true;
                        }
                    }

                    // Add child table name to column field name.
                    columnDef.name = childDef.queryJoinTable +
                        '.' +
                        columnDef.name;

                    columnDef.extraInfo = _.merge({}, columnDef.extraInfo,
                        function (objectValue, sourceValue, key, object, source) {
                            if (key == 'linkMethod') {
                                return customDef.queryLinkMethod + '.' +
                                    sourceValue;
                            }
                        });


                });
                self._children[childDef.name] = customDef;
            }

            function addMultiple(childrenDefs) {
                childrenDefs.forEach(function (childDef) {
                    addSingular(childDef);
                })
            }

            function removeAllSelection() {
                self._selectedChildrenGroups = [];
            }

            function selectSingular(selectedChild) {
                self._selectedChildrenGroups.push(selectedChild);
            }
        }

        function CustomButtonFullScreen(params) {
            id = params.id;
        }

        CustomButtonFullScreen.prototype = {
            fullScreenIconId: 'ui-icon-arrow-4-diag',
            exitScreenIconId: 'ui-icon-arrow-1-se',

            get$IconSpan: function () {
                return this.get$LabelDiv().find('span');
            },

            get$LabelDiv: function () {
                return $('#' + self.id + ' div.ui-pg-div');
            },

            setAppearanceAsEnterFullScreen: function () {
                var self = this;

                self.get$IconSpan().removeClass(self.exitScreenIconId);
                self.get$IconSpan().addClass(self.fullScreenIconId);
                setTextContents(self.get$LabelDiv(), 'Full Screen');
            },

            setAppearanceAsExitFullScreen: function () {
                var self = this;

                self.get$IconSpan().removeClass(self.fullScreenIconId);
                self.get$IconSpan().addClass(self.exitScreenIconId);
                setTextContents(self.get$LabelDiv(), 'Exit Full Screen');
            }

        };

        function setTextContents($elem, text) {
            $elem.contents().filter(function () {
                if (this.nodeType == Node.TEXT_NODE) {
                    this.nodeValue = text;
                }
            });
        }

        function calcGridParamsOnActivation(self) {
            var params = {};

            params.url = self.controllerUrl;
            params.colModel = calcGridColModel(self);

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
            params.multiSort = true;

            if (self.hasSubGrid) {
                params.subGrid = self.hasSubGrid;
                params.subGridRowExpanded = function (subgrid_id, row_id) {

                    var subRow = new self.SubRow({
                        parentGridId: self.gridId,
                        subRowId: subgrid_id,
                        rowId: row_id
                    });

                    subRow.execute();
                }
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

            params.ondblClickRow = function (rowBusinuessObjectId, rowIndex,
                                             columnIndex, e) {
                e.stopPropagation();
                openRowForInlineEditing(self, rowBusinuessObjectId, e.target);
            };

            params.beforeRequest = function () {
                var $grid = self.get$Grid();
                self._readyPromise = new Promise(function (resolve, reject) {
                    $grid.on(GRID_LOADING_COMPLETE_EVENT_ID, function (e) {
                        resolve();
                    });
                });
                $grid.trigger(GRID_LOADING_STARTED_EVENT_ID);

                // Values: false: stop request. true - continue with request;
                return true;
            };

            params.gridComplete = function () {
                self.get$Grid().trigger(GRID_LOADING_COMPLETE_EVENT_ID);
            };

            params.rowattr = function (rowData, currentObj, rowId) {
                var rowClasses = 'dataRow' + ' ' + self.dataRowClass;

                if (_.indexOf(self.changedRows, rowId) >= 0) {
                    rowClasses += ' ' + ROW_SUCCESSFUL_UPDATE_CLASS;
                }

                return {
                    "class": [rowClasses]
                };
            };

            params.serializeRowData = function (postdata) {
                var processedData = postdata;
                if (postdata.oper && postdata.oper == POST_DATA_OPERATION_EDIT) {
                    processedData = calcOnlyModifiedFields(postdata, self.beforeEditGridData);
                    processedData= calcChildrenGroupsFields(processedData);
                    processedData.oper = postdata.oper;
                    processedData._token = postdata._token;
                }
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

            params.serializeGridData = function (postData) {
                var resultData = postData;

                resultData._query = {
                    _filler: "filler"
                };

                calcInnerJoinSelectQueryOperation(self, postData, resultData._query);
                calcFilterQueryOperation(self, postData, resultData._query);
                calcSortQueryOperation(self, postData, resultData._query);

                return resultData;
            };

            return params;
        }

        function calcSortQueryOperation(self, postData, query) {
            var jqGridSortIndexes = postData.sidx;
            var jqGridSortOrder = postData.sord;

            if (jqGridSortIndexes == '') {
                return;
            }

            var tempSortIndexAndOrderPairs = jqGridSortIndexes.split(',');
            var sortIndexAndOrderPairs = _.map(tempSortIndexAndOrderPairs, function (pairStr) {
                var pairArray = _.words(pairStr, /[\w.]+/g);
                var pair = {};
                pair.index = pairArray[0];
                if (pairArray.length > 1) {
                    pair.order = pairArray[1];
                }

                var fieldDef = getColModelDef(self, pair.index);
                if (fieldDef.extraInfo && fieldDef.extraInfo.sortByForeignLinkToString) {
                    pair.isOnForeign = true;
                    pair.fieldModel = fieldDef.extraInfo.fieldModel;
                    pair.linkMethod = fieldDef.extraInfo.linkMethod;
                }
                return pair;
            });

            var last = _.last(sortIndexAndOrderPairs);
            if (last.order) {
                throw new Error('malformed jqgrid sort parameter');
            }
            last.order = jqGridSortOrder;

            query.sortParameters = sortIndexAndOrderPairs;
        }

        function calcInnerJoinSelectQueryOperation(self, postData, query) {
            if (self._selectedChildrenGroups.length > 0) {
                query.joinSelectChildren = _.map(self._selectedChildrenGroups,
                    function (selection) {
                        var childrenGroupDef = self._children[selection];
                        return childrenGroupDef.name;
                    });
            }
        }

        function calcFilterQueryOperation(self, postData, query) {
            calcParentLinkFilter(self, postData, query);
            calcSearchFilters(self, postData, query);
        }

        function calcParentLinkFilter(self, postData, query) {
            if (self.parentLink) {
                query.parentLinkFilter = {
                    parent_id: self.parentLink.id,
                    fieldToFilterBy: self.parentLink.childFieldName
                }
            }
        }

        function calcSearchFilters(self, postData, query) {
            var mainFilter = calcMainFilter(self);

            if (postData.filters && postData._search) {
                var parseJqGridFilters = JSON.parse(postData.filters);
                mainFilter.groupData.nodes.push(
                    calcJqGridFilterToQueryFilter(self, parseJqGridFilters)
                );
            }

            query.filters = mainFilter;
        }

        function calcMainFilter(self) {
            var mainFilter = {
                filterType: 'group',
                groupData: {
                    operation: 'and',
                    nodes: []
                }
            };

            if (self.mainQueryFilter != null) {
                mainFilter.groupData.nodes.push(self.mainQueryFilter);
            }

            return mainFilter;
        }

        function calcJqGridFilterToQueryFilter(self, jqGridFilter) {
            var filter = {};

            var rulesLength = jqGridFilter.rules ? jqGridFilter.rules.length : 0;
            var groupsLength = jqGridFilter.groups ? jqGridFilter.groups.length : 0;

            if (rulesLength == 0 && groupsLength == 0) {
                filter.filterType = 'no_operation';
                filter.operation = 'no_operation';
                // todo: maybe to throw
                return filter;
            }

            if (
                (rulesLength == 1 && groupsLength == 0) ||
                (rulesLength == 0 && groupsLength == 1)
            ) {

                if (jqGridFilter.rules.length == 1) {
                    filter = calcJqGridSimpleFilter(self, jqGridFilter.rules[0]);
                } else {
                    filter = calcJqGridFilterToQueryFilter(self, jqGridFilter.groups[0]);
                }

                return filter;
            }

            filter.filterType = 'group';
            filter.groupData = {
                operation: jqGridFilter.groupOp,
                nodes: []
            };

            _.forEach(jqGridFilter.rules, function (jqGridSimpleFilter) {
                var childFilter = calcJqGridSimpleFilter(self, jqGridSimpleFilter);
                filter.groupData.nodes.push(childFilter);
            });

            _.forEach(jqGridFilter.groups, function (jqGridGroupFilter) {
                var childFilter = calcJqGridFilterToQueryFilter(self, jqGridGroupFilter);
                filter.groupData.nodes.push(childFilter);
            });

            return filter;
        }

        function calcJqGridSimpleFilter(self, jqGridSimpleFilter) {
            var filter = {};

            var fieldDef = getColModelDef(self, jqGridSimpleFilter.field);
            if (fieldDef.extraInfo && fieldDef.extraInfo.searchByRelationshipMethod) {
                filter.filterType = 'relationshipMethod';
                filter.linkedData = {
                    method: fieldDef.extraInfo.linkMethod,
                    operation: jqGridSimpleFilter.op,
                    targetValue: jqGridSimpleFilter.data,
                    targetType: 'toString' //,
                    //foreignField:
                };
            } else {
                filter.filterType = 'simple';
                filter.simpleData = {
                    operation: jqGridSimpleFilter.op,
                    targetValue: jqGridSimpleFilter.data,
                    fieldName: jqGridSimpleFilter.field
                }
            }

            return filter;
        }

        /*function isFieldDefinedAsSearchByForeign(self, fieldName) {
         var currentColModel = self.get$Grid().jqGrid('getGridParam', 'colModel');
         var result = _.find(currentColModel, function (columnDef) {
         if (columnDef.name == fieldName && columnDef.extraSearchOptions) {
         if (columnDef.extraSearchOptions.searchByForeignLinkToString) {
         return true;
         }
         }
         });

         if (result != null) {
         return true
         }

         return false;
         }*/

        function getColModelDef(self, fieldName) {
            var currentColModel = self.get$Grid().jqGrid('getGridParam', 'colModel');
            var result = _.find(currentColModel, function (columnDef) {
                if (columnDef.name == fieldName) {
                    return true;
                }
            });

            if (result == null) {
                throw new Error('unintended code path');
            }
            return result;
        }

        function calcGridColModel(self) {
            var calcResult = [];

            self._selectedMainColumns.forEach(function (selectionName) {
                var selectedModel = _.cloneDeep(self.colModel[selectionName]);
                calcResult.push(selectedModel);
            });

            self._selectedChildrenGroups.forEach(function (selectedChildGroupName) {
                var calcChildResult = [];
                var childGroup = self._children[selectedChildGroupName];
                childGroup.columns.forEach(function (childColumnDef) {
                    var selectedModel = _.cloneDeep(childColumnDef);
                    calcChildResult.push(selectedModel);
                });
                calcChildResult = arrangeColumnsInChild(calcChildResult);
                calcResult = calcResult.concat(calcChildResult);
            });

            return calcResult;
        }

        function arrangeColumnsInChild(columns) {
            var id_index = _.findIndex(columns, function(element) {
                return (utilities.strEndsWith(element.name, '.id'));
            });
            utilities.arrayMove(columns, id_index, 0);

            var updated_index = _.findIndex(columns, function(element){
                return (utilities.strEndsWith(element.name, '.updated_at'));
            });
            var last_index = columns.length - 1;
            utilities.arrayMove(columns, updated_index, last_index);

            return columns;
        }

        function setGridComponent(self) {
            var gridParams = calcGridParamsOnActivation(self);
            var $grid = self.get$Grid();
            $grid.jqGrid(gridParams);
        }

        function setGridHeaders(self) {
            var groupHeaders = calcGroupsHeaders(self);
            var headersParams = {
                useColSpanStyle: true,
                groupHeaders: groupHeaders
            };

            self.get$Grid().jqGrid(JQGRID_FN_SET_GROUP_HEADERS, headersParams);
            self.redrawGridDimensions({shrinkToFit: false});
        }

        function calcGroupsHeaders(self) {
            var groupsHeadersDefs = [];

            self._selectedChildrenGroups.forEach(function (groupName) {
                var headerDef = {};

                var childGroupDef = self._children[groupName];
                var id_index = _.findIndex(childGroupDef.columns, function(element) {
                    return (utilities.strEndsWith(element.name, '.id'));
                });
                var firstColumnDef = childGroupDef.columns[id_index];
                headerDef.startColumnName = firstColumnDef.name;
                headerDef.numberOfColumns = childGroupDef.columns.length;
                headerDef.titleText = '<em>' + childGroupDef.title + '</em>';
                groupsHeadersDefs.push(headerDef);
            });

            return groupsHeadersDefs
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

            var toolbarSettings = calcNavToolbarSettings(self);
            var editSettings = calcNavEditSettings(self);
            var addSettings = calcNavAddSettings(self);
            var deleteSettings = calcNavDeleteSettings(self);

            $grid.navGrid('#' + self.pagerId,
                toolbarSettings,
                editSettings,
                addSettings,
                deleteSettings,
                {
                    multipleSearch: true,
                    multipleGroup: true
                } // enable the advanced searching
            );

            addFullScreenButtonsToNavGrid(self, $grid);
            addFitColumnsToTableWidthButtonToNavGrid(self, $grid);
            addColumnsChooserButtonToNavGrid(self, $grid);
        }

        function addFullScreenButtonsToNavGrid(self, $grid) {
            $grid.navGrid('#' + self.pagerId)
                .navButtonAdd('#' + self.pagerId, {
                    caption: "Full",//"Full Screen",
                    buttonicon: "ui-icon-arrow-4-diag",
                    position: 'last',
                    id: self.fullScreenButtonId,
                    onClickButton: function () {
                        if (self.isGridInFullScreen()) {
                            self.exitFullScreen();
                            self.customButtonFullScreen().setAppearanceAsEnterFullScreen();
                        } else {
                            self.setGridToFullScreen();
                            self.customButtonFullScreen().setAppearanceAsExitFullScreen();
                        }
                    }
                });
        }

        function addFitColumnsToTableWidthButtonToNavGrid(self, $grid) {
            $grid.navGrid('#' + self.pagerId)
                .navButtonAdd('#' + self.pagerId, {
                    caption: "Fit",//"Fit To Size",
                    position: 'last',
                    onClickButton: function () {
                        self.redrawGridDimensions({shrinkToFit: true});
                    }
                });
        }

        function addColumnsChooserButtonToNavGrid(self, $grid) {
            $grid.navGrid('#' + self.pagerId)
                .navButtonAdd('#' + self.pagerId, {
                    caption: "Columns",//"Fit To Size",
                    position: 'last',
                    onClickButton: function () {
                        showColumnsChooserDialog(self);
                    }
                });
        }

        function showColumnsChooserDialog(self) {
            var $dialogChooser = $(
                '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" ' +
                'aria-hidden="true" data-backdrop="true">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '</div>' +
                '</div>' +
                ' </div>'
            );

            var $dialogHeader = $(
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span></button>' +
                '<h4 class="modal-title" id="myModalLabel">' +
                _.capitalize(lang.get('main.dialog-field-chooser_header')) +
                '</h4>' +
                '</div>');

            var $dialogBody = $(
                '<div class="modal-body">' +

                '</div>');

            var $closeButton = $('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
            var $saveButton = $('<button type="button" class="btn btn-primary">Save changes</button>');

            var $dialogFooter = $(
                '<div class="modal-footer">' +
                '</div>'
            );
            $dialogFooter.append($closeButton, $saveButton);

            var $childrenGroupsOptions = _.map(self._children,
                function (childGroupDef, childGroupDefKey) {
                    var $input = $('<input type="checkbox" class="childSelection" ' +
                    'value="' + childGroupDefKey + '">');
                    if (_.indexOf(self._selectedChildrenGroups, childGroupDefKey) >= 0) {
                        $input.attr('checked', true);
                    }

                    var inputHtml = $input[0].outerHTML;
                    var $option = $(
                        '<div class="checkbox">' +
                        '<label>' +
                        inputHtml +
                        childGroupDefKey +
                        '</label>' +
                        '</div>');

                    return $option;
                });

            var $form = $(
                '<form>' +
                '<h3 class="form_field_chooser_header">' +
                _.capitalize(lang.get('main.dialog-field-chooser_children_header')) +
                '</h3>' +
                '</form>'
            );

            $form.find('.form_field_chooser_header').after(
                $childrenGroupsOptions);

            $dialogBody.append($form);

            $dialogChooser.find('.modal-content').first().append(
                $dialogHeader, $dialogBody, $dialogFooter
            )

            $saveButton.click(function (e) {
                var selectedChildrenNames = []
                $form.find('input.childSelection').each(function (index, element) {
                    if ($(this).prop('checked')) {
                        selectedChildrenNames.push($(this).val());
                    }
                });
                self.children().selectAbsolute(selectedChildrenNames);
            });

            $dialogChooser.modal({
                //show: true
            });
        }

        function calcNavToolbarSettings(self) {
            var settings = {
                edit: false,
                add: true,
                del: true,
                refresh: true,
                view: false
            };

            return settings;
        }

        function calcNavEditSettings(self) {
            var settings = {};
            return settings;
        }

        function calcNavAddSettings(self) {
            var settings = {
                height: 'auto',
                width: 620,
                closeAfterAdd: true,
                recreateForm: true,
                reloadAfterSubmit: true,
                url: self.controllerUrl,
                mtype: 'POST',
                editData: {
                    _token: $_token, // todo: AMD
                    parentLink: self.parentLink
                },
                afterSubmit: function (data, postdata, oper) {
                    var response = data.responseJSON;
                    return [true, "", response.item_id];
                },
                errorTextFormat: function (responseRaw) {
                    var errorMessage = processErrorResponse(responseRaw);
                    return errorMessage.html;
                },
                beforeSubmit: function (postdata, formid) {
                    var returnData = {
                        success: true,
                        message: ''
                    }

                    if (self.onBeforeAddSubmit) {
                        self.onBeforeAddSubmit(postdata, returnData);
                    }

                    return [returnData.success, returnData.message];
                },
                beforeShowForm: function ($form) {
                    // Remove join child fields.
                    $('.FormData', $form).each(function (index, element) {
                        var $formData = $(this);
                        var formDataId = $formData.attr('id');
                        if (formDataId && formDataId.indexOf('.') >= 0) {
                            $formData.remove();
                        }
                    });
                }
            };

            return settings;
        }

        function calcNavDeleteSettings(self) {
            var settings = {
                height: 'auto',
                width: 620,
                url: self.controllerUrl + '/-1',
                mtype: 'DELETE',
                delData: {
                    _token: $_token
                },
                reloadAfterSubmit: true
            };

            return settings;
        }

        function processErrorResponse(responseRaw) {
            if (!responseRaw.hasOwnProperty('responseJSON')) {
                return {
                    text: responseRaw.responseText,
                    html: responseRaw.responseText
                };
            }

            var response = responseRaw.responseJSON;
            var messageText = '';
            var $messageHtml = $('<ol></ol>');

            if (!response.hasOwnProperty('success')) {
                _.forEach(response, function (val, key) {
                    messageText += 'field: ' + key + '. errors: ';
                    var $fieldHtml = $('<li>' + key + '</li>');
                    var $errorsMessagesListHtml = $('<ol></ol>');

                    _.forEach(val, function (errorMessage) {
                        messageText += errorMessage + '. ';
                        var $errorMessageHtml = $('<li>' + errorMessage + '</li>');
                        $errorsMessagesListHtml.append($errorMessageHtml);
                    });

                    $fieldHtml.append($errorsMessagesListHtml);
                    $messageHtml.append($fieldHtml);
                });
            } else {
                if (!response.success) {
                    _.forEach(response.errors, function (errorValue, errorKey) {
                        messageText += errorKey + ': ' + errorValue;
                        var $errorItem = $('<li>' + errorKey + ': ' + errorValue + '</li>');
                        $messageHtml.append($errorItem);
                    });

                    if (response.hasOwnProperty('exception')) {
                        if (response.exception.hasOwnProperty('xdebug_message')){

                            var $xdebug_table_message = $('<table></table>');
                            var $server_message = $(response.exception.xdebug_message);
                            $xdebug_table_message.append($server_message);
                            var $errorItem = $('<li>' + 'xdebug: ' + '</li>');
                            $errorItem.append($xdebug_table_message);

                            $messageHtml.append($errorItem);
                        }
                    }
                }
            }

            return {
                text: messageText,
                html: $messageHtml.html()
            };
        }

        function setGeneralBehavior(self) {

            // Grid size: automatic follow of window container.

            $(window).bind('resize', function () {
                self.redrawGridDimensions({});
            });
        }

        function calcOnlyModifiedFields(newData, oldData) {
            var processedData = {};

            _.forEach(newData, function (val, key) {
                if (oldData.hasOwnProperty(key)) {
                    if (newData[key] != oldData[key]) {
                        processedData[key] = val;
                    }

                    // always send id, created and updated data

                    if (key == 'id' || utilities.strEndsWith(key, '.id')) {
                        processedData[key] = val;
                    }

                    if (key == 'created_at' || utilities.strEndsWith(key, '.created_at')) {
                        processedData[key] = val;
                    }

                    if (key == 'updated_at' || utilities.strEndsWith(key, '.updated_at')) {
                        processedData[key] = val;
                    }

                } else {
                    processedData[key] = val;
                }
            });

            return processedData;
        }

        function calcChildrenGroupsFields(postData) {
            var groupsNames = calcGroupsNamesOnData(postData);
            var groups = {};

            _.forEach(groupsNames, function(groupName){
               var group = calcGroupOnData(postData, groupName);
                if (! (_.size(group) == 1 && group.hasOwnProperty('id'))) {
                    groups[groupName] = group;
                }
            });

            postData._children = groups;

            return postData;
        }

        function calcGroupsNamesOnData(data) {
            var groupsNames = [];

            _.forEach(data, function(postVal, postKey){
                if (_.indexOf(postKey, '.') > 0) {
                    var keyArrays = _.words(postKey, /[^.]+/g);
                    if (groupsNames.indexOf(keyArrays[0]) < 0) {
                        groupsNames.push(keyArrays[0]);
                    }
                }
            });

            return groupsNames;
        }

        function calcGroupOnData(data, groupName) {
            var group = {};

            _.forEach(data, function(dataVal, dataKey){
                if (_.startsWith(dataKey, groupName) && dataKey.indexOf('.') > 0) {
                    var keyArrays = _.words(dataKey,  /[^.]+/g);
                    var newKeyArrays = _.slice(keyArrays, 1);
                    var computedKey = newKeyArrays.join('.');
                    group[computedKey] = dataVal;
                }
            });

            return group;
        }

        function openRowForInlineEditing(self, rowBusinuessObjectId, targetCell) {
            self.beforeEditGridData = self.getRowData(rowBusinuessObjectId);

            var $grid = self.get$Grid();

            if (self.previousEditedRowBoId) {
                $grid.jqGrid(JQGRID_FN_RESTORE_ROW, self.previousEditedRowBoId);
            }

            var editOptions = calcRowEditOptions(self, rowBusinuessObjectId);
            $grid.jqGrid(JQGRID_FN_EDIT_ROW, rowBusinuessObjectId, editOptions);
            $("input, select", targetCell).focus();

            self.previousEditedRowBoId = rowBusinuessObjectId;
        }

        function calcRowEditOptions(self, rowBusinuessObjectId) {
            var options = {};

            // Set keys: ENTER - save, ESC - cancel.
            options.keys = true;
            options.focusField = false;
            options.url = self.controllerUrl + '/' + rowBusinuessObjectId;
            options.extraparam = {
                _token: $_token // TODO: from AMD
            };
            options.mtype = 'PUT';

            options.successfunc = function (data) {

                var response = data.responseJSON;

                // Refresh grid data. For child connected columns fo instance.
                self.get$Grid().trigger("reloadGrid");

                // Show success indication. Color of row.
                // params: id, rowData, rowCss.
                self.changedRows = _.union(self.changedRows, [rowBusinuessObjectId]);

                return true; //[true, "", response.item_id];
            };

            options.errorfunc = function (rowId, responseRaw) {
                var errorMessage = processErrorResponse(responseRaw);

                $.jgrid.info_dialog(
                    $.jgrid.errors.errcap,
                    '<div class="ui-state-error">' + errorMessage.html + '</div>',
                    $.jgrid.edit.bClose,
                    {
                        buttonalign: 'right',
                        width: 700
                    });

                return false;
            };

            return options;
        }

        function setLoadingIndicator(self) {
            var loadingIndicator = new LoadingIndicator({
                parentId: self.gridId,
                loadingCompleteEventId: GRID_LOADING_COMPLETE_EVENT_ID,
                loadingStartedEventId: GRID_LOADING_STARTED_EVENT_ID
            });

            loadingIndicator.execute();
        }

        return Class;
    }
)
;

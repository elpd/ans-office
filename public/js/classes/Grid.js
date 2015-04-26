define([
    'classes/AttributesObject',
    'classes/SubRow'
], function (AttributesObject,
             EmptySubRow) {

    var GRID_HEIGHT_MIN = 150;
    var GRID_WIDTH_MIN = 700;
    var FULL_SCREEN_GRID_BOX_CLASS = 'full_screen_grid';
    var GRID_TITLE_BAR_CLASS = 'ui-jqgrid-titlebar';
    var GRID_HEADER_BOX_CLASS = 'ui-jqgrid-hdiv';
    var GRID_BOTTOM_PAGER_CLASS = 'ui-jqgrid-pager.ui-corner-bottom';

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
            required: true
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
        }
    }

    var Class = function (params) {
        AttributesObject.call(this, params, attributesRules);
    };

    Class.prototype = Object.create(AttributesObject.prototype, {
        execute: {
            value: function () {
                var self = this;
                setGridComponent(self);
                setFilterToolbarComponent(self);
                setNavigationComponents(self);
                setGeneralBehavior(self);

                // Make grid resize on first activation.
                $(window).trigger('resize');
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

        redrawGridDimensions: {
            value: function (params) {
                var self = this;
                var desiredGridSize = self.calcDesiredGridSize();

                var isShrinkToFit = params.hasOwnProperty('shrinkToFit') ?
                    params.shrinkToFit : false;
                isShrinkToFit = (desiredGridSize.width <= GRID_WIDTH_MIN) ?
                    true : isShrinkToFit;

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

                self.get$Grid().setGridHeight(gridSize.height + 'px');
                self.get$Grid().setGridWidth(gridSize.width, isShrinkToFit);
            }
        },

        setGridToFullScreen: {
            value: function() {
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
        }

    });

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
            params.subGridRowExpanded = function(subgrid_id, row_id) {

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

        var toolbarSettings = calcNavToolbarSettings(self);
        var editSettings = calcNavEditSettings(self);
        var addSettings = calcNavAddSettings(self);
        var deleteSettings = calcNavDeleteSettings(self);

        $grid.navGrid('#' + self.pagerId,
            toolbarSettings,
            editSettings,
            addSettings,
            deleteSettings
        );

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
            })
            .navButtonAdd('#' + self.pagerId, {
                caption: "Fit",//"Fit To Size",
                position: 'last',
                onClickButton: function () {
                    self.redrawGridDimensions({shrinkToFit: true});
                }
            });

    }

    function calcNavToolbarSettings(self) {
        var settings = {
            edit: false,
            add: true,
            del: true,
            refresh: false,
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

    return Class;
});

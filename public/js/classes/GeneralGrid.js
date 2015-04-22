define([
    'classes/LoadingIndicator',
    'classes/utilities'
], function (LoadingIndicator,
             utilities) {

    var GRID_HEIGHT_MIN = 100;
    var GRID_WIDTH_MIN = 800;

    var Class = function GeneralGrid(params) {
        this.setParams(params);
        this.setVariables();
    };

    Class.prototype = {
        setParams: function (params) {
            this.controllerUrl = params.controllerUrl;
            this.biName = params.biName;
            this.biNamePlural = params.biNamePlural;
            this.colModel = params.colModel;
            this.caption = params.caption;
            this.SubRow = params.SubRow;
            this.onBeforeSubmitData = params.onBeforeSubmitData;
            this.onBeforeAddSubmit = params.onBeforeAddSubmit;
            this.lang = params.lang;
            this.userSettingsGService = params.userSettingsGService;
            this.gridId = params.gridId ? params.gridId : null;
            this.parentLink = params.parentLink ? params.parentLink : {};
            this.colModelExtraFunction = params.colModelExtraFunction ?
                params.colModelExtraFunction : null;
            this.getDesiredHeightInContainer = params.getDesiredHeightInContainer;
            this.getDesiredWidthInContainer = params.getDesiredWidthInContainer;

            if (params.direction) {
                switch (params.direction) {
                    case 'right_to_left':
                        this.direction = 'rtl';
                        break;
                    case 'left_to_right':
                        this.direction = 'ltr';
                        break;
                    default:
                        throw new Error('unexpected value'); // TODO:
                }
            } else {
                this.direction = 'ltr'
            }
        },

        setVariables: function () {
            var self = this;

            if (!this.gridId) {
                this.gridId = this.biNamePlural + '_grid';
            }
            this.gridBoxId = 'gbox_' + this.gridId;
            this.pagerId = this.gridId + '_pager';
            this.dataRowClass = this.biName + 'Data';
            this.pageId = this.biNamePlural + '_page';

            this.pageObject = new PageObject({
                gridBoxId: self.gridBoxId,
                gridId: self.gridId,
                pageId: self.pageId,
                pagerId: self.pagerId,
                getDesiredHeightInContainer: self.getDesiredHeightInContainer,
                getDesiredWidthInContainer: self.getDesiredWidthInContainer
            });
        },

        activate: function () {
            var self = this;
            self.loadingIndicator = new LoadingIndicator(self.gridId);

            self.subRow = new self.SubRow({
                parentControllerUrl: self.controllerUrl,
                lang: self.lang,
                userSettingsGService: self.userSettingsGService
            });

            setGrid(self);
            setNavGrid(self);
            setInlineNav(self);
        }
    };

    function PageObject(params) {
        this.gridBoxId = params.gridBoxId;
        this.gridId = params.gridId;
        this.pageId = params.pageId;
        this.pagerId = params.pagerId;
        this.getDesiredHeightInContainer = params.getDesiredHeightInContainer;
        this.getDesiredWidthInContainer = params.getDesiredWidthInContainer;
    }

    PageObject.prototype = {
        getfullScreenButtonId: function () {
            return this.pagerId + '_fullscr_button';
        },

        get$Page: function () {
            return $('#' + this.pageId);
        },

        get$SectionHeader: function () {
            return $('.section_header');
        },

        get$GridBox: function () {
            return $('#' + this.gridBoxId);
        },

        get$Grid: function () {
            return $('#' + this.gridId);
        },

        get$GridTitleBar: function () {
            return $('.ui-jqgrid-titlebar');
        },

        get$GridHeaderBox: function () {
            return $('.ui-jqgrid-hdiv');
        },

        get$GridBottomPager: function () {
            return $('.ui-jqgrid-pager.ui-corner-bottom');
        },

        redrawGridDimentions: function (params) {
            var self = this;
            var isShrinkToFit = params.hasOwnProperty('shrinkToFit') ? params.shrinkToFit : false;

            var desiredGridSize = self.calcDesiredGridSize();
            var continueRedraw = false;
            // TODO: remove laps. no need after changes made ?
            var laps = 0;
            do {
                self.redrawGridDimentionsPhase(desiredGridSize, isShrinkToFit);

                var oldDesiredGridSize = desiredGridSize;
                desiredGridSize = self.calcDesiredGridSize();

                continueRedraw = false;
                if (!desiredGridSize.equals(oldDesiredGridSize) && laps < 0) {
                    continueRedraw = true;
                }
                laps++;
            } while (continueRedraw);
        },

        calcDesiredGridSize: function () {
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
        },

        redrawGridDimentionsPhase: function (gridSize, isShrinkToFit) {
            var self = this;

            self.get$Grid().setGridHeight(gridSize.height + 'px');
            self.get$Grid().setGridWidth(gridSize.width, isShrinkToFit);
        },

        isGridInFullScreen: function () {
            var self = this;
            var result = self.get$GridBox().hasClass('full_screen_grid');

            return result;
        },

        calcGridHeightWhenFull: function () {
            var self = this;

            var windowHeight = $(window).height();
            var titleBarHeight = self.get$GridTitleBar().outerHeight(true);
            var headerBoxHeight = self.get$GridHeaderBox().outerHeight(true);
            var bottomPagerHeight = self.get$GridBottomPager().outerHeight(true);

            var calc = windowHeight - (titleBarHeight + headerBoxHeight + bottomPagerHeight);

            return calc;
        },

        calcGridWidthWhenFull: function () {
            var windowWidth = ($(window).width());
            var calc = windowWidth;

            return calc;
        },

        calcGridHeightWhenNormal: function () {
            var self = this;

            var desiredHeightInContainer = self.getDesiredHeightInContainer();
            var titleBarHeight = self.get$GridTitleBar().outerHeight(true);
            var headerBoxHeight = self.get$GridHeaderBox().outerHeight(true);
            var bottomPagerHeight = self.get$GridBottomPager().outerHeight(true);

            var calcHeight = desiredHeightInContainer - (titleBarHeight + headerBoxHeight + bottomPagerHeight + 5);
            // Set a minimum for height;
            calcHeight = calcHeight < GRID_HEIGHT_MIN ? GRID_HEIGHT_MIN : calcHeight;

            return calcHeight;
        },

        calcGridWidthWhenNormal: function () {
            var self = this;
            var calc = self.getDesiredWidthInContainer();

            // Set a minimum for height;
            calc = calc < GRID_WIDTH_MIN ? GRID_WIDTH_MIN : calc;

            return calc;
        },

        setGridToFullScreen: function () {
            var self = this;
            var $gridBox = self.get$GridBox();
            var $grid = self.get$Grid();

            $gridBox.addClass('full_screen_grid');

            self.redrawGridDimentions({shrinkToFit: false});
        },

        exitFullScreen: function () {
            var self = this;
            var $gridBox = self.get$GridBox();
            var $grid = self.get$Grid();

            $gridBox.removeClass('full_screen_grid');

            self.redrawGridDimentions({shrinkToFit: false});
        },

        customButtonFullScreen: function () {
            var self = this;
            return new CustomButtonFullScreen({
                id: self.getfullScreenButtonId()
            });
        }
    };

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

    function setGrid(self) {

        var $grid = $("#" + self.gridId);

        $grid.jqGrid({

            colModel: self.colModel,
            viewrecords: true, // show the current page, data rang and total records on the toolbar
            width: 500,
            //width: null,
            shrinkToFit: false,
            height: 200,
            // rowNum - number of rows to display
            // options:
            // - "" : all rows
            rowNum: 1000,
            datatype: 'json',
            url: self.controllerUrl,
            pager: '#' + self.pagerId,
            pagerpos: 'center',
            rowList: [30, 50, 100, 200, 1000],
            caption: self.caption,
            // Direction: instructs the grid to use RTL settings
            direction: self.direction,
            //onSelectRow: editRow,
            ondblClickRow: editRow,
            autowidth: true,
            subGrid: true,
            subGridRowExpanded: self.subRow.show.bind(self.subRow),
            gridComplete: function () {
                self.loadingIndicator.setAsFinished();
            },
            rowattr: function (rowData, currentObj, rowId) {
                return {
                    "class": ["dataRow " + self.dataRowClass]
                };
            },
            serializeRowData: function (postdata) {
                var processedData = postdata;
                if (postdata.oper && postdata.oper == 'edit') {
                    processedData = {};
                    _.forEach(postdata, function (val, key) {
                        if (beforeEditData[key] != val) {
                            processedData[key] = val;
                        }
                    });

                    if (self.onBeforeSubmitData) {
                        processedData = self.onBeforeSubmitData(processedData);
                    }
                }
                return processedData;
            },
            postData: {
                parentLink: self.parentLink,
                colModelExtra: function () {
                    if (self.colModelExtraFunction) {
                        return self.colModelExtraFunction();
                    }

                    return JSON.stringify({});
                }
            },
            loadError: function (xhr, status, error) {
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
            }

            //loadOnce: false
        });

        $grid.jqGrid('filterToolbar', {
            // instruct the grid toolbar to show the search options
            searchOperators: true,
            defaultSearch: 'cn'
        });

        var lastSelection; // TODO: research if needed.
        var beforeEditData;

        function editRow(id, iRow, iCol, e) {
            e.stopPropagation();

            if (id) {
                var grid = $("#" + self.gridId);

                beforeEditData = grid.getRowData(id);

                grid.jqGrid('restoreRow', lastSelection);

                var editOptions = {
                    keys: true,
                    focusField: 4,
                    url: self.controllerUrl + '/' + id.toString(),
                    "extraparam": {
                        _token: $_token
                    },
                    mtype: 'PUT',
                    successfunc: function (data) {

                        var response = data.responseJSON;

                        // debug
                        grid.jqGrid('setRowData', id, null, 'row_successful_update');

                        //$(this).jqGrid("setGridParam", {datatype: 'json'});
                        return true; //[true, "", response.item_id];
                    },
                    errorfunc: function (rowId, responseRaw) {
                        var errorMessage = processErrorResponse(responseRaw);

                        $.jgrid.info_dialog(
                            $.jgrid.errors.errcap,
                            '<div class="ui-state-error">' + errorMessage.html + '</div>',
                            $.jgrid.edit.bClose,
                            {
                                buttonalign: 'right'
                            });

                        return false;
                    }

                };

                grid.jqGrid('editRow', id, editOptions);
                lastSelection = id;
            }
        }

        // Set graphical properties behavior.

        $(window).bind('resize', function () {
            self.pageObject.redrawGridDimentions({});
        }).trigger('resize');

    }

    function setNavGrid(self) {
        var $grid = $('#' + self.gridId);
        $grid.navGrid('#' + self.pagerId,
            // the buttons to appear on the toolbar of the grid
            {
                edit: false,
                add: true,
                del: true,
                refresh: false,
                view: false
            },
            // options for the Edit Dialog
            {},
            // options for the Add Dialog
            {
                height: 'auto',
                width: 620,
                closeAfterAdd: true,
                recreateForm: true,
                reloadAfterSubmit: true,
                url: self.controllerUrl,
                mtype: 'POST',
                editData: {
                    _token: $_token,
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
            },
            // options for the Delete Dailog
            {
                height: 'auto',
                width: 620,
                url: self.controllerUrl + '/-1',
                mtype: 'DELETE',
                delData: {
                    _token: $_token
                },
                reloadAfterSubmit: true
            })
            .navButtonAdd('#' + self.pagerId, {
                caption: "Full",//"Full Screen",
                buttonicon: "ui-icon-arrow-4-diag",
                position: 'last',
                id: self.pageObject.getfullScreenButtonId(),
                onClickButton: function () {
                    if (self.pageObject.isGridInFullScreen()) {
                        self.pageObject.exitFullScreen();
                        self.pageObject.customButtonFullScreen().setAppearanceAsEnterFullScreen();
                    } else {
                        self.pageObject.setGridToFullScreen();
                        self.pageObject.customButtonFullScreen().setAppearanceAsExitFullScreen();
                    }
                }
            })
            .navButtonAdd('#' + self.pagerId, {
                caption: "Fit",//"Fit To Size",
                position: 'last',
                onClickButton: function () {
                    self.pageObject.redrawGridDimentions({shrinkToFit: true});
                }
            });

    }

    function setInlineNav(self) {
        $('#' + self.gridId).inlineNav('#' + self.pagerId, {
            edit: false,
            add: false,
            del: true,
            cancel: true,
            addParams: {
                keys: true
            }
        });
    }

    function setTextContents($elem, text) {
        $elem.contents().filter(function () {
            if (this.nodeType == Node.TEXT_NODE) {
                this.nodeValue = text;
            }
        });
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

    return Class;

});

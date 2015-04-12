define([
    'classes/LoadingIndicator',
    'classes/utilities'
], function (LoadingIndicator,
             utilities) {

    var GRID_HEIGHT_MIN = 200;

    var Class = function GeneralGrid(params) {
        this.controllerUrl = params.controllerUrl;
        this.biName = params.biName;
        this.biNamePlural = params.biNamePlural;
        this.colModel = params.colModel;
        this.caption = params.caption;
        this.SubRow = params.SubRow;
        this.onBeforeSubmitData = params.onBeforeSubmitData;
        this.onBeforeAddSubmit = params.onBeforeAddSubmit;

        if (params.direction) {
            switch (params.direction){
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

        this.setVariables();
    };

    Class.prototype = {
        setVariables: function () {
            this.gridId = this.biNamePlural + '_grid';
            this.pagerId = this.gridId + '_pager';
            this.dataRowClass = this.biName + 'Data';
            this.page_id = this.biNamePlural + '_page';
        },

        activate: function () {
            var self = this;
            self.loadingIndicator = new LoadingIndicator(self.gridId);

            self.subRow = new self.SubRow({
                parentControllerUrl: self.controllerUrl
            });

            setGrid(self);
            setNavGrid(self);
            setInlineNav(self);

            // TODO: code debug
            $('#grid_fullscreen_button').click(function () {
                $('#' + self.page_id).height('100vh');
            });
        }
    };

    function setGrid(self) {

        var $grid = $("#" + self.gridId);

        $grid.jqGrid({

            colModel: self.colModel,
            viewrecords: true, // show the current page, data rang and total records on the toolbar
            width: 780,
            height: 200,
            // rowNum - number of rows to display
            // options:
            // - "" : all rows
            rowNum: 1000,
            datatype: 'json',
            url: self.controllerUrl,
            pager: '#' + self.pagerId,
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
            }

            //loadOnce: false
        });

        var lastSelection;
        var beforeEditData;

        function editRow(id) {
            if (id && id !== lastSelection) {
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
                        if (!response.success) {
                            var errorsArray = utilities.errorsObjectToArray(
                                response.errors);
                            if (errorsArray.length) {
                                var errorText = errorsArray[0]; //$.parseJSON(res.responseText).Message;
                                $.jgrid.info_dialog($.jgrid.errors.errcap,
                                    '<div class="ui-state-error">' + errorText + '</div>',
                                    $.jgrid.edit.bClose,
                                    {buttonalign: 'right'});

                                return false; // [false, errorsArray];
                            }
                        }
                        //$(this).jqGrid("setGridParam", {datatype: 'json'});
                        return true; //[true, "", response.item_id];
                    }

                };

                grid.jqGrid('editRow', id, editOptions);
                lastSelection = id;
            }
        }

        // Set graphical properties behavior.

        $(window).bind('resize', function () {
            var pageHeight = $('#' + self.page_id).height();
            var headerHeight = $('.section_header').height();

            var calculatedHeight = pageHeight - headerHeight - 105;
            // Set a minimum for height;
            calculatedHeight = calculatedHeight < GRID_HEIGHT_MIN ? GRID_HEIGHT_MIN : calculatedHeight;
            var calculatedHeightStr = calculatedHeight + 'px';

            $grid.setGridHeight(calculatedHeightStr);
        }).trigger('resize');

    }

    function setNavGrid(self) {
        $('#' + self.gridId).navGrid('#' + self.pagerId,
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
                    _token: $_token
                },
                afterSubmit: function (data, postdata, oper) {
                    var response = data.responseJSON;
                    if (!response.success) {
                        var errorsArray = utilities.errorsObjectToArray(
                            response.errors);
                        if (errorsArray.length) {
                            return [false, errorsArray];
                        }
                    }
                    //$(this).jqGrid("setGridParam", {datatype: 'json'});
                    return [true, "", response.item_id];
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
            }
        );
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

    return Class;

});

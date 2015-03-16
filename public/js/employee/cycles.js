define([
    'classes/utilities',
    'classes/bi/Cycle',
    'employee/cycles.SubRow'
  ],
  function(
    utilities,
    Cycle,
    SubRow
  ) {

    $(document).ready(function() {
      var cycleControllerUrl = "/api/cycle";
      var subRow = new SubRow({
        parentControllerUrl: cycleControllerUrl
      });

      $("#jqGrid").jqGrid({

        colModel: [{
          label: 'ID',
          name: 'id',
          width: 30,
          key: true
        }, {
          label: 'Start Date',
          name: 'startDate',
          editable: true,
          //edittype: 'select',
          formatter: 'date',
          editoptions: {
            // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
            // use it to place a third party control to customize the toolbar
            dataInit: function(element) {
              $(element).datepicker({
                id: 'orderDate_datePicker',
                dateFormat: 'yy-mm-dd',
                //minDate: new Date(2010, 0, 1),
                maxDate: new Date(2020, 0, 1),
                showOn: 'focus'
              });
            }
          }
        }, {
          label: 'Num',
          name: 'num',
          editable: true,
          //edittype: 'select',
          formatter: 'integer',
          editoptions: {

          }
        }],

        viewrecords: true, // show the current page, data rang and total records on the toolbar
        width: 780,
        height: 200,
        rowNum: 15,
        datatype: 'json',
        url: cycleControllerUrl,
        pager: "#jqGridPager",
        caption: "Cycles",
        //onSelectRow: editRow,
        ondblClickRow: editRow,
        autowidth: true,
        subGrid: true,
        subGridRowExpanded: subRow.show.bind(subRow),
        gridComplete: function() {
          $('#loading_indicator').append(
            '<div id="loading_indicator_finished"></div>');
        },
        rowattr: function(rowData, currentObj, rowId) {
            return {
              "class": ["dataRow cycleData"]
            };
          }
          //loadOnce: false
      });

      $('#jqGrid').navGrid("#jqGridPager",
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
          url: cycleControllerUrl,
          mtype: 'POST',
          editData: {
            _token: $_token
          },
          afterSubmit: function(data, postdata, oper) {
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
          }
        },
        // options for the Delete Dailog
        {
          height: 'auto',
          width: 620,
          url: cycleControllerUrl + '/-1',
          mtype: 'DELETE',
          delData: {
            _token: $_token
          },
          reloadAfterSubmit: true
        }
      );
      $('#jqGrid').inlineNav('#jqGridPager', {
        edit: false,
        add: false,
        del: true,
        cancel: true,
        addParams: {
          keys: true
        }
      });

      var lastSelection;

      function editRow(id) {
        if (id && id !== lastSelection) {
          var grid = $("#jqGrid");
          grid.jqGrid('restoreRow', lastSelection);

          var editOptions = {
            keys: true,
            focusField: 4,
            url: cycleControllerUrl + id.toString(),
            "extraparam": {
              _token: $_token
            },
            mtype: 'PUT'
          };

          grid.jqGrid('editRow', id, editOptions);
          lastSelection = id;
        }
      }
    });
  });

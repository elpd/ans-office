define([
    'classes/utilities',
    'classes/bi/Cycle',
    'classes/bi/GroupStatus'
  ],
  function(
    utilities,
    Cycle,
    GroupStatus
  ) {

    $(document).ready(function() {
      var cycleControllerUrl = "/api/cycle";

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
        subGridRowExpanded: showChildGrid,
        gridComplete: function(){
          $('#loading_indicator').append('<div id="loading_indicator_finished"></div>');
        },
        rowattr: function(rowData, currentObj, rowId){
          return {"class": "dataRow"};
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

      // the event handler on expanding parent row receives two parameters
      // the ID of the grid row  and the primary key of the row
      function showChildGrid(parentRowID, parentRowKey) {
        var childGridID = parentRowID + "_table";
        var childGridPagerID = parentRowID + "_pager";

        // send the parent row primary key to the server so that we know which
        // grid to show
        //var childGridURL = parentRowKey + ".json";
        //childGridURL = childGridURL + "&parentRowID=" +
        // encodeURIComponent(parentRowKey)
        var childGridURL = cycleControllerUrl + '/' + parentRowKey +
          '/groups';

        // add a table and pager HTML elements to the parent grid row -
        // we will render the child grid here
        $('#' + parentRowID).append(
          '<table id=' + childGridID +
          '></table>' +
          '<div id=' + childGridPagerID +
          ' class=scroll></div>');

        $("#" + childGridID).jqGrid({
          url: childGridURL,
          mtype: "GET",
          datatype: "json",
          page: 1,
          colModel: [{
            label: 'ID',
            name: 'id',
            key: true,
            width: 75
          }, {
            label: 'Cycle',
            name: 'cycle_id',
            width: 100,
            edittype: 'select',
            formatter: 'select',
            editoptions: {
              value: utilities.generateGetItems('/api/cycle', Cycle)(),
              dataUrl: '/api/cycle',
              buildSelect: utilities.generateBuildSelect(Cycle)
            }
          }, {
            label: 'Name',
            name: 'name',
            width: 100
          }, {
            label: 'Statue',
            name: 'status_id',
            width: 75,
            edittype: 'select',
            formatter: 'select',
            editoptions: {
              value: utilities.generateGetItems('/api/group-status', GroupStatus)(),
              dataUrl: '/api/group-status',
              buildSelect: utilities.generateBuildSelect(GroupStatus)
            }
          }],
          loadonce: true,
          width: 500,
          height: '100%',
          pager: "#" + childGridPagerID
        });

      }

    });
  });

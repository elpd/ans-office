define([
    'classes/utilities',
  ],
  function(
    utilities
  ) {

    $(document).ready(function() {
      $("#jqGrid").jqGrid({

        colModel: [{
          label: 'ID',
          name: 'id',
          width: 30
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
        url: "/api/cycle",
        pager: "#jqGridPager",
        caption: "Cycles",
        //onSelectRow: editRow,
        ondblClickRow: editRow,
        autowidth: true,
        subGrid: true,
        subGridRowExpanded: showChildGrid
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
          url: '/api/cycle/',
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
          url: '/api/cycle/-1',
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
            url: '/api/cycle/' + id.toString(),
            "extraparam": {
              _token: $_token
            },
            mtype: 'PUT'
          };

          grid.jqGrid('editRow', id, editOptions);
          lastSelection = id;
        }
      };

      function formatLink(cellValue, options, rowObject) {
        return "<a href='" + cellValue + "'>" + cellValue.substring(0,
          25) + "..." + "</a>";
      };

      function generateGetItems(apiUrl, BiClass) {
        function getItems() {
          var items = {
            '0': '' // Represent null
          };

          $.ajax({
            url: apiUrl,
            async: false,
            success: function(results) {
              results.items.forEach(function(element) {
                var bi = new BiClass(element);
                items[element.id.toString()] = bi.toString();
              });
            }
          });

          return items;
        };

        return getItems;
      };

      function generateBuildSelect(BusinessClass) {

        function buildSelect(result) {
          var resultAsObject = JSON.parse(result);
          var html = '<select>';
          // Add empty item for null representation.
          html += "<option value=''></option>";

          resultAsObject.items.forEach(function(element) {
            var bi = new BusinessClass(element);
            html = html + bi.toSelectOption();
          });
          html = html + '</select>';

          return html;
        };

        return buildSelect;
      };

      // the event handler on expanding parent row receives two parameters
      // the ID of the grid tow  and the primary key of the row
      function showChildGrid(parentRowID, parentRowKey) {
        var childGridID = parentRowID + "_table";
        var childGridPagerID = parentRowID + "_pager";

        // send the parent row primary key to the server so that we know which
        // grid to show
        var childGridURL = parentRowKey + ".json";
        //childGridURL = childGridURL + "&parentRowID=" +
        // encodeURIComponent(parentRowKey)

        // add a table and pager HTML elements to the parent grid row -
        // we will render the child grid here
        $('#' + parentRowID).append('<table id=' + childGridID +
          '></table><div id=' + childGridPagerID +
          ' class=scroll></div>');

        $("#" + childGridID).jqGrid({
          url: childGridURL,
          mtype: "GET",
          datatype: "json",
          page: 1,
          colModel: [{
            label: 'Order ID',
            name: 'OrderID',
            key: true,
            width: 75
          }, {
            label: 'Required Date',
            name: 'RequiredDate',
            width: 100
          }, {
            label: 'Ship Name',
            name: 'ShipName',
            width: 100
          }, {
            label: 'Ship City',
            name: 'ShipCity',
            width: 100
          }, {
            label: 'Freight',
            name: 'Freight',
            width: 75
          }],
          loadonce: true,
          width: 500,
          height: '100%',
          pager: "#" + childGridPagerID
        });

      }

    });
  });

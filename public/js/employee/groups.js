define([
    'classes/utilities',
    'classes/bi/Group',
    'classes/bi/Cycle',
    'classes/bi/GroupStatus'
  ],
  function(
    utilities,
    Group,
    Cycle,
    GroupStatus
  ) {

    $(document).ready(function() {
      var mainBi = {
          controllerUrl: "/api/group",
          asCapitalPlural: function() {
            return 'Groups';
          }
      };

      $("#jqGrid").jqGrid({

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
          width: 100,
          editable: true,
          //edittype: 'select',
          //formatter: 'integer',
          editoptions: {

          }
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

        viewrecords: true, // show the current page, data rang and total records on the toolbar
        width: 780,
        height: 200,
        rowNum: 15,
        datatype: 'json',
        url: mainBi.controllerUrl,
        pager: "#jqGridPager",
        caption: mainBi.asCapitalPlural(),
        //onSelectRow: editRow,
        ondblClickRow: editRow,
        autowidth: true//,
        //subGrid: true,
        //subGridRowExpanded: showChildGrid
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
          url: mainBi.controllerUrl,
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
          url: mainBi.controllerUrl + '/-1',
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
            url: mainBi.controllerUrl + '/' + id.toString(),
            "extraparam": {
              _token: $_token
            },
            mtype: 'PUT'
          };

          grid.jqGrid('editRow', id, editOptions);
          lastSelection = id;
        }
      };
    });
  });

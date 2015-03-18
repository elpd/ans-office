define([
    'classes/utilities',
    'classes/bi/User',
    'admin/users.SubRow',
    'services/language',
    'classes/LoadingIndicator',
  ],
  function(
    utilities,
    Cycle,
    SubRow,
    lang,
    LoadingIndicator
  ) {
    var CONTROLLER_URL = "/api/user";
    var GRID_ID = 'users_grid';
    var PAGER_ID = GRID_ID + '_pager';
    var DATA_ROW_CLASS = 'userData';

    $(document).ready(function() {

      var loadingIndicator = new LoadingIndicator(GRID_ID);

      var subRow = new SubRow({
        parentControllerUrl: CONTROLLER_URL
      });

      $("#" + GRID_ID).jqGrid({

        colModel: [{
          label: lang.getFor('main.id'),
          name: 'id',
          width: 30,
          key: true
        }, {
          label: lang.getFor('main.name'),
          name: 'name',
          editable: true,
          //edittype: 'select',
          //formatter: 'integer',
          editoptions: {

          }
        }, {
          label: lang.getFor('main.email'),
          name: 'email',
          editable: true,
          //edittype: 'select',
          //formatter: 'integer',
          editoptions: {

          }
        }],

        viewrecords: true, // show the current page, data rang and total records on the toolbar
        width: 780,
        height: 200,
        rowNum: 15,
        datatype: 'json',
        url: CONTROLLER_URL,
        pager: '#' + PAGER_ID,
        caption: lang.getFor('main.cycles'),
        //onSelectRow: editRow,
        ondblClickRow: editRow,
        autowidth: true,
        subGrid: true,
        subGridRowExpanded: subRow.show.bind(subRow),
        gridComplete: function() {
          loadingIndicator.setAsFinished();
        },
        rowattr: function(rowData, currentObj, rowId) {
            return {
              "class": ["dataRow " + DATA_ROW_CLASS]
            };
          }
          //loadOnce: false
      });

      $('#' + GRID_ID).navGrid('#' + PAGER_ID,
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
          url: CONTROLLER_URL,
          mtype: 'POST',
          editData: {
            _token: $_token,
            password: 'default password'
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
          url: CONTROLLER_URL + '/-1',
          mtype: 'DELETE',
          delData: {
            _token: $_token
          },
          reloadAfterSubmit: true
        }
      );

      $('#' + GRID_ID).inlineNav('#' + PAGER_ID, {
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
          var grid = $("#" + GRID_ID);
          grid.jqGrid('restoreRow', lastSelection);

          var editOptions = {
            keys: true,
            focusField: 4,
            url: CONTROLLER_URL + '/' + id.toString(),
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

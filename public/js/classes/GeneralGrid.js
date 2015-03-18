define([
  'classes/LoadingIndicator',
], function(
  LoadingIndicator
) {

  var Class = function GeneralGrid(params) {
    this.controllerUrl = params.controllerUrl;
    this.biName = params.biName;
    this.biNamePlural = params.biNamePlural;
    this.colModel = params.colModel;
    this.caption = params.caption;
    this.SubRow= params.SubRow;
    this.setVariables();
  };

  Class.prototype = {
    setVariables: function() {
      this.gridId = this.biNamePlural + '_grid';
      this.pagerId = this.gridId + '_pager';
      this.dataRowClass = this.biName + 'Data';
    },

    activate: function() {
      var self = this;
      self.loadingIndicator = new LoadingIndicator(self.gridId);

      self.subRow = new self.SubRow({
        parentControllerUrl: self.controllerUrl
      });

      setGrid(self);
      setNavGrid(self);
      setInlineNav(self);
    }
  };

  function setGrid(self) {

    $("#" + self.gridId).jqGrid({

      colModel: self.colModel,
      viewrecords: true, // show the current page, data rang and total records on the toolbar
      width: 780,
      height: 200,
      rowNum: 15,
      datatype: 'json',
      url: self.controllerUrl,
      pager: '#' + self.pagerId,
      caption: self.caption,
      //onSelectRow: editRow,
      ondblClickRow: editRow,
      autowidth: true,
      subGrid: true,
      subGridRowExpanded: self.subRow.show.bind(self.subRow),
      gridComplete: function() {
        self.loadingIndicator.setAsFinished();
      },
      rowattr: function(rowData, currentObj, rowId) {
          return {
            "class": ["dataRow " + self.dataRowClass]
          };
        }
        //loadOnce: false
    });

    var lastSelection;

    function editRow(id) {
      if (id && id !== lastSelection) {
        var grid = $("#" + self.gridId);
        grid.jqGrid('restoreRow', lastSelection);

        var editOptions = {
          keys: true,
          focusField: 4,
          url: self.controllerUrl + '/' + id.toString(),
          "extraparam": {
            _token: $_token
          },
          mtype: 'PUT'
        };

        grid.jqGrid('editRow', id, editOptions);
        lastSelection = id;
      }
    }
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

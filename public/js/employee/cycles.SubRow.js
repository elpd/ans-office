define([
    'classes/utilities',
    'classes/bi/GroupStatus'
  ],
  function(
    utilities,
    GroupStatus
  ) {

    var Class = function SubRow(params) {
      this.parentControllerUrl = params.parentControllerUrl;
    };

    Class.prototype = {
      // the event handler on expanding parent row receives two parameters
      // the ID of the grid row  and the primary key of the row
      show: function(parentRowID, parentRowKey) {
        var self = this;
        var childGridID = parentRowID + "_table";
        var childGridPagerID = parentRowID + "_pager";

        // send the parent row primary key to the server so that we know which
        // grid to show
        //var childGridURL = parentRowKey + ".json";
        //childGridURL = childGridURL + "&parentRowID=" +
        // encodeURIComponent(parentRowKey)
        var childGridURL = self.parentControllerUrl + '/' + parentRowKey +
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
            },
            /*{
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
      },*/
            {
              label: 'Name',
              name: 'name',
              width: 100,
              editable: true,
              //edittype: 'select',
              //formatter: 'text',
              editoptions: {

              }
            }, {
              label: 'Statue',
              name: 'status_id',
              width: 75,
              editable: true,
              edittype: 'select',
              formatter: 'select',
              editoptions: {
                value: utilities.generateGetItems(
                  '/api/group-status', GroupStatus)(),
                dataUrl: '/api/group-status',
                buildSelect: utilities.generateBuildSelect(
                  GroupStatus)
              }
            }
          ],
          loadonce: true,
          width: 500,
          height: '100%',
          pager: "#" + childGridPagerID
        });

        $('#' + childGridID).navGrid('#' + childGridPagerID,
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
            url: childGridURL,
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
            url: childGridURL + '/-1',
            mtype: 'DELETE',
            delData: {
              _token: $_token
            },
            reloadAfterSubmit: true
          }
        );

        $('#' + childGridID).inlineNav('#' + childGridPagerID, {
          edit: false,
          add: false,
          del: true,
          cancel: true,
          addParams: {
            keys: true
          }
        });
      }
    };

    return Class;
  });

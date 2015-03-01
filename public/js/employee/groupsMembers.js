define([
    'classes/utilities',
    'classes/bi/GroupMembersStatus',
    'classes/bi/Guide',
    'classes/bi/Contact',
    'classes/bi/Group'
  ],
  function(
    utilities,
    GroupMembersStatus,
    Guide,
    Contact,
    Group
  ) {

    $(document).ready(function() {
      $("#jqGrid").jqGrid({
        colModel: [{
          label: 'ID',
          name: 'id',
          width: 30
        }, {
          label: 'Group',
          name: 'group_id',
          editable: true,
          edittype: 'select',
          formatter: 'select',
          editoptions: {
            value: generateGetItems('/api/group', Group)(),
            dataUrl: '/api/group',
            buildSelect: generateBuildSelect(Group)
          }
          //width: 80
        }, {
          label: 'Contact',
          name: 'contact_id',
          editable: true,
          edittype: 'select',
          formatter: 'select',
          editoptions: {
            value: generateGetItems('/api/contact', Contact)(),
            dataUrl: '/api/contact',
            buildSelect: generateBuildSelect(Contact)
          }
        }, {
          label: 'Status',
          name: 'status_id',
          editable: true,
          edittype: 'select',
          formatter: 'select',
          editoptions: {
            value: generateGetItems('/api/group-members-status',
              GroupMembersStatus)(),
            dataUrl: '/api/group-members-status',
            buildSelect: generateBuildSelect(GroupMembersStatus)
          }
        }, {
          label: 'Guide 1',
          name: 'guide_id_1',
          editable: true,
          edittype: 'select',
          formatter: 'select',
          editoptions: {
            value: generateGetItems('/api/guide', Guide)(),
            dataUrl: '/api/guide',
            buildSelect: generateBuildSelect(Guide)
          }
        }, {
          label: 'Guide 2',
          name: 'guide_id_2',
          editable: true,
          edittype: 'select',
          formatter: 'select',
          editoptions: {
            value: generateGetItems('/api/guide', Guide)(),
            dataUrl: '/api/guide',
            buildSelect: generateBuildSelect(Guide)
          }
        }],

        viewrecords: true, // show the current page, data rang and total records on the toolbar
        width: 780,
        height: 200,
        rowNum: 15,
        datatype: 'json',
        url: "/api/groups-members",
        pager: "#jqGridPager",
        caption: "Groups Members",
        onSelectRow: editRow//,
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
          url: '/api/groups-members/',
          mtype: 'POST',
          editData: {
            _token: $_token
          },
          afterSubmit : function( data, postdata, oper) {
            var response = data.responseJSON;
            if (!response.success) {
              var errorsArray = utilities.errorsObjectToArray(response.errors);
              if(errorsArray.length) {
                return [false,errorsArray];
              }
            }
            $(this).jqGrid("setGridParam", {datatype: 'json'});
            return [true,"",response.item_id];
          }
        },
        // options for the Delete Dailog
        {
          height: 'auto',
          width: 620,
          url: '/api/groups-members/-1',
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

      //fetchGridData();

      var lastSelection;

      function editRow(id) {
        if (id && id !== lastSelection) {
          var grid = $("#jqGrid");
          grid.jqGrid('restoreRow', lastSelection);

          var editOptions = {
            keys: true,
            focusField: 4,
            url: '/api/groups-members/' + id.toString(),
            "extraparam": {
              _token: $_token
            },
            mtype: 'PUT'
          };

          grid.jqGrid('editRow', id, editOptions);
          lastSelection = id;
        }
      };

      function fetchGridData() {

        var gridArrayData = [];
        // show loading message
        $("#jqGrid")[0].grid.beginReq();
        $.ajax({
          url: "/api/groups-members",
          success: function(result) {
            for (var i = 0; i < result.rows.length; i++) {
              var item = result.rows[i];
              gridArrayData.push(item.cell);
            }
            // set the new data
            $("#jqGrid").jqGrid('setGridParam', {
              data: gridArrayData
            });
            // hide the show message
            $("#jqGrid")[0].grid.endReq();
            // refresh the grid
            $("#jqGrid").trigger('reloadGrid');
          }
        });
      }

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

    });
  });

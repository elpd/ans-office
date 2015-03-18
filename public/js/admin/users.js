define([
    'classes/utilities',
    'classes/bi/User',
    'admin/users.SubRow',
    'services/language',
    'classes/LoadingIndicator',
    'classes/GeneralGrid',
  ],
  function(
    utilities,
    Cycle,
    SubRow,
    lang,
    LoadingIndicator,
    GeneralGrid
  ) {
    var CONTROLLER_URL = "/api/user";
    var GRID_ID = 'users_grid';
    var PAGER_ID = GRID_ID + '_pager';
    var DATA_ROW_CLASS = 'userData';

    $(document).ready(function() {

      var grid = new GeneralGrid({
        controllerUrl: CONTROLLER_URL,
        biName: 'user',
        biNamePlural: 'users',
        caption: lang.getFor('main.cycles'),
        SubRow: SubRow,
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
        }]
      });
      
      grid.activate();
    });
  });

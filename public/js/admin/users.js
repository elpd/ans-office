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
    User,
    SubRow,
    lang,
    LoadingIndicator,
    GeneralGrid
  ) {

    $(document).ready(function() {

      var grid = new GeneralGrid({
        controllerUrl: '/api/user',
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
define([
    'classes/utilities',
    'classes/bi/Permission',
    'admin/permissions.SubRow',
    'services/language',
    'classes/LoadingIndicator',
    'classes/GeneralGrid',
  ],
  function(
    utilities,
    Permission,
    SubRow,
    lang,
    LoadingIndicator,
    GeneralGrid
  ) {

    $(document).ready(function() {

      var grid = new GeneralGrid({
        controllerUrl: '/api/permission',
        biName: 'permission',
        biNamePlural: 'permissions',
        caption: lang.getFor('main.Permissions'),
        SubRow: SubRow,
        colModel: [{
          label: lang.getFor('main.Id'),
          name: 'id',
          width: 30,
          key: true
        }, {
          label: lang.getFor('main.Name'),
          name: 'name',
          editable: true,
          //edittype: 'select',
          //formatter: 'integer',
          editoptions: {

          }
        }, {
          label: lang.getFor('main.Slug'),
          name: 'slug',
          editable: true,
          //edittype: 'select',
          //formatter: 'integer',
          editoptions: {

          }
        }, {
          label: lang.getFor('main.Description'),
          name: 'description',
          editable: true,
          //edittype: 'select',
          //formatter: 'integer',
          editoptions: {

          }
        }, {
          label: lang.getFor('main.Model'),
          name: 'model',
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

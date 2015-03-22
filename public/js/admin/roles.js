define([
    'classes/utilities',
    'classes/bi/Role',
    'admin/roles.SubRow',
    'services/language',
    'classes/LoadingIndicator',
    'classes/GeneralGrid',
  ],
  function(
    utilities,
    Role,
    SubRow,
    lang,
    LoadingIndicator,
    GeneralGrid
  ) {

    $(document).ready(function() {

      var grid = new GeneralGrid({
        controllerUrl: '/api/role',
        biName: 'role',
        biNamePlural: 'roles',
        caption: lang.getFor('main.Roles'),
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
            label: lang.getFor('main.Level'),
            name: 'level',
            editable: true,
            //edittype: 'select',
            formatter: 'integer',
            editoptions: {

            }
        }]
      });

      grid.activate();
    });
  });

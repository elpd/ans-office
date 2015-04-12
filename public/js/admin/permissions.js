define([
        'classes/utilities',
        'classes/bi/Permission',
        'admin/permissions.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings'
    ],
    function (utilities,
              Permission,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid,
              userSettingsGService) {

        $(document).ready(function () {

            userSettingsGService.load().then(function () {

                var grid = new GeneralGrid({
                    controllerUrl: '/api/permission',
                    biName: 'permission',
                    biNamePlural: 'permissions',
                    caption: lang.get('bo.Permissions'),
                    SubRow: SubRow,
                    direction: userSettingsGService.getLanguage().direction,
                    colModel: [{
                        label: lang.get('bo.id'),
                        name: 'id',
                        width: 30,
                        key: true
                    }, {
                        label: lang.get('bo.permission_name'),
                        name: 'name',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {}
                    }, {
                        label: lang.get('bo.permission_slug'),
                        name: 'slug',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {}
                    }, {
                        label: lang.get('bo.permission_description'),
                        name: 'description',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {}
                    }, {
                        label: lang.get('bo.permission_model'),
                        name: 'model',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {}
                    }]
                });

                grid.activate();
            });
        });
    });

define([
        'classes/utilities',
        'classes/bi/Role',
        'admin/roles.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings'
    ],
    function (utilities,
              Role,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid,
              userSettingsGService) {

        $(document).ready(function () {

            userSettingsGService.load().then(function () {

                var grid = new GeneralGrid({
                    // Services
                    lang: lang,
                    userSettingsGService: userSettingsGService,

                    //
                    controllerUrl: '/api/role',
                    biName: 'role',
                    biNamePlural: 'roles',
                    caption: lang.get('bo.roles'),
                    SubRow: SubRow,
                    direction: userSettingsGService.getLanguage().direction,
                    colModel: [{
                        label: lang.get('bo.id'),
                        name: 'id',
                        width: 30,
                        key: true
                    }, {
                        label: lang.get('bo.role_name'),
                        name: 'name',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {}
                    }, {
                        label: lang.get('bo.role_slug'),
                        name: 'slug',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {}
                    }, {
                        label: lang.get('bo.role_description'),
                        name: 'description',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {}
                    }, {
                        label: lang.get('bo.role_level'),
                        name: 'level',
                        editable: true,
                        //edittype: 'select',
                        formatter: 'integer',
                        editoptions: {}
                    }]
                });

                grid.activate();
            });
        });
    });

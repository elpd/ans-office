define([
        'classes/utilities',
        'classes/bi/Permission',
        'admin/permissions.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings',
        'classes/GeneralContentPageObject'
    ],
    function (utilities,
              Permission,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid,
              userSettingsGService,
              GeneralContentPageObject) {

        $(document).ready(function () {

            var page = new GeneralContentPageObject({
                name: 'permissions'
            });

            userSettingsGService.load().then(function () {

                var grid = new GeneralGrid({
                    getDesiredHeightInContainer: function(){
                        return page.getGridDesiredHeight();
                    },
                    getDesiredWidthInContainer: function() {
                        return page.getGridDesiredWidth();
                    },
                    // Services
                    lang: lang,
                    userSettingsGService: userSettingsGService,

                    //
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

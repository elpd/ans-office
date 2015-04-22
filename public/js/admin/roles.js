define([
        'classes/utilities',
        'classes/bi/Role',
        'admin/roles.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings',
        'classes/GeneralContentPageObject'
    ],
    function (utilities,
              Role,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid,
              userSettingsGService,
              GeneralContentPageObject) {

        $(document).ready(function () {

            var page = new GeneralContentPageObject({
                name: 'roles'
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
                    controllerUrl: '/api/role',
                    biName: 'role',
                    biNamePlural: 'roles',
                    caption: _.capitalize(lang.get('bo.roles')),
                    SubRow: SubRow,
                    direction: userSettingsGService.getLanguage().direction,
                    colModel: [{
                        label: _.capitalize(lang.get('bo.id')),
                        name: 'id',
                        width: 30,
                        key: true
                    }, {
                        label: _.capitalize(lang.get('bo.role_name')),
                        name: 'name',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {}
                    }, {
                        label: _.capitalize(lang.get('bo.role_slug')),
                        name: 'slug',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {}
                    }, {
                        label: _.capitalize(lang.get('bo.role_description')),
                        name: 'description',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {}
                    }, {
                        label: _.capitalize(lang.get('bo.role_level')),
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

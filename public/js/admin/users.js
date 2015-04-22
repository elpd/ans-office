define([
        'classes/utilities',
        'classes/bi/User',
        'admin/users.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings',
        'classes/GeneralContentPageObject'
    ],
    function (utilities,
              User,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid,
              userSettingsGService,
              GeneralContentPageObject) {

        $(document).ready(function () {

            var page = new GeneralContentPageObject({
                name: 'users'
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
                    controllerUrl: '/api/user',
                    biName: 'user',
                    biNamePlural: 'users',
                    caption: lang.get('bo.Users'),
                    SubRow: SubRow,
                    direction: userSettingsGService.getLanguage().direction,
                    colModel: [{
                        label: lang.get('bo.id'),
                        name: 'id',
                        width: 30,
                        key: true
                    }, {
                        label: lang.get('bo.user_name'),
                        name: 'name',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {}
                    }, {
                        label: lang.get('bo.user_email'),
                        name: 'email',
                        editable: true,
                        //edittype: 'select',
                        //formatter: 'integer',
                        editoptions: {},
                        editrules: {
                            required: true,
                            email: true
                        }
                    }, {
                        label: lang.get('bo.user_password'),
                        name: 'password',
                        editable: true,
                        //hidden: true,
                        edittype: 'password',
                        editoptions: {},
                        editrules: {
                            edithidden: true,
                            required: true
                        }
                    }, {
                        label: lang.get('bo.user_password_confirmation'),
                        name: 'password_confirmation',
                        editable: true,
                        //hidden: true,
                        edittype: 'password',
                        editrules: {
                            edithidden: true, required: true
                        }
                    },
                    ]
                });

                grid.activate();
            });
        });
    });

define([
        'classes/utilities',
        'classes/bi/User',
        'admin/users.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings'
    ],
    function (utilities,
              User,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid,
              userSettingsGService
              ) {

        $(document).ready(function () {

            userSettingsGService.load().then(function () {

                var grid = new GeneralGrid({
                    controllerUrl: '/api/user',
                    biName: 'user',
                    biNamePlural: 'users',
                    caption: lang.get('bo.Users'),
                    SubRow: SubRow,
                    direction: userSettingsGService.getLanguage().direction,
                    onBeforeSubmitData: function (data) {
                        if (data.password) {
                            data.password_confirmation = data.password; // TODO: make user input confirmation.
                        }

                        return data;
                    },
                    onBeforeAddSubmit: function (postdata, returnData) {
                        // TODO: add password confirmation to form for user.
                        if (postdata.password) {
                            postdata.password_confirmation = postdata.password;
                        }
                    },
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
                        editoptions: {}
                    }, {
                        label: lang.get('bo.user_password'),
                        name: 'password',
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

define([
        'classes/utilities',
        'classes/bi/User',
        'admin/users.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
    ],
    function (utilities,
              User,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid) {

        $(document).ready(function () {

            var grid = new GeneralGrid({
                controllerUrl: '/api/user',
                biName: 'user',
                biNamePlural: 'users',
                caption: lang.getFor('main.cycles'),
                SubRow: SubRow,
                onBeforeSubmitData: function(data){
                    if (data.password) {
                        data.password_confirmation = data.password; // TODO: make user input confirmation.
                    }

                    return data;
                },
                onBeforeAddSubmit: function(postdata, returnData) {
                    // TODO: add password confirmation to form for user.
                    if (postdata.password) {
                        postdata.password_confirmation = postdata.password;
                    }
                },
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
                    editoptions: {}
                }, {
                    label: lang.getFor('main.Email'),
                    name: 'email',
                    editable: true,
                    //edittype: 'select',
                    //formatter: 'integer',
                    editoptions: {}
                }, {
                    label: lang.getFor('main.Password'),
                    name: 'password',
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

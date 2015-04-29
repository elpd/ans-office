define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/GridPage',
        'classes/grids/PermissionGrid',
        'services/language',
        'services/userSettings'
    ],
    function (require,
              _,
              utilities,
              GridPage,
              PermissinGrid,
              lang,
              userSettingsService) {

        $(document).ready(function () {

            userSettingsService.ready().then(function () {

                    var page = new GridPage({
                        mainId: 'permissions_page',
                        Grid: require('classes/grids/PermissionGrid'),
                        direction: userSettingsService.getLanguage().direction,
                        headerTitle: _.capitalize(lang.get('bo.permissions')),
                        beforeGridExecution: function (grid) {

                        },
                        afterGridExecution: function (grid) {

                        }
                    });

                    page.execute();
                }
            );

        });
    });

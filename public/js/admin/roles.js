define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/GridPage',
        'classes/grids/RoleGrid',
        'services/language',
        'services/userSettings'
    ],
    function (require,
              _,
              utilities,
              GridPage,
              RoleGrid,
              lang,
              userSettingsService) {

        $(document).ready(function () {

            userSettingsService.ready().then(function () {

                    var page = new GridPage({
                        mainId: 'roles_page',
                        Grid: require('classes/grids/RoleGrid'),
                        direction: userSettingsService.getLanguage().direction,
                        headerTitle: _.capitalize(lang.get('bo.roles')),
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

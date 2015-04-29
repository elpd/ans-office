define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/GridPage',
        'classes/grids/GroupGrid',
        'services/language',
        'services/userSettings'
    ],
    function (require,
              _,
              utilities,
              GridPage,
              GroupGrid,
              lang,
              userSettingsService) {

        $(document).ready(function () {

            userSettingsService.ready().then(function () {

                    var page = new GridPage({
                        mainId: 'groups_page',
                        Grid: require('classes/grids/GroupGrid'),
                        direction: userSettingsService.getLanguage().direction,
                        headerTitle: _.capitalize(lang.get('bo.groups')),
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



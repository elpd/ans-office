define([
        'lodash',
        'classes/utilities',
        'classes/GridPage',
        'classes/grids/ContactGrid',
        'classes/grids/Etgar22Grid',
        'services/language',
        'services/userSettings'
    ],
    function (_,
              utilities,
              GridPage,
              ContactGrid,
              Etgar22Grid,
              lang,
              userSettingsService) {

        $(document).ready(function () {

            userSettingsService.ready().then(function () {

                    var page = new GridPage({
                        mainId: 'contacts_page',
                        Grid: ContactGrid,
                        direction: userSettingsService.getLanguage().direction,
                        headerTitle: _.capitalize(lang.get('bo.contacts')),
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



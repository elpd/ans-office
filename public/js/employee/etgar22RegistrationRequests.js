define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/GridPage',
        'classes/grids/Etgar22RegistrationRequestGrid',
        'services/language',
        'services/userSettings'
    ],
    function (require,
              _,
              utilities,
              GridPage,
              Etgar22RegistrationRequestGrid,
              lang,
              userSettingsService) {

        $(document).ready(function () {

            userSettingsService.ready().then(function () {

                    var page = new GridPage({
                        mainId: 'etgar22_registration_requests_page',
                        Grid: require('classes/grids/Etgar22RegistrationRequestGrid'),
                        direction: userSettingsService.getLanguage().direction,
                        headerTitle: _.capitalize(lang.get('bo.etgar-22-registration-requests')),
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
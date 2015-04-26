define([
        'lodash',
        'classes/utilities',
        'classes/GridPage',
        'classes/grids/GuideGrid',
        'classes/subRows/GuideSubRow',
        'services/language',
        'services/userSettings'
    ],
    function (_,
              utilities,
              GridPage,
              GuideGrid,
              GuideSubRow,
              lang,
              userSettingsService) {

        $(document).ready(function () {
            userSettingsService.ready().then(function () {

                    var page = new GridPage({
                        mainId: 'guides_page',
                        Grid: GuideGrid,
                        direction: userSettingsService.getLanguage().direction,
                        headerTitle: _.capitalize(lang.get('bo.guides'))
                    });

                    page.execute();
                }
            );
        });
    });



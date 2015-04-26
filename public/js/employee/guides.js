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
                        headerTitle: _.capitalize(lang.get('bo.guides')),
                        beforeGridExecution: function(grid) {
                            grid.columns().remove('role_id');
                            grid.query().addFirstChildJoin('user_id', [
                                'name', 'email'
                            ]);
                            grid.columns().add(
                                [
                                    {
                                        label: _.capitalize(lang.get('bo.guide__user_id__user_name')),
                                        name: 'users.name'
                                    },
                                    {
                                        label: _.capitalize(lang.get('bo.guide__user_id__user_email')),
                                        name: 'users.email'
                                    }
                                ]);
                        }
                    });

                    page.execute();
                }
            );
        });
    });



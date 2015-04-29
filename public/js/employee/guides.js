define([
        'lodash',
        'classes/utilities',
        'classes/GridPage',
        'classes/grids/GuideGrid',
        'classes/grids/UserGrid',
        'classes/subRows/GuideSubRow',
        'services/language',
        'services/userSettings'
    ],
    function (_,
              utilities,
              GridPage,
              GuideGrid,
              UserGrid,
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
                        beforeGridExecution: function (grid) {
                            grid.columns().remove('role_id');
                            grid.columns().add(
                                _.merge({}, UserGrid.prototype.defaultColumnDefs.name, {
                                    name: 'users.name',
                                    classes: 'joined_child_cell',
                                    editable: false
                                }));
                            grid.columns().add(
                                _.merge({}, UserGrid.prototype.defaultColumnDefs.email, {
                                    name: 'users.email',
                                    classes: 'joined_child_cell',
                                    editable: false
                                }));
                        },
                        afterGridExecution: function (grid) {
                            grid.setGroupHeaders({
                                useColSpanStyle: true,
                                groupHeaders: [
                                    {
                                        startColumnName: 'users.name',
                                        numberOfColumns: 8,
                                        titleText: '<em>' + _.capitalize(lang.get('bo.guide_user_id')) + '</em>'
                                    }
                                ]
                            });
                        }
                    });

                    page.execute();
                }
            );
        });
    });



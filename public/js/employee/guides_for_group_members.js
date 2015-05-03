define([
        'lodash',
        'classes/utilities',
        'classes/GridPage',
        'classes/grids/GroupMemberGuideGrid',
        'classes/grids/UserGrid',
        'classes/subRows/GroupMemberGuideSubRow',
        'services/language',
        'services/userSettings'
    ],
    function (_,
              utilities,
              GridPage,
              GroupMemberGuideGrid,
              UserGrid,
              GuideSubRow,
              lang,
              userSettingsService) {

        $(document).ready(function () {
            userSettingsService.ready().then(function () {

                    var page = new GridPage({
                        mainId: 'guides_for_group_members_page',
                        Grid: GroupMemberGuideGrid,
                        direction: userSettingsService.getLanguage().direction,
                        headerTitle: _.capitalize(lang.get('bo.group-member-guide')),
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



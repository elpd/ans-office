define([
        'require',
        'lodash',
        'classes/utilities',
        'classes/GridPage',
        'classes/grids/GroupMemberGrid',
        'services/language',
        'services/userSettings'
    ],
    function (require,
              _,
              utilities,
              GridPage,
              GroupMemberGrid,
              lang,
              userSettingsService) {

        $(document).ready(function () {

            userSettingsService.ready().then(function () {

                    var page = new GridPage({
                        mainId: 'groups_members_page',
                        Grid: require('classes/grids/GroupMemberGrid'),
                        direction: userSettingsService.getLanguage().direction,
                        headerTitle: _.capitalize(lang.get('bo.group-members')),
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




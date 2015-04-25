define([
        'lodash',
        'classes/utilities',
        'classes/bi/Guide',
        'classes/bi/User',
        'classes/bi/Role',
        'employee/guides.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings',
        'classes/GeneralContentPageObject'
    ],
    function (_,
              utilities,
              Guide,
              User,
              Role,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid,
              userSettingsGService,
              GeneralContentPageObject) {

        $(document).ready(function () {

            var page = new GeneralContentPageObject({
                name: 'guides'
            });

            userSettingsGService.load().then(function () {

                    var grid = new GeneralGrid({
                        getDesiredHeightInContainer: function(){
                            return page.getGridDesiredHeight();
                        },
                        getDesiredWidthInContainer: function() {
                            return page.getGridDesiredWidth();
                        },
                        lang: lang,
                        userSettingsGService: userSettingsGService,
                        controllerUrl: '/api/guide',
                        biName: 'guide',
                        biNamePlural: 'guides',
                        caption: _.capitalize(lang.get('bo.guides')),
                        SubRow: SubRow,
                        direction: userSettingsGService.getLanguage().direction,
                        colModel: [{
                            label: _.capitalize(lang.get('bo.id')),
                            name: 'id',
                            width: 50,
                            key: true,
                            searchoptions: {
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                            },
                            searchrules: {
                                integer: true
                            }
                        },  {
                            label: lang.get('bo.role-user_user'),
                            name: 'user_id',
                            width: 200,
                            editable: true,
                            edittype: 'select',
                            formatter: 'select',
                            editoptions: {
                                value: utilities.generateGetItems('/api/user', User)(),
                                dataUrl: '/api/user',
                                buildSelect: utilities.generateBuildSelect(User)
                            }
                        }],
                        colModelExtraFunction: function () {
                            return JSON.stringify({
                                user_id: {
                                    sortOnLinkField: 'name',
                                    searchOnLinkField: 'name'
                                }
                            });
                        }
                    });

                    grid.activate();
                }
            )
            ;

        });

    });



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
                            grid.columns().add(
                                _.merge({}, Etgar22Grid.prototype.defaultColumnDefs.facebook_know_how, {
                                    name: 'etgar22.facebook_know_how',
                                    classes: 'joined_child_cell',
                                    editable: false
                                }));
                            grid.columns().add(
                                _.merge({}, Etgar22Grid.prototype.defaultColumnDefs.call_for_facebook_help, {
                                    name: 'etgar22.call_for_facebook_help',
                                    classes: 'joined_child_cell',
                                    editable: false
                                }));
                            grid.columns().add(
                                _.merge({}, Etgar22Grid.prototype.defaultColumnDefs.registration_date, {
                                    name: 'etgar22.registration_date',
                                    classes: 'joined_child_cell',
                                    editable: false
                                }));
                            grid.columns().add(
                                _.merge({}, Etgar22Grid.prototype.defaultColumnDefs.notes, {
                                    name: 'etgar22.notes',
                                    classes: 'joined_child_cell',
                                    editable: false
                                }));
                            grid.columns().add(
                                _.merge({}, Etgar22Grid.prototype.defaultColumnDefs.next_call, {
                                    name: 'etgar22.next_call',
                                    classes: 'joined_child_cell',
                                    editable: false
                                }));
                            grid.columns().add(
                                _.merge({}, Etgar22Grid.prototype.defaultColumnDefs.why_go_vegan, {
                                    name: 'etgar22.why_go_vegan',
                                    classes: 'joined_child_cell',
                                    editable: false
                                }));
                            grid.columns().add(
                                _.merge({}, Etgar22Grid.prototype.defaultColumnDefs.parent_name, {
                                    name: 'etgar22.parent_name',
                                    classes: 'joined_child_cell',
                                    editable: false
                                }));
                            grid.columns().add(
                                _.merge({}, Etgar22Grid.prototype.defaultColumnDefs.parent_email, {
                                    name: 'etgar22.parent_email',
                                    classes: 'joined_child_cell',
                                    editable: false
                                }));

                        },

                        afterGridExecution: function (grid) {
                            grid.get$Grid().jqGrid('setGroupHeaders', {
                                useColSpanStyle: true,
                                groupHeaders: [
                                    {
                                        startColumnName: 'etgar22.facebook_know_how',
                                        numberOfColumns: 8,
                                        titleText: '<em>' + _.capitalize(lang.get('bo.contact_etgar22')) + '</em>'
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



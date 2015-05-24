define([
    'classes/Page',
    'classes/grids/ContactGrid',
    'services/userDataService'
], function (Page,
             ContactGrid,
             userDataService) {

    var Class = function (params) {
        var self = this;
        Page.apply(self, params);
    };

    Class.prototype = Object.create(Page.prototype, {
        execute: {
            value: function () {
                var self = this;
                $(document).ready(function () {
                    userDataService.ready().then(function () {

                        generateContactGrid(self);
                    });
                });
            }
        },

        pageId: {
            value: 'etgar22registrar_page'
        },

        contactsGridId: {
            value: 'contacts_grid'
        },

        get$Page: {
            value: function () {
                return $('#' + self.pageId);
            }
        }
    });

    function generateContactGrid(self) {
        var grid = new ContactGrid({
            gridId: self.contactsGridId,
            direction: userDataService.getLanguageDesc().direction,
            calcDesiredHeightInContainer: function () {
                return 450; // todo: real calculation
            },
            calcDesiredWidthInContainer: function () {
                return self.get$Page().width();
            }
        });

        grid.execute();

        grid.ready().then(function () {
            var originalMainQueryFilter = grid.mainQueryFilter;

            var groupFilter = {
                filterType: 'scope',
                scopeData: {
                    method: 'inAnyRegistrationGroupAndNotAcceptedYetOrNoGroup'
                    //parameter: itemId
                }
            };

            var allFilter = {
                filterType: 'group',
                groupData: {
                    operation: 'and',
                    nodes: _.compact([originalMainQueryFilter,
                        groupFilter
                    ])
                }
            };

            grid.setMainQueryFilter(allFilter);
            grid.refreshGridIncludeDefinitions();

            grid.ready().then(function () {
                grid.children().selectAbsolute(['etgar22']);
            });
        });
    }

    var instance = new Class();
    instance.execute();

    return instance;
});
define([
    'require',
    'lodash',
    'classes/utilities',
    'classes/Page',
    'services/language',
    'services/userDataService',
    'classes/services/GroupService',
    'classes/grids/ContactGrid',
    'classes/bi/Group',
    'classes/bi/Guide'
], function (require,
             _,
             utilities,
             Page,
             lang,
             userDataService,
             GroupService,
             ContactGrid,
             Group,
             Guide) {

    var groupService = new GroupService();

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

                        generateGroupSelect(self);
                        generateGuideSelect(self);
                        generateContactGrid(self);
                        self.contactGrid.ready().then(function () {
                            selectCurrentUserInGuideSelection(self);
                        });
                    });
                });
            }
        },

        get$GuideSelect: {
            value: function () {
                return $('#guides_selector_on_contacts_by_guide');
            }
        },

        get$GroupSelect: {
            value: function () {
                return $('#groups_selector_on_contacts_by_guide');
            }
        },

        pageFilter: {
            value: {
                filterType: 'scope',
                scopeData: {
                    method: 'inAnyRunningGroup'
                    //parameter: itemId
                }
            }
        }
    });

    function selectCurrentUserInGuideSelection(self) {
        var $select = self.get$GuideSelect();
        var $currentUserOption = $select.find(
            'option[value="' +
            userDataService.getUser().id + '"]'
        );

        $currentUserOption.prop('selected', true);
        $select.trigger('change');
    }

    function generateGroupSelect(self) {
        var $select = self.get$GroupSelect();
        $select.empty();

        // Option: empty. no scope.
        $select.append('<option value="0">* All</option>');

        var groupsPromise = groupService.query({
            filter: {
                filterType: 'scope',
                scopeData: {
                    method: 'arrangeByCycleDateDesc'
                    //parameter: itemId
                }
            }
        });
        groupsPromise.then(function (groups) {
            var groupsSelectOptions = utilities.generateOptions(groups, Group);
            _.forEach(groupsSelectOptions, function ($option) {
                $select.append($option);
            });
        });

        $select.change(function (e) {
            calcFiltersAndRedrawGrid(self);
        });
    }

    function generateGuideSelect(self) {
        var $select = self.get$GuideSelect();
        $select.empty();

        // Option: empty. no scope.
        $select.append('<option value="0">* All</option>');

        // Option: no guide.
        $select.append(
            '<option value="query_no_guide">' +
            '* ' + lang.get('main.guide-page_guide-select_no-guide-option') +
            '</option>');

        // Option: any guide.
        $select.append(
            '<option value="query_any_guide">' +
            '* ' + lang.get('main.guide-page_guide-select_any-guide-option') +
            '</option>');

        var guides = utilities.generateGetItems('/api/guide', Guide)();
        guides._promise.then(function (data) {
            _.forEach(data.rows, function (row) {
                var toStr = row.cell.user.name + ' - ' + row.cell.user.email;
                var id = row.cell.user.id;

                var $option = $('<option>' + toStr + '</option>');
                $option.attr('value', id);
                $select.append($option);
            });
        });

        $select.change(function (e) {
            calcFiltersAndRedrawGrid(self);
        });
    }

    function generateContactGrid(self) {
        var grid = new ContactGrid({
            gridId: 'contact_by_guide_grid',
            direction: userDataService.getLanguageDesc().direction,
            calcDesiredHeightInContainer: function () {
                return 450;
            },
            calcDesiredWidthInContainer: function () {
                return $('#guide_contact_by_guide_grid_subsection').width();
            }
        });

        grid.execute();

        grid.ready().then(function () {
            grid.children().selectAbsolute(['etgar22']);
        });

        self.contactGrid = grid;
        self.originalMainQueryFilter = grid.mainQueryFilter;
    }

    function calcFiltersAndRedrawGrid(self) {
        var $groupSelect = self.get$GroupSelect();
        var selectedGroup = $groupSelect.val();
        var groupFilter = generateGroupFilter(selectedGroup, 'inGroup');

        var $guideSelect = self.get$GuideSelect();
        var selectedGuide = $guideSelect.val();
        var guideFilter = generateGuideFilter(selectedGuide);

        var allFilter = {
            filterType: 'group',
            groupData: {
                operation: 'and',
                nodes: _.compact([self.originalMainQueryFilter,
                    self.pageFilter,
                    groupFilter,
                    guideFilter])
            }
        };

        self.contactGrid.ready().then(function () {
            self.contactGrid.setMainQueryFilter(allFilter);
            self.contactGrid.refreshGridIncludeDefinitions();
        });
    }

    function generateGroupFilter(groupValue, method) {
        return generateFilter(groupValue, method);
    }

    function generateGuideFilter(guideValue) {
        var filter = null;

        if (Number.isNaN(parseInt(guideValue))) {
            switch (guideValue) {
                case 'query_no_guide':
                    filter = {
                        filterType: 'scope',
                        scopeData: {
                            method: 'withNoAssociatedGuides'
                            //parameter: itemId
                        }
                    };
                    break;

                case 'query_any_guide':
                    filter = {
                        filterType: 'scope',
                        scopeData: {
                            method: 'withAnyAssociatedGuide'
                            //parameter: itemId
                        }
                    };
                    break;

                default:
                    filter = null;
                    break;
            }

        } else {
            filter = generateFilter(guideValue, 'guidedByUser');
        }

        return filter;
    }

    function generateFilter(itemId, method) {
        var scopeFilter = null;
        if (Number.isNaN(parseInt(itemId)) ||
            itemId == 0) {

        } else {
            scopeFilter = {
                filterType: 'scope',
                scopeData: {
                    method: method,
                    parameter: itemId
                }
            };
        }

        return scopeFilter;
    }

    var instance = new Class({});
    instance.execute();

    //return Class;
});
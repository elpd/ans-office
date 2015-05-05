define([
    'require',
    'lodash',
    'classes/utilities',
    'services/language',
    'services/userDataService',
    'classes/grids/ContactGrid',
    'classes/bi/Group',
    'classes/bi/Guide'
], function (require,
             _,
             utilities,
             lang,
             userDataService,
             ContactGrid,
             Group,
             Guide) {

    var sections = [
        'guide_section'
    ];

    var Class = function () {

    };

    Class.prototype = Object.create(Object.prototype, {});

    $(document).ready(function () {
        userDataService.ready().then(function () {
            turnOffAllSections();

            if (userDataService.roles().hasRoleGuide()) {
                activateGuideSection();
            }
        });
    });

    function turnOffAllSections() {
        _.forEach(sections, function (sectionId) {
            $('#' + sectionId).hide();
        });
    }

    function activateGuideSection() {
        ContactGrid = require('classes/grids/ContactGrid');

        var $section = $('#' + 'guide_section');
        var contactsByGuideGrid = generateContactsByGuideGrid();

        var originalMainQueryFilter = contactsByGuideGrid.mainQueryFilter;

        generateGroupSelectBox(contactsByGuideGrid, originalMainQueryFilter);
        generateGuideSelectBox(contactsByGuideGrid, originalMainQueryFilter);

        contactsByGuideGrid.ready().then(function () {
            $('#guides_selector_on_contacts_by_guide option[value="' +
            userDataService.getUser().id + '"]').prop('selected',true);

            contactsByGuideGrid.ready().then(function () {
                $('#guides_selector_on_contacts_by_guide').trigger('change');
            });
        });

        $section.show();
    }

    function generateContactsByGuideGrid() {
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

        return grid;
    }

    function generateGroupSelectBox(contactsByGuideGrid, originalMainQueryFilter) {
        var groupsForUser = utilities.generateGetItems('/api/user-guided-group', Group)();
        var $select = $('#groups_selector_on_contacts_by_guide');
        groupsForUser._promise.then(function (data) {
            _.forEach(groupsForUser, function (groupToStr, groupId) {
                if (groupsForUser.hasOwnProperty(groupId)) {
                    var $option = $('<option>' + groupToStr + '</option>');
                    $option.attr('value', groupId);
                    $select.append($option);
                }
            });
        });

        $select.change(function (e) {
            calcFiltersAndRedrawGrid(contactsByGuideGrid, originalMainQueryFilter);
        });
    }

    function generateGuideSelectBox(contactsByGuideGrid, originalMainQueryFilter) {
        var $select = $('#guides_selector_on_contacts_by_guide');
        $select.append('<option value="0"></option>');

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
            calcFiltersAndRedrawGrid(contactsByGuideGrid, originalMainQueryFilter);
        });
    }

    function calcFiltersAndRedrawGrid(contactsByGuideGrid, originalMainQueryFilter) {
        var $groupSelect = $('#groups_selector_on_contacts_by_guide');
        var selectedGroup = $groupSelect.val();
        var groupFilter = generateFilter(selectedGroup, 'inGroup');

        var $guideSelect = $('#guides_selector_on_contacts_by_guide');
        var selectedGuide = $guideSelect.val();
        var guideFilter = generateFilter(selectedGuide, 'guidedByUser');

        var allFilter = {
            filterType: 'group',
            groupData: {
                operation: 'and',
                nodes: _.compact([originalMainQueryFilter, groupFilter,
                    guideFilter])
            }
        };

        contactsByGuideGrid.setMainQueryFilter(allFilter);
        contactsByGuideGrid.refreshGridIncludeDefinitions();
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

    //return Class;
});
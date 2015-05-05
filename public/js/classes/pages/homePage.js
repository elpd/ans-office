define([
    'require',
    'lodash',
    'classes/utilities',
    'services/language',
    'services/userDataService',
    'classes/grids/ContactGrid',
    'classes/bi/Group'
], function (require,
             _,
             utilities,
             lang,
             userDataService,
             ContactGrid,
             Group) {

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
        var $section = $('#' + 'guide_section');

        ContactGrid = require('classes/grids/ContactGrid');
        var contactsByGuideGrid = new ContactGrid({
            gridId: 'contact_by_guide_grid',
            direction: userDataService.getLanguageDesc().direction,
            calcDesiredHeightInContainer: function () {
                return 450;
            },
            calcDesiredWidthInContainer: function () {
                return $('#guide_contact_by_guide_grid_subsection').width();
            },
            mainQueryFilter: {
                filterType: 'scope',
                scopeData: {
                    method: 'guidedByUser',
                    parameter: userDataService.getUser().id
                }
            }
        });

        contactsByGuideGrid.execute();

        contactsByGuideGrid.ready().then(function () {
            contactsByGuideGrid.children().selectAbsolute(['etgar22']);
        });

        var groupsForUser = utilities.generateGetItems('/api/user-guided-group', Group)();
        groupsForUser._promise.then(function (data) {
            var $select = $('#groups_selector_on_contacts_by_guide');

            _.forEach(groupsForUser, function (groupToStr, groupId) {
                if (groupsForUser.hasOwnProperty(groupId)) {
                    var $option = $('<option>' + groupToStr + '</option>');
                    $option.attr('value', groupId);
                    $select.append($option);
                }
            });
        });

        var $selectGroup = $('#groups_selector_on_contacts_by_guide');
        var originalMainQueryFilter = contactsByGuideGrid.mainQueryFilter;
        $selectGroup.change(function (e) {
            var selectedGroupId = $selectGroup.val();
            var scopeFilter = null;
            if (Number.isNaN(parseInt(selectedGroupId)) ||
                selectedGroupId == 0) {

            } else {
                scopeFilter = {
                    filterType: 'scope',
                    scopeData: {
                        method: 'inGroup',
                        parameter: selectedGroupId
                    }
                };
            }
            var allFilter = {
                filterType: 'group',
                groupData: {
                    operation: 'and',
                    nodes: _.compact([originalMainQueryFilter,
                        scopeFilter])
                }
            };

            contactsByGuideGrid.setMainQueryFilter(allFilter);
            contactsByGuideGrid.refreshGridIncludeDefinitions();
        });

        $section.show();
    }

    //return Class;
});
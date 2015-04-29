define([
    'lodash',
    'classes/AttributesObject'
], function (_,
             AttributesObject) {

    var attributesRules = {
        mainId: {
            required: true
        },
        tabId: {
            required: true,
            defaults: {
                dependencies: ['mainId'],
                calculation: function (mainId) {
                    return mainId + '_tab';
                }
            }
        },
        tabLinkId: {
            required: true,
            defaults: {
                dependencies: ['tabId'],
                calculation: function (tabId) {
                    return tabId + '_link';
                }
            }
        },
        gridId: {
            required: true,
            defaults: {
                dependencies: ['tabId'],
                calculation: function (tabId) {
                    return tabId + '_grid';
                }
            }
        },
        pagerId: {
            required: true,
            defaults: {
                dependencies: ['gridId'],
                calculation: function (gridId) {
                    return gridId + '_pager';
                }
            }
        },
        caption: {
            required: true
        },
        beforeGridCreation: {},
        beforeGridExecution: {},
        afterGridExecution: {},
        direction: {
            required: true,
            defaults: {
                dependencies: [],
                calculation: 'left_to_right'
            }
        },
        Grid: {
            required: true
        }
    };

    var Class = function GridTab(params) {
        AttributesObject.call(this, params, attributesRules);
    }

    Class.prototype = Object.create(AttributesObject.prototype, {
        get$TabLink: {
            value: function () {
                var self = this;
                return $('#' + self.tabLinkId);
            }
        },

        createTabElement: {
            value: function () {
                var self = this;

                var $elementListItem = $(
                    '<li role="presentation"></li>');

                var $elementTabLink = $(
                    '<a id="' + self.tabLinkId +
                    '" href="#' + self.tabId + '" aria-controls="' + self.tabId +
                    '" role="tab" data-toggle="tab">' +
                    self.caption +
                    '</a>'
                );

                $elementTabLink.click(function (e) {
                    e.preventDefault();

                    var grid = createGrid(self);
                    if (self.hasOwnProperty('beforeGridExecution')) {
                        self.beforeGridExecution(grid);
                    }

                    grid.execute();

                    if (self.hasOwnProperty('afterGridExecution')){
                        self.afterGridExecution(grid);
                    }

                    $(this).tab('show');
                });

                $elementListItem.append($elementTabLink);

                return $elementListItem;
            }
        },

        createTabGridContentElement: {
            value: function () {
                var self = this;

                var $element = $(
                    '<div role="tabpanel" class="tab-pane" id="' + self.tabId + '">' +
                    '<table id="' + self.gridId + '"></table>' +
                    '<div id="' + self.pagerId + '"></div>' +
                    '</div>'
                );

                return $element;
            }
        },

        clickToOpen: {
            value: function () {
                var self = this;
                self.get$TabLink().click();
            }
        }
    });

    function createGrid(self) {
        var gridParams = {};
        gridParams.gridId = self.gridId;
        gridParams.caption = self.caption;
        gridParams.direction = self.direction;

        if (self.hasOwnProperty('beforeGridCreation')) {
            self.beforeGridCreation(gridParams);
        }

        var grid = new self.Grid(gridParams);
        return grid;
    }

    return Class;
});

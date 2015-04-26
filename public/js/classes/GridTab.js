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
        gridInitialization: {
            required: true
        }
    };

    var Class = function GridTab(params) {
        AttributesObject.call(this, params, attributesRules);
    }

    Class.prototype = Object.create(AttributesObject.prototype, {
        get$TabLink: {
            value: function() {
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

                    var grid = self.gridInitialization(
                        self.gridId);

                    grid.execute();
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
            value: function() {
                var self = this;
                self.get$TabLink().click();
            }
        }
    });

    return Class;
});

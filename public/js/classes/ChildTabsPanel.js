define([
    'lodash',
    'classes/AttributesObject'
], function (_,
             AttributesObject) {

    var NAVBAR_RIGHT_CLASS = 'navbar-right';

    var attributesRules = {
        mainId: {
            required: true
        },
        tabs: {},
        direction: {
            required: true,
            defaults: {
                calculation: 'left_to_right'
            }
        }
    };

    var Class = function (params) {
        AttributesObject.call(this, params, attributesRules);
    };

    Class.prototype = Object.create(AttributesObject.prototype, {
        createElement: {
            value: function () {
                var self = this;

                var $mainDiv = self.createMainDivElement();
                var $tabsList = self.createTabsListElement();
                var $tabsContentList = self.createTabsContentListElement();

                $mainDiv.append($tabsList);
                $mainDiv.append($tabsContentList);

                return $mainDiv;
            }
        },

        createMainDivElement: {
            value: function () {
                var self = this;
                var $element = $(
                    '<div id="' + self.mainId + '_subcontent" role="tabpanel">'
                    + '</div>'
                );

                return $element;
            }
        },

        createTabsListElement: {
            value: function () {
                var self = this;

                var $element = $(
                    '<ul class="nav nav-tabs" role="tablist">' +
                    '</ul>'
                );

                if (self.direction == 'right_to_left') {
                    $element.addClass(NAVBAR_RIGHT_CLASS);
                }

                self.tabs.forEach(function (tab) {
                    $element.append(tab.createTabElement());
                });

                return $element;
            }
        },

        createTabsContentListElement: {
            value: function () {
                var self = this;
                var $element = $(
                    '<div class="tab-content">' + '</div>'
                );

                if (self.direction == 'right_to_left') {
                    $element.addClass(NAVBAR_RIGHT_CLASS);
                }

                self.tabs.forEach(function (tab) {
                    $element.append(tab.createTabGridContentElement());
                });

                return $element;
            }
        },

        clickToOpenFirstTab: {
            value: function() {
                var self = this;
                if (self.tabs.length > 0) {
                    var firstTab = self.tabs[0];
                    firstTab.clickToOpen();
                }
            }
        }
    });

    return Class;
});

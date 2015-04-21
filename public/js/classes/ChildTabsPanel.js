define([], function(){
    var Class = function(params) {
        this.setParams(params);
    };

    Class.prototype = {
        setParams: function(params) {
            this.id = params.id;
            this.tabs = params.tabs;
        },

        createElement: function() {
            var self = this;

            var $mainDiv = self.createMainDivElement();
            var $tabsList = self.createTabsListElement();
            var $tabsContentList  = self.createTabsContentListElement();

            $mainDiv.append($tabsList);
            $mainDiv.append($tabsContentList);

            return $mainDiv;
        },

        createMainDivElement: function() {
            var self = this;
            var $element = $(
                '<div id="' + self.id + '_subcontent" role="tabpanel">'
                + '</div>'
            );

            return $element;
        },

        createTabsListElement: function() {
            var self = this;

            var $element = $(
                '<ul class="nav nav-tabs" role="tablist">' +
                '</ul>'
            );

            self.tabs.forEach(function(tab){
                $element.append(tab.createTabElement());
            });

            return $element;
        },

        createTabsContentListElement: function(){
            var self = this;
            var $element = $(
                '<div class="tab-content">' + '</div>'
            );

            self.tabs.forEach(function(tab){
                $element.append(tab.createTabGridContentElement());
            });

            return $element;
        }
    };

    return Class;
});

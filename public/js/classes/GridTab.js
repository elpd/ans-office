define([], function () {
    var Class = function GridTab(params) {
        this.setParams(params);
        this.setVariables();
    }

    Class.prototype = {
        setParams: function (params) {
            this.parentRowId = params.parentRowId;
            this.name = params.name;
            this.langCaption = params.langCaption;
            this.lang = params.lang;
        },

        setVariables: function () {
            var self = this;

            self.tabId = self.parentRowId + '_' + self.name + 'Tab';
            self.tabLinkId = self.tabId + '_link';
            self.gridId = self.tabId + '_grid';
            self.pagerId = self.gridId + '_pager';
        },

        createTabElement: function () {
            var self = this;

            var $element = $(
                '<li role="presentation">' +
                '<a id="' + self.tabLinkId +
                '" href="#' + self.tabId + '" aria-controls="' + self.tabId +
                '" role="tab" data-toggle="tab">' +
                self.lang.get(self.langCaption) +
                '</a>' +
                '</li>');

            return $element;
        },

        createTabGridContentElement: function () {
            var self = this;

            var $element = $(
                '<div role="tabpanel" class="tab-pane" id="' + self.tabId + '">' +
                '<table id="' + self.gridId + '"></table>' +
                '<div id="' + self.pagerId + '"></div>' +
                '</div>'
            );

            return $element;
        }
    };

    return Class;
});

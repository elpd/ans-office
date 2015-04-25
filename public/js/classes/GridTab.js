define(['lodash'], function (_) {
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
            this.gridInitialization = params.gridInitialization;
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

            var $elementListItem = $(
                '<li role="presentation"></li>');

            var $elementTabLink = $(
                '<a id="' + self.tabLinkId +
                '" href="#' + self.tabId + '" aria-controls="' + self.tabId +
                '" role="tab" data-toggle="tab">' +
                _.capitalize(self.lang.get(self.langCaption)) +
                '</a>'
            );

            $elementTabLink.click(function (e) {
                e.preventDefault();

                var grid = self.gridInitialization(
                    self.lang,
                    self.userSettingsGService,
                    self.gridId);

                grid.activate();
                $(this).tab('show');
            });

            $elementListItem.append($elementTabLink);

            return $elementListItem;
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

(function () {
    var mainSettings = require('./mainSettings');
    var PageObject = require('./PageObject');
    var NavGridPageObject = require('./NavGridPageObject');
    var RowPageObject = require('./RowPageObject');

    var Class = function CrudGridPageObject(params) {
        this.setParams(params);
        this.setVariables();
    };

    Class.prototype = (function () {
        function Prototype() {
            this.setParams = function (params) {
                var self = this;

                self.gridId = params.gridId;
                self.gridRowClass = params.gridRowClass;
                self.gridPagerId = params.gridPagerId;
                self.fieldsDef = params.fieldsDef;
            };

            this.setVariables = function () {
                var self = this;

                self.loadingIndicatorId = self.gridId + '_loading_indicator';
            };

            this.getHeader = function () {
                return element(by.css('h2.section_header'));
            };

            this.getCurrentUrl = function () {
                return browser.getCurrentUrl();
            };

            this.getRows = function () {
                var self = this;

                return element.all(by.css('#' + self.gridId +
                ' tr.dataRow.' + self.gridRowClass));
            };

            this.getRowPage = function (params) {
                var self = this;

                var rowEl = self.findRow({
                    by: params.by,
                    value: params.value
                });

                var rowPage = new RowPageObject({
                    element: rowEl,
                    gridId: self.gridId
                });

                return rowPage;
            };

            this.findRow = function (params) {
                var self = this;

                var rowElement = null;
                var cellElSelection = self.element.element(by.css('tr.dataRow' + '.' + self.gridRowClass +
                ' ' +
                'td[aria-describedby="' + self.gridId + '_' + params.by + '"][title="' + params.value + '"]'));

                var rowElement = cellElSelection.element(by.xpath('ancestor::tr'));

                return rowElement;
            };

            this.getGrid = function () {
                var self = this;
                return element(by.id(self.gridId));
            };

            this.getNavGridElement = function () {
                var self = this;
                return this.element.element(by.id(self.gridPagerId + '_left'));
            };

            this.getNavGrid = function () {
                var self = this;
                var element = self.getNavGridElement();

                return new NavGridPageObject({
                    element: element,
                    gridId: self.gridId,
                    fieldsDef: self.fieldsDef
                });
            };

            this.waitOnData = function () {
                var self = this;

                var loadingIndicator = this.element.element(by.id(
                    self.loadingIndicatorId));

                var browserPromise = browser.wait(function () {
                    return loadingIndicator.isPresent();
                }, mainSettings.waitTimeout);

                return browserPromise;
            };

            this.selectRow = function (params) {
                var self = this;

                return self.waitOnData().then(function () {
                    var rowElSelection = self.findRow({
                        by: params.by,
                        value: params.value
                    });

                    rowElSelection.click();
                });

            };
        }

        Prototype.prototype = new PageObject();
        var prototype = new Prototype();
        return prototype;

    })();

    module.exports = Class;
})();

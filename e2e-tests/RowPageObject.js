(function () {
    var _ = require('lodash');
    var mainSettings = require('./mainSettings');
    var PageObject = require('./PageObject');

    var Class = function RowPageObject(params) {
        this.setParams(params);
        this.setVariables();
    };

    Class.prototype = (function () {
        function Prototype() {
            this.setParams = function (params) {
                var self = this;
                self.element = params.element;
                self.gridId = params.gridId;
            };

            this.setVariables = function () {
                var self = this;

            };

            this.waitOnData = function () {
                var self = this;
                return browser.wait(function () {
                    return self.getElement().isPresent();
                }, mainSettings.waitTimeout);
            };

            this.startUpdateMode = function () {
                var self = this;
                browser.actions().doubleClick(self.element).perform();
            };

            this.endUpdateMode = function () {
                var self = this;
                browser.actions().sendKeys(protractor.Key.ENTER).perform();
            };

            this.getEditableAttribute = function() {
                var self = this;
                return self.element.getAttribute('editable');
            };

            this.getCellElement = function(params) {
                var self = this;
                return self.element.element(by.css('td[aria-describedby="' + self.gridId + '_' + params.name +  '"]'));
            };

            this.editCell = function(params) {
                var self = this;
                var cellEl = self.getCellElement({
                    name: params.cellName
                });

                cellEl.click();

                var inputEl = getInputInCell(cellEl);
                clearInput(inputEl);
                inputEl.sendKeys(params.newValue);
            };

            this.getIdPromise = function() {
                var self = this;
                var idCell = self.getCellElement({
                    name: 'id'
                });

                return idCell.getAttribute('title');
            }
        }

        Prototype.prototype = new PageObject();
        var prototype = new Prototype();
        return prototype;

    })();

    function getInputInCell(cellEl) {
        return cellEl.element(by.css('input'));
    }

    function clearInput(elem) {
        elem.getAttribute('value').then(function (text) {
            var len = text.length
            var backspaceSeries = new Array(len+1).join(protractor.Key.BACK_SPACE);
            elem.sendKeys(backspaceSeries);
        })
    }

    module.exports = Class;
})();
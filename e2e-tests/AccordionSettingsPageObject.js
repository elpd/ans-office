(function () {
    var mainSettings = require('./mainSettings');
    var Promise = require("bluebird");
    var PageObject = require('./PageObject.js');

    var Class = function AccordionSettingsPageObject(params) {
        this.setParams(params);
    };

    Class.prototype = (function () {
        function Prototype() {

            this.setParams = function(params) {
                if (params) {
                    this.element = params.element;
                }
            };

            this.waitOnData = function () {
                var self = this;

                return browser.wait(function () {

                    return new Promise(function (resolve, reject) {

                        self.element.all(by.css('.loading_indicator')).then(function (allLoadingIndicatorsElements) {

                            var allCount = allLoadingIndicatorsElements.length;
                            self.element.all(by.css('.loading_indicator.done')).then(function (doneElements) {

                                var doneCount = doneElements.length;
                                if (doneCount == allCount) {
                                    resolve(true)
                                } else {
                                    resolve(reject);
                                }
                            });
                        });

                    });
                });
            };

            this.open = function () {
                var self = this;
                self.element.click();
            };

            this.getHeaderElement = function () {
                var self = this;
                return this.element.element(by.css('.panel-heading'));
            };

            this.getContentElement = function () {
                var self = this;
                return this.element.element(by.css('.panel-content'));
            };

        }

        Prototype.prototype = new PageObject();
        var prototype = new Prototype();
        return prototype;
    })();

    module.exports = Class;
})();
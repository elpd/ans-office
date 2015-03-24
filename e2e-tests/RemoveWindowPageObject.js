(function () {

    var mainSettings = require('./mainSettings');
    var _ = require('lodash');
    var Promise = require("bluebird");
    var PageObject = require('./PageObject');

    var Class = function RemoveWindowPageObject(params) {
        this.setParams(params);
        this.setVariables();
    };

    Class.prototype = (function () {
        function Prototype() {
            this.setParams = function (params) {
                var self = this;
                self.element = params.element;
                self.gridId = params.gridId;
                self.fieldsDef = params.fieldsDef;
            };

            this.setVariables = function () {
                var self = this;

            };

            this.waitOnData = function () {
                var self = this;
                var dataPromise = browser.wait(function () {
                    return self.element.isDisplayed();
                });

                return dataPromise;
            };

            this.waitOnClose = function () {
                var self = this;
                var browserPromise = browser.wait(function () {
                    var promise = new Promise(function (resolve, reject) {
                        var res = self.element.isDisplayed();
                        res.then(function (found) {
                            resolve(!found);
                        });
                    });
                    return promise;

                }, mainSettings.waitTimeout);
                return browserPromise;
            };

            this.getTitleElement = function () {
                var self = this;
                return this.element.element(by.id('delhd' + self.gridId));
            };

            this.getSubmitButtonElement = function () {
                var self = this;
                return this.element.element(by.id('dData'));
            };

            this.getInputsElements = function () {
                var self = this;
                var inputsEl = {};
                self.fieldsDef.forEach(function (def) {
                    inputsEl[def.name] = self.element.element(by.css(def.modalInputCss));
                });
                return inputsEl;
            };

            this.doAction = function (params) {
                var self = this;
                var submitButton = self.getSubmitButtonElement();

                submitButton.click();
            };
        }

        Prototype.prototype = new PageObject();
        var prototype = new Prototype();
        return prototype;

    })();

    module.exports = Class;
})();

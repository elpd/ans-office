(function () {

    var mainSettings = require('./mainSettings');
    var PageObject = require('./PageObject');

    var Class = function MainNavbarPageObject(params) {
        this.setParams(params);
        this.setVariables();
    };

    Class.prototype = (function () {
        function Prototype() {
            this.setParams = function (params) {
                var self = this;
                self.element = params.element;
            };

            this.setVariables = function () {
                var self = this;

            };

            this.getMainLabelElement = function() {
                var self = this;
                return element(by.id('main_label'));
            };

            this.waitOnData = function () {
                var self = this;
                return browser.wait(function () {
                    return self.getElement().isPresent();
                }, mainSettings.waitTimeout);
            };
        }

        Prototype.prototype = new PageObject();
        var prototype = new Prototype();
        return prototype;

    })();

    module.exports = Class;
})();

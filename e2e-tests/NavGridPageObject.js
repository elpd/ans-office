(function () {

    var PageObject = require('./PageObject');
    var AddWindowPageObject = require('./AddWindowPageObject');

    var Class = function CrudGridPageObject(params) {
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

            this.getAddButtonElement = function () {
                var self = this;
                return element(by.id('add_' + self.gridId));
            };

            this.getAddWindowElement = function () {
                var self = this;
                return element(by.id('editmod' + self.gridId));
            };

            this.getAddWindow = function () {
                var self = this;

                return new AddWindowPageObject({
                    element: self.getAddWindowElement()
                });
            };

            this.pressAdd = function () {
                var self = this;
                var addButton = self.getAddButtonElement();
                addButton.click();

                var addWindowEl = self.getAddWindowElement();
                var browserPromise = browser.wait(function () {
                    return addWindowEl.isPresent();
                });

                return browserPromise.then(function () {
                    var addWindow = new AddWindowPageObject({
                        element: addWindowEl,
                        gridId: self.gridId,
                        fieldsDef: self.fieldsDef
                    });
                    return addWindow;
                });
            };

            this.waitOnData = function () {
                var self = this;
                return browser.wait(function () {
                    return self.getElement().isPresent();
                });
            };
        }

        Prototype.prototype = new PageObject();
        var prototype = new Prototype();
        return prototype;

    })();

    module.exports = Class;
})();

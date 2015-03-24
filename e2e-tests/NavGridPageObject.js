(function () {

    var mainSettings = require('./mainSettings');
    var PageObject = require('./PageObject');
    var AddWindowPageObject = require('./AddWindowPageObject');
    var RemoveWindowPageObject = require('./RemoveWindowPageObject');

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

            this.getRemoveButtonElement = function () {
                var self = this;
                return element(by.id('del_' + self.gridId));
            };

            this.getAddWindowElement = function () {
                var self = this;
                return element(by.id('editmod' + self.gridId));
            };

            this.getRemoveWindowElement = function() {
                var self = this;
                return element(by.id('delmod' + self.gridId));
            };

            this.getAddWindow = function () {
                var self = this;

                return new AddWindowPageObject({
                    element: self.getAddWindowElement()
                });
            };

            this.pressAdd = function () {
                var self = this;
                return pressAction({
                    getActionButtonElementFn: self.getAddButtonElement.bind(self),
                    getActionWindowElementFn: self.getAddWindowElement.bind(self),
                    ActionWindowPageObjectClass: AddWindowPageObject,
                    gridId: self.gridId,
                    fieldsDef: self.fieldsDef
                });
            };

            this.pressRemove = function(){
                var self = this;
                return pressAction({
                    getActionButtonElementFn: self.getRemoveButtonElement.bind(self),
                    getActionWindowElementFn: self.getRemoveWindowElement.bind(self),
                    ActionWindowPageObjectClass: RemoveWindowPageObject,
                    gridId: self.gridId,
                    fieldsDef: self.fieldsDef
                });

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

    function pressAction(params) {
        var actionButton = params.getActionButtonElementFn();
        actionButton.click();

        var actionWindowEl = params.getActionWindowElementFn();
        var browserPromise = browser.wait(function () {
            return actionWindowEl.isPresent();
        }, mainSettings.waitTimeout);

        return browserPromise.then(function () {
            var actionWindow = new params.ActionWindowPageObjectClass({
                element: actionWindowEl,
                gridId: params.gridId,
                fieldsDef: params.fieldsDef
            });
            return actionWindow;
        });
    }

    module.exports = Class;
})();

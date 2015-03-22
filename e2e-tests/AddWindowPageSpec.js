(function () {

    var _ = require('lodash');

    var Class = function AddWindowPageSpec(params) {
        this.setParams(params);
    };

    Class.prototype = {
        setParams: function (params) {
            var self = this;
            self.open = params.open;
            self.addParams = params.addParams;
        },

        specify: function () {
            var self = this;

            describe('add window', function () {

                var addWindow = null;

                beforeEach(function () {
                    browser.wait(function () {
                        return self.open().then(function (ob) {
                            addWindow = ob;
                            return true;
                        });
                    });
                });

                it('should be present', function () {
                    addWindow.waitOnData().then(function () {
                        var el = addWindow.getElement();

                        expect(el).not.toBeNull();
                        expect(el.isPresent()).toBe(true);
                    });
                });

                it('should have title', function () {
                    addWindow.waitOnData().then(function () {
                        var titleEl = addWindow.getTitleElement();

                        expect(titleEl.getText()).toEqual('Add Record');
                    });
                });

                it('should have field inputs', function () {
                    addWindow.waitOnData().then(function () {
                        var inputsEl = addWindow.getInputsElements();
                        _.forEach(inputsEl, function (n, key) {
                            expect(n.isPresent()).toBe(true);
                        });
                    });
                });

                it('should have submit button', function () {
                    addWindow.waitOnData().then(function () {
                        var submitEl = addWindow.getSubmitButtonElement();

                        expect(submitEl.isPresent()).toBe(true);
                    });
                });

                it('should be able to add', function () {
                    addWindow.waitOnData().then(function () {
                        addWindow.doAdd(self.addParams);

                        addWindow.waitOnClose().then(function () {
                            expect(addWindow.getElement().isPresent()).toBe(false);
                        });
                    });
                });

            });
        }
    };

    module.exports = Class;

})();

(function () {

    var _ = require('lodash');

    var Class = function RemoveWindowPageSpec(params) {
        this.setParams(params);
    };

    Class.prototype = {
        setParams: function (params) {
            var self = this;
            self.open = params.open;
            self.removeSpec = params.removeSpec;
        },

        specify: function () {
            var self = this;

            describe('action window', function () {

                var actionWindow = null;

                beforeEach(function () {
                    browser.wait(function () {
                        return self.open().then(function (ob) {
                            actionWindow = ob;
                            return true;
                        });
                    });
                });

                it('should be present', function () {
                    actionWindow.waitOnData().then(function () {
                        var el = actionWindow.getElement();

                        expect(el).not.toBeNull();
                        expect(el.isPresent()).toBe(true);
                    });
                });

                it('should have title', function () {
                    actionWindow.waitOnData().then(function () {
                        var titleEl = actionWindow.getTitleElement();

                        expect(titleEl.getText()).toEqual('Delete');
                    });
                });

                it('should have delete button', function () {
                    actionWindow.waitOnData().then(function () {
                        var submitEl = actionWindow.getSubmitButtonElement();

                        expect(submitEl.isPresent()).toBe(true);
                    });
                });

                it('should be able to remove', function () {
                    actionWindow.waitOnData().then(function () {
                        actionWindow.doAction();

                        actionWindow.waitOnClose().then(function () {
                            expect(actionWindow.getElement().isDisplayed()).toBe(false);
                        });
                    });
                });

            });
        }
    };

    module.exports = Class;

})();

(function () {

    var Promise = require("bluebird");

    var Class = function MainNavbarPageObjectSpec(params) {
        this.setParams(params);
    };

    Class.prototype = {
        setParams: function (params) {
            var self = this;
            self.getPageObject = params.getPageObject;
            self.parentWaitOnData = params.parentWaitOnData;
        },

        specify: function () {
            var self = this;

            describe('main navbar', function () {

                var testItem = null;

                function getTestItem() {
                    return testItem;
                }

                beforeEach(function () {
                    testItem = self.getPageObject();
                });

                it('should be present', function () {
                    self.parentWaitOnData().then(function () {
                        var el = testItem.getElement();

                        expect(el).not.toBeNull();
                        expect(el.isPresent()).toBe(true);
                    });
                });

                describe('options', function () {

                    describe('main label', function () {

                        it('should be present', function () {
                            self.parentWaitOnData().then(function () {
                                var el = testItem.getMainLabelElement();
                                expect(el.isPresent()).toBe(true);
                            });
                        });

                        it('should be correct', function(){
                            self.parentWaitOnData().then(function(){
                                var el = testItem.getMainLabelElement();
                                expect(el.getText()).toEqual('ANS');
                            });
                        });

                        it('should open an address when pressing',
                            function () {
                                // TODO
                            }
                        );

                    });

                });

            });
        }

    };

    module.exports = Class;

})();

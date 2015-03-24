(function () {

    var Promise = require("bluebird");
    var AddWindowPageSpec = require('./AddWindowPageSpec');

    var Class = function NavGridPageSpec(params) {
        this.setParams(params);
    };

    Class.prototype = {
        setParams: function (params) {
            var self = this;
            self.getPageElement = params.getPageElement;
            self.getGridPageObject = params.getGridPageObject;
            self.waitOnData = params.waitOnData;
            self.addParams = params.addParams;
            self.removeSpec = params.removeSpec;
        },

        specify: function () {
            var self = this;

            describe('navgrid', function () {

                var navGrid = null;

                function getNavGrid() {
                    return navGrid;
                }

                beforeEach(function () {
                    navGrid = self.getPageElement();
                });

                it('should be present', function () {
                    self.waitOnData().then(function () {
                        var navElement = navGrid.getElement();

                        expect(navElement).not.toBeNull();
                        expect(navElement.isPresent()).toBe(true);
                    });
                });

                describe('options', function () {

                    describe('add', function () {

                        it('should be present', function () {
                            self.waitOnData().then(function () {
                                var addElement = navGrid.getAddButtonElement();
                                expect(addElement.isPresent()).toBe(
                                    true);
                            });
                        });

                        it('should open adding window when pressing',
                            function () {
                                self.waitOnData().then(function () {
                                    navGrid.pressAdd().then(function(addWindow){
                                        expect(addWindow).not.toBeNull();
                                        expect(addWindow.getElement().isPresent())
                                            .toBe(true);
                                    });
                                });
                            }
                        );

                        var addWindowPageSpec = new AddWindowPageSpec({
                            open: function () {
                                var promise = getNavGrid().waitOnData().then(function () {
                                    var addWindow = getNavGrid().pressAdd();
                                    return (addWindow);
                                });
                                return promise;
                            },
                            addParams: self.addParams
                        });
                        addWindowPageSpec.specify();

                    });

                    describe('remove', function(){

                        it ('should be present', function(){
                            self.waitOnData().then(function () {
                                var el = navGrid.getRemoveButtonElement();
                                expect(el.isPresent()).toBe(
                                    true);
                            });
                        });

                        it('should open removing window when pressing',
                            function () {
                                self.waitOnData().then(function () {
                                    self.getGridPageObject().selectRow({
                                        by: self.removeSpec.by,
                                        value: self.removeSpec.value
                                    });
                                    navGrid.pressRemove().then(function(actionWindow){
                                        expect(actionWindow).not.toBeNull();
                                        expect(actionWindow.getElement().isPresent())
                                            .toBe(true);
                                    });
                                });
                            }
                        );
                    });

                });

            });
        }

    };

    module.exports = Class;

})();

(function () {

    var mainSettings = require('./mainSettings');
    var NavGridPageSpec = require('./NavGridPageSpec');

    var Class = function CrudGridPageSpec(params) {
        this.setParams(params);
    };

    Class.prototype = {
        setParams: function (params) {
            var self = this;

            self.testPageName = params.testPageName;
            self.pageAddressRegex = params.pageAddressRegex;
            self.headerLabel = params.headerLabel;
            self.openTestPage = params.openTestPage;
            self.testData = params.testData;
            self.addParams = params.addParams;
            self.removeSpec = params.removeSpec;
            self.updateSpec = params.updateSpec;
        },

        specify: function () {
            var self = this;

            describe(self.testPageName, function () {
                var testPage = null;

                var getTestPage = function () {
                    return testPage;
                };

                beforeEach(function () {
                    isAngularSite(false);

                    refreshData();
                    testPage = self.openTestPage();
                });

                it('should have address access', function () {
                    expect(testPage.getCurrentUrl()).toMatch(
                        self.pageAddressRegex);
                });

                it('should have header', function () {
                    expect(testPage.getHeader().getText()).toEqual(
                        self.headerLabel);
                });

                describe('grid', function () {
                    beforeEach(function () {

                    });

                    it('should be present', function () {
                        testPage.waitOnData().then(function () {
                            var gridElement = testPage.getGrid();
                            expect(gridElement.isPresent()).toBe(true);
                        });
                    });

                    it('should have same rows as test data', function () {
                        testPage.waitOnData().then(function () {
                            expect(testPage.getRows().count()).toEqual(self.testData.rows.length);
                        });
                    });

                    describe('inline editing', function () {

                        it('should be able to enter update mode', function () {
                            testPage.waitOnData().then(function () {
                                var row = testPage.getRowPage({
                                    by: self.updateSpec.keyName,
                                    value: self.updateSpec.keyValue
                                });

                                //expect(row.getEditableAttribute()).toEqual('0');

                                row.startUpdateMode();

                                expect(row.getEditableAttribute()).toEqual('1');
                            });
                        });

                        it('should be able to exit update mode', function () {
                            testPage.waitOnData().then(function () {
                                var row = testPage.getRowPage({
                                    by: self.updateSpec.keyName,
                                    value: self.updateSpec.keyValue
                                });

                                //expect(row.getEditableAttribute()).toEqual('0');

                                row.startUpdateMode();

                                expect(row.getEditableAttribute()).toEqual('1');

                                row.endUpdateMode();

                                expect(row.getEditableAttribute()).toEqual('0');
                            });
                        });

                        self.updateSpec.fields.forEach(function (updFieldSpec) {

                            it('should be able to update ' + updFieldSpec.name, function () {
                                testPage.waitOnData().then(function () {
                                    var rowTemp = testPage.getRowPage({
                                        by: self.updateSpec.keyName,
                                        value: self.updateSpec.keyValue
                                    });
                                    rowTemp.getIdPromise().then(function(rowId){
                                        row = testPage.getRowPage({
                                            by: 'id',
                                            value: rowId
                                        });

                                        row.startUpdateMode();
                                        expect(row.getEditableAttribute()).toEqual('1');

                                        row.editCell({
                                            cellName: updFieldSpec.name,
                                            newValue: updFieldSpec.newValue
                                        });

                                        row.endUpdateMode();
                                        expect(row.getEditableAttribute()).toEqual('0');

                                        var updatedCellElement = row.getCellElement({name: updFieldSpec.name});

                                        expect(updatedCellElement.getText()).toEqual(updFieldSpec.newValue);
                                    });

                                });
                            });
                        });

                    });

                    var navGridPageSpec = new NavGridPageSpec({
                        getPageElement: function () {
                            return getTestPage().getNavGrid();
                        },
                        getGridPageObject: function () {
                            return getTestPage();
                        },
                        waitOnData: function () {
                            return testPage.waitOnData();
                        },
                        addParams: self.addParams,
                        removeSpec: self.removeSpec
                    });
                    navGridPageSpec.specify();

                });

            });
        }
    };

    function refreshData() {
        browser.get(mainSettings.mainUrl + '/test/refresh');
    }

    module.exports = Class;

})();

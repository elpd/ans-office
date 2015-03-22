(function() {

  var NavGridPageSpec = require('./NavGridPageSpec');

  var Class = function CrudGridPageSpec(params) {
    this.setParams(params);
  };

  Class.prototype = {
    setParams: function(params) {
      var self = this;

      self.TestPageClass = params.TestPageClass;
      self.testPageName = params.testPageName;
      self.pageAddressRegex = params.pageAddressRegex;
      self.headerLabel = params.headerLabel;
      self.openTestPage = params.openTestPage;
      self.testData = params.testData;
      self.addParams = params.addParams;
    },

    specify: function() {
      var self = this;

      describe(self.testPageName, function() {
        var testPage = null;

        var getTestPage = function() {
          return testPage;
        };

        beforeEach(function() {
          isAngularSite(false);
          testPage = self.openTestPage();
        });

        it('should have address access', function() {
          expect(testPage.getCurrentUrl()).toMatch(
            self.pageAddressRegex);
        });

        it('should have header', function() {
          expect(testPage.getHeader().getText()).toEqual(
            self.headerLabel);
        });

        describe('grid', function(){
          beforeEach(function(){

          });

          it('should be present', function(){
            testPage.waitOnData().then(function(){
              var gridElement = testPage.getGrid();
              expect(gridElement.isPresent()).toBe(true);
            });
          });

          it('should have same rows as test data', function(){
            testPage.waitOnData().then(function(){
              expect(testPage.getRows().count()).toEqual(self.testData.rows.length);
            });
          });

          var navGridPageSpec = new NavGridPageSpec({
            getPageElement: function(){
              return getTestPage().getNavGrid();
            },
            waitOnData: function() {
              return testPage.waitOnData();
            },
            addParams: self.addParams
          });
          navGridPageSpec.specify();

        });

      });
    }
  };

  module.exports = Class;

})();

(function() {

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
    },

    specify: function() {
      var self = this;

      describe(self.testPageName, function() {
        var testPage = null;

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

          it('should have same rows as test data', function(){
            testPage.waitOnData().then(function(){
              expect(testPage.getRows().count()).toEqual(self.testData.rows.length);
            });
          });

        });

      });
    }
  };

  module.exports = Class;

})();

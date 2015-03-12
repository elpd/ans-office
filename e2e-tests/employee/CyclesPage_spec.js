(function() {
  var CyclesPage = require('./CyclesPage.js');
  var AnsHomepage = require('./../AnsHomepage');

  function openCyclesPage() {
    var ansHomepage = new AnsHomepage();
    var loginPage = ansHomepage.getAsLoggedOut();
    var homePage = loginPage.loginAsRoot();
    var employeePage = homePage.openEmployeeSection();
    var cyclesPage = employeePage.openCyclesPage();

    return cyclesPage;
  }

  var cyclesPage = null;

  describe('Cycles Page', function() {
    beforeEach(function() {
      isAngularSite(false);
      cyclesPage = openCyclesPage();
    });

    it('should have header', function() {
      expect(cyclesPage.getHeader().getText()).toEqual('Cycles');
    });

    it('should have 2 data rows', function() {
      var loadIndicator = element(by.id('loading_indicator_finished'));
      browser.wait(function(){
        return loadIndicator.isPresent();
      }).then(function(){
        var rows = cyclesPage.getRows();

        rows.then(function(itemsRows) {
          expect(itemsRows).toBeDefined();
          expect(itemsRows.length).toEqual(2);
        });
      });      
    });
  });
})();

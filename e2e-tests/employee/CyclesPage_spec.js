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

beforeEach(function() {
  isAngularSite(false);
});

describe('Cycles Page', function() {
  it('should have header', function() {
    var cyclesPage = openCyclesPage();
    expect(cyclesPage.getHeader().getText()).toEqual('Cycles');
  });

});

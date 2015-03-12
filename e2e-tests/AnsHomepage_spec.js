var AnsHomepage = require('./AnsHomepage.js');

var ansHomepage = null;

describe('ans homepage', function() {
  beforeEach(function() {
    isAngularSite(false);
    ansHomepage = new AnsHomepage();
  });
  
  it('should have a title', function() {
    var loginPage = ansHomepage.getAsLoggedOut();

    expect(ansHomepage.getTitle()).toEqual('ANS Office System');
  });

  it('should redirect to login page', function(){
    var loginPage = ansHomepage.getAsLoggedOut();

    expect(browser.getCurrentUrl()).toMatch(/\/auth\/login/);
  });
});

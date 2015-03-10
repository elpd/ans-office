var AnsHomepage = require('./AnsHomepage.js');

beforeEach(function() {
  isAngularSite(false);
});

describe('ans homepage', function() {
  it('should have a title', function() {
    var ansHomepage = new AnsHomepage();
    var loginPage = ansHomepage.getAsLoggedOut();

    expect(ansHomepage.getTitle()).toEqual('ANS Office System');
  });

  it('should redirect to login page', function(){
    var ansHomepage = new AnsHomepage();
    var loginPage = ansHomepage.getAsLoggedOut();

    expect(browser.getCurrentUrl()).toMatch(/\/auth\/login/);
  });
});

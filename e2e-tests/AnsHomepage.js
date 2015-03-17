(function() {
  var mainSettings = require('./mainSettings');
  var PageObject = require('./PageObject.js');
  var AdminPage = require('./AdminPage');
  var LoginPage = require('./LoginPage');

  var Class = function AnsHomepage() {

  };

  Class.prototype = (function() {
    function Prototype() {
      this.getAsLoggedOut = function() {
        browser.manage().deleteAllCookies();
        browser.get(mainSettings.mainUrl);

        var loginPage = new LoginPage();
        return loginPage;
      };

      this.getTitle = function() {
        return browser.getTitle();
      };

      this.loginAsRoot = function() {
        var loginPage = this.getAsLoggedOut();
        var homePage = loginPage.loginAsRoot();

        return homePage;
      };

      this.openAdminPage = function() {
        this.loginAsRoot();

        browser.get(mainSettings.mainUrl + '/admin');
        var section = element(by.id('admin_section'));
        return new AdminPage({element: section});
      };
    }

    Prototype.prototype = new PageObject();
    var prototype = new Prototype();
    return prototype;
  })();

  module.exports = Class;

})();

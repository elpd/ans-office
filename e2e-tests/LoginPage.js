var PageObject = require('./PageObject.js');
var mainSettings = require('./mainSettings');
var HomePage = require('./HomePage');

var Class = function LoginPage() {

};

Class.prototype = (function(){
  function Prototype() {
    this.get = function() {
      browser.get(mainSettings.mainUrl + '/auth/login');
    };

    this.loginAsRoot = function() {
      var user = mainSettings.rootUser;
      var emailInput = element(by.css('input[name="email"]'));
      var passwordInput = element(by.css('input[name="password"]'));
      var submitButton = element(by.id('loginSubmit'));

      emailInput.sendKeys(user.email);
      passwordInput.sendKeys(user.password);
      submitButton.click();

      return new HomePage();
    };
  }

  Prototype.prototype = new PageObject();
  var prototype = new Prototype();
  return prototype;
})();

module.exports = Class;

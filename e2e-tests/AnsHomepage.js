var PageObject = require('./PageObject.js');
var LoginPage = require('./LoginPage');
var mainSettings = require('./mainSettings');

var Class = function AnsHomepage() {

};

Class.prototype = (function(){
  function Prototype() {
    this.getAsLoggedOut = function() {
      browser.get(mainSettings.mainUrl);

      var loginPage = new LoginPage();
      return loginPage;
    };

    this.getTitle = function() {
      return browser.getTitle();
    };
  };

  Prototype.prototype = new PageObject();
  var prototype = new Prototype();
  return prototype;
})();

module.exports = Class;

var PageObject = require('./PageObject.js');
var LoginPage = require('./LoginPage');

var Class = function AnsHomepage() {

};

Class.prototype = (function(){
  function Prototype() {
    this.getAsLoggedOut = function() {
      browser.get('http://ans-mvc.app');

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

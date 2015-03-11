var PageObject = require('./PageObject.js');
var mainSettings = require('./mainSettings');

var Class = function LoginPage() {

};

Class.prototype = (function(){
  function Prototype() {
    this.get = function() {
      browser.get(mainSettings.mainUrl + '/auth/login');
    };
  };

  Prototype.prototype = new PageObject();
  var prototype = new Prototype();
  return prototype;
})();

module.exports = Class;

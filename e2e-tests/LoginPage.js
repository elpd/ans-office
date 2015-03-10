var PageObject = require('./PageObject.js');

var Class = function LoginPage() {

};

Class.prototype = (function(){
  function Prototype() {
    this.get = function() {
      browser.get('http://ans-mvc.app/auth/login');
    };
  };

  Prototype.prototype = new PageObject();
  var prototype = new Prototype();
  return prototype;
})();

module.exports = Class;

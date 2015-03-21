(function() {

  var PageObject = require('./PageObject');

  var Class = function AddWindowPageObject(params) {
    this.setParams(params);
    this.setVariables();
  };

  Class.prototype = (function() {
    function Prototype() {
      this.setParams = function(params) {
        var self = this;
        self.element = params.element;
      };

      this.setVariables = function() {
        var self = this;

      };

      
    }

    Prototype.prototype = new PageObject();
    var prototype = new Prototype();
    return prototype;

  })();

  module.exports = Class;
})();

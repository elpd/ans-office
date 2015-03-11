var PageObject = require('./../PageObject');
var mainSettings = require('./../mainSettings');

var Class = function CyclesPage() {

};

Class.prototype = (function(){
  function Prototype() {
    this.getHeader = function() {
      return element(by.css('h2.section_header'));
    };
  }

  Prototype.prototype = new PageObject();
  var prototype = new Prototype();
  return prototype;
})();

module.exports = Class;

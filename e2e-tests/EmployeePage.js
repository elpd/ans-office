var PageObject = require('./PageObject.js');
var mainSettings = require('./mainSettings');
var CyclesPage = require('./employee/CyclesPage');

var Class = function EmployeePage() {

};

Class.prototype = (function(){
  function Prototype() {
    this.openCyclesPage = function(){
      var cyclesLink = element(by.id('cycles_section_link'));
      cyclesLink.click();

      return new CyclesPage();
    };
  };

  Prototype.prototype = new PageObject();
  var prototype = new Prototype();
  return prototype;
})();

module.exports = Class;

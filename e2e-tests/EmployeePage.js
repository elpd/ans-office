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

      var cyclesPageElement = element(by.id('cycles_page'));
      return new CyclesPage({element: cyclesPageElement});
    };
  }

  Prototype.prototype = new PageObject();
  var prototype = new Prototype();
  return prototype;
})();

module.exports = Class;

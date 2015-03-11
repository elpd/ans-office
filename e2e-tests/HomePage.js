var PageObject = require('./PageObject.js');
var mainSettings = require('./mainSettings');
var EmployeePage = require('./EmployeePage');

var Class = function HomePage() {

};

Class.prototype = (function(){
  function Prototype() {
    this.openEmployeeSection = function() {
      var employeeLink = element(by.id('employee_section_link'));
      employeeLink.click();

      return new EmployeePage();
    }
  };

  Prototype.prototype = new PageObject();
  var prototype = new Prototype();
  return prototype;
})();

module.exports = Class;

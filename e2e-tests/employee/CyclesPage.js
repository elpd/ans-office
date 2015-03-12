(function() {
  var PageObject = require('./../PageObject');
  var mainSettings = require('./../mainSettings');

  var Class = function CyclesPage() {

  };

  Class.prototype = (function() {
    function Prototype() {
      this.getHeader = function() {
        return element(by.css('h2.section_header'));
      };

      this.getRows = function() {
        return element.all(by.css('#jqGrid tr.dataRow'));
      };
    }

    Prototype.prototype = new PageObject();
    var prototype = new Prototype();
    return prototype;
  })();

  module.exports = Class;
})();

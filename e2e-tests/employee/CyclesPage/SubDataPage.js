(function() {
  var Promise = require("bluebird");
  var PageObject = require('./../../PageObject');
  var mainSettings = require('./../../mainSettings');
  var AddCycleGroupPage = require('./SubDataPage/AddCycleGroupPage');

  var Class = function SubDataPage(params) {
    this.element = params.element;
  };

  Class.prototype = (function() {
    function Prototype() {
      this.waitOnData = function() {
        var loadIndicator = this.element.element(by.css(
          '.loadIndicator_finished'));
        var browserPromise = browser.wait(function() {
          return loadIndicator.isPresent();
        });

        return browserPromise;
      };

      this.openAddRowPage = function() {
        var openButton = this.element.element(by.id(
          'add_jqGrid_1_table'));
        openButton.click();

        var addPageElement = element(by.id('editmodjqGrid_1_table'));
        return new AddCycleGroupPage({
          element: addPageElement
        });
      };

      this.getRows = function() {
        var rows = this.element.all(by.css('tr.dataRow.groupData'));
        return rows;
      };
    }
    Prototype.prototype = new PageObject();

    return new Prototype();
  })();

  module.exports = Class;
})();

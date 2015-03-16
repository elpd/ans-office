(function() {
  var Promise = require("bluebird");
  var PageObject = require('./../../PageObject');
  var mainSettings = require('./../../mainSettings');
  var SubDataPage = require('./SubDataPage');

  var Class = function RowPage(params) {
    this.element = params.element;
  };

  Class.prototype = (function() {
    function Prototype() {
      this.expand = function() {
        var expendButton = this.getExpandButton();
        expendButton.click();
      };

      this.getExpandButton = function() {
        return this.element.element(by.css(
          'td[aria-describedby="jqGrid_subgrid"]'));
      };

      this.getSubDataPage = function() {
        // TODO: add class .ui-subgrid to tr xpath selector.
        var expandedRow = this.element.element(By.xpath(
          'following-sibling::tr'));

        var subDataPage = new SubDataPage({
          element: expandedRow
        });

        return subDataPage;
      };
    }
    Prototype.prototype = new PageObject();

    return new Prototype();
  })();

  module.exports = Class;
})();

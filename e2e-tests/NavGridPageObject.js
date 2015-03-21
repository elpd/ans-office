(function() {

  var PageObject = require('./PageObject');
  var AddWindowPageObject = require('./AddWindowPageObject');

  var Class = function CrudGridPageObject(params) {
    this.setParams(params);
    this.setVariables();
  };

  Class.prototype = (function() {
    function Prototype() {
      this.setParams = function(params) {
        var self = this;
        self.element = params.element;
        self.gridId = params.gridId;
      };

      this.setVariables = function() {
        var self = this;

      };

      this.getAddButtonElement = function() {
        var self = this;
        return element(by.id('add_' + self.gridId));
      };

      this.pressAdd = function() {
        var self = this;
        var addButton = self.getAddButtonElement();
        addButton.click();

        var addWindowEl = element(by.id('editmod' + self.gridId));
        var addWindow = new AddWindowPageObject({
          element: addWindowEl
        });
        return addWindow;
      };
    }

    Prototype.prototype = new PageObject();
    var prototype = new Prototype();
    return prototype;

  })();

  module.exports = Class;
})();

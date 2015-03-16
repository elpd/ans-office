(function() {
  var Promise = require("bluebird");
  var PageObject = require('./../../../PageObject');
  var mainSettings = require('./../../../mainSettings');

  var Class = function DeleteCycleGroupPage(params) {
    this.element = params.element;
  };

  Class.prototype = (function() {
    function Prototype() {
      this.doDelete = function() {
        this.doSubmit();
      };

      this.getSubmitButton = function() {
        return this.element.element(by.id('dData'));
      };

      this.doSubmit = function() {
        var submitButton = this.getSubmitButton();
        submitButton.click();
      };

      this.isPresent = function() {
        return this.element.isPresent();
      };
    }
    Prototype.prototype = new PageObject();

    return new Prototype();
  })();

  module.exports = Class;
})();

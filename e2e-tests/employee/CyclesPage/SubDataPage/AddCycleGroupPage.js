(function() {
  var Promise = require("bluebird");
  var PageObject = require('./../../../PageObject');
  var mainSettings = require('./../../../mainSettings');

  var Class = function AddCycleGroupPage(params) {
    this.element = params.element;
  };

  Class.prototype = (function() {
    function Prototype() {
      this.doAdd = function(groupData) {
        var self = this;
        self.setName(groupData.name);
        return self.setStatusByLabel(groupData.status).then(function(){
          self.doSubmit();
        });
      };

      this.getNameInput = function() {
        return this.element.element(by.id('name'));
      };

      this.getStatusInput = function() {
        return this.element.element(by.id('status_id'));
      };

      this.getSubmitButton = function() {
        return this.element.element(by.id('sData'));
      };

      this.setName = function(name) {
        var nameInput = this.getNameInput();
        nameInput.sendKeys(name);
      };

      this.setStatus = function(status_id) {
        var statusInput = this.getStatusInput();
        return browser.wait(function() {
          return statusInput.isPresent();
        },mainSettings.waitTimeout).then(function() {
          var desiredOption = statusInput.element(by.css(
            'option[value="' +
            status_id +
            '"]'));
          desiredOption.click();
        });
      };

      this.setStatusByLabel = function(status) {
        var statusInput = this.getStatusInput();
        return browser.wait(function() {
          return statusInput.isPresent();
        }, mainSettings.waitTimeout).then(function() {
          var desiredOption = statusInput.element(by.cssContainingText(
            'option',
            status));
          desiredOption.click();
        });
      };

      this.doSubmit = function() {
        var submitButton = this.getSubmitButton();
        submitButton.click();
      };
    }
    Prototype.prototype = new PageObject();

    return new Prototype();
  })();

  module.exports = Class;
})();

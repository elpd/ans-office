(function() {

  var PageObject = require('./PageObject');

  var Class = function CrudGridPageObject(params) {
    this.setParams(params);
    this.setVariables();
  };

  Class.prototype = (function() {
    function Prototype() {
      this.setParams = function(params) {
        var self = this;

        self.gridId = params.gridId;
        self.gridRowClass = params.gridRowClass;
      };

      this.setVariables = function() {
        var self = this;

        self.loadingIndicatorId = self.gridId + '_loading_indicator';
      };

      this.getHeader = function() {
        return element(by.css('h2.section_header'));
      };

      this.getCurrentUrl = function() {
        return browser.getCurrentUrl();
      };

      this.getRows = function() {
        var self = this;
        
        return element.all(by.css('#' + self.gridId +
          ' tr.dataRow.' + self.gridRowClass));
      };

      this.waitOnData = function() {
        var self = this;

        var loadingIndicator = this.element.element(by.id(
          self.loadingIndicatorId));

        var browserPromise = browser.wait(function() {
          return loadingIndicator.isPresent();
        });

        return browserPromise;
      };
    }

    Prototype.prototype = new PageObject();
    var prototype = new Prototype();
    return prototype;

  })();

  module.exports = Class;
})();

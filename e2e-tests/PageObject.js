(function(){
  var Class = function PageObject() {

  };

  Class.prototype = {
    setParams: function(params) {
      this.element = params.element;
    },

    getCurrentUrl: function() {
      return browser.getCurrentUrl();
    },

    getElement: function() {
      return this.element;
    }
  };

  module.exports = Class;
})();

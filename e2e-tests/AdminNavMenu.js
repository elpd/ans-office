(function(){
  var mainSettings = require('./mainSettings');
  var PageObject = require('./PageObject.js');

  var Class = function AdminNavMenu(params){
    this.setParams(params);
  };

  Class.prototype = (function() {
    function Prototype() {
      this.getActionLink = function(actionName) {
        var link = this.element.element(by.css('a[data-action="' + actionName +'"]'));

        return link;
      };
    }

    Prototype.prototype = new PageObject();
    var prototype = new Prototype();
    return prototype;
  })();

  module.exports = Class;
})();

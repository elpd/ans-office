(function() {
  var mainSettings = require('./mainSettings');
  var PageObject = require('./PageObject.js');
  var AdminNavMenu = require('./AdminNavMenu');

  var Class = function AdminPage(params) {
    this.element = params.element;
  };

  Class.prototype = (function() {
    function Prototype() {
      this.getAdminSection = function() {
        var section = element(by.id('admin_section'));
        return section;
      };

      this.getAdminNavMenu = function() {
        var el = element(by.id('admin_nav_menu'));
        return new AdminNavMenu({element: el});
      };
    }

    Prototype.prototype = new PageObject();
    var prototype = new Prototype();
    return prototype;
  })();

  module.exports = Class;
})();

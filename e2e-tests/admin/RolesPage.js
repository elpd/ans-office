(function() {
  var mainSettings = require('./../mainSettings');
  var Promise = require("bluebird");
  //var PageObject = require('./../PageObject');
  var CrudGridPageObject = require('./../CrudGridPageObject');

  var Class = function RolesPage(params) {
    this.element = params.element;
  };

  Class.prototype = (function() {
    function Prototype() {

    }

    Prototype.prototype = new CrudGridPageObject({
      gridId: 'roles_grid',
      gridRowClass: 'roleData'
    });
    var prototype = new Prototype();
    return prototype;
  })();

  module.exports = Class;
})();

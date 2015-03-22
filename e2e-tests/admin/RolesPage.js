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
      gridRowClass: 'roleData',
      gridPagerId: 'roles_grid_pager',
      fieldsDef: [{
        name: 'name',
        modalInputCss: 'input#name'
      }, {
          name: 'slug',
          modalInputCss: 'input#slug'
      }, {
          name: 'description',
          modalInputCss: 'input#description'
      }, {
          name: 'level',
          modalInputCss: 'input#level'
      }]
    });
    var prototype = new Prototype();
    return prototype;
  })();

  module.exports = Class;
})();

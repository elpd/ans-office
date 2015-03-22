(function() {
  var mainSettings = require('./../mainSettings');
  var Promise = require("bluebird");
  //var PageObject = require('./../PageObject');
  var CrudGridPageObject = require('./../CrudGridPageObject');

  var Class = function UsersPage(params) {
    this.element = params.element;
  };

  Class.prototype = (function() {
    function Prototype() {

    }

    Prototype.prototype = new CrudGridPageObject({
      gridId: 'users_grid',
      gridRowClass: 'userData',
      gridPagerId: 'users_grid_pager',
      fieldsDef: [{
        name: 'name',
        modalInputCss: 'input#name'
      }, {
        name: 'email',
        modalInputCss: 'input#email'
      }, {
          name: 'password',
          modalInputCss: 'input#password'
      }]
    });

    var prototype = new Prototype();
    return prototype;
  })();

  module.exports = Class;
})();

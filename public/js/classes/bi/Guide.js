define([
    'classes/BusinessObject'
  ],
  function(
    BusinessObject
  ) {
    var Class = function Guide(params) {
      this.setByParams(params);
    };

    Class.prototype = (function() {
      var Prototype = function Prototype() {
        this.toString = function() {
          return this.user.name + ' -' + this.user.email;
        };
      };

      Prototype.prototype = new BusinessObject();

      var prototype = new Prototype();

      return prototype;
    })();

    return Class;
  });

define([
    'classes/BusinessObject'
  ],
  function(
    BusinessObject
  ) {
    var Class = function Role(params) {
      this.setByParams(params);
    };

    Class.prototype = (function() {
      var Prototype = function Prototype() {
        this.toString = function() {
          return this.name;
        };
      };

      Prototype.prototype = new BusinessObject();

      var prototype = new Prototype();

      return prototype;
    })();

    return Class;
  });

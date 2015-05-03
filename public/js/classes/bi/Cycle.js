define([
    'classes/BusinessObject'
  ],
  function(
    BusinessObject
  ) {
    var Class = function Cycle(params) {
      this.setByParams(params);
    };

    Class.prototype = (function() {
      var Prototype = function Prototype() {
        this.toString = function() {
          return this.id + ' - ' + this.startDate + ' - ' + this.num;
        };
      };

      Prototype.prototype = new BusinessObject();

      var prototype = new Prototype();

      return prototype;
    })();

    return Class;
  });

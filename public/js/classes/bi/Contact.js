define([
    'classes/BusinessObject'
  ],
  function(
    BusinessObject
  ) {

    var Class = function Contact(params) {
      this.setByParams(params);
    };

    Class.prototype = (function() {
      var Prototype = function Prototype() {
        this.toString = function() {
          return this.email + this.first_name + ' ' + this.last_name;
        };
      };

      Prototype.prototype = new BusinessObject();

      var prototype = new Prototype();

      return prototype;
    })();

    return Class;
  });

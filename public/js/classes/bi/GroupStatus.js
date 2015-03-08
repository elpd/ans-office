define([
  'classes/BusinessObject'
  ],
  function(
    BusinessObject
  ) {
  var Class = function GroupStatus(params) {
    this.setByParams(params);
  };

  Class.prototype = (function(){
    var Prototype = function Prototype() {
      this.toString = function() {
        return this.status;
      };
    };

    Prototype.prototype = new BusinessObject();

    var prototype = new Prototype();

    return prototype;
  })();

  return Class;
});

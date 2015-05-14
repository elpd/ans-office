define([
  'classes/BusinessObject'
  ],
  function(
    BusinessObject
  ) {
  var Class = function (params) {
    this.setByParams(params);
  };

  Class.prototype = (function(){
    var Prototype = function Prototype() {
      this.toString = function() {
        var self = this;
        return self.id + ' - ' + self.name;
      };
    };

    Prototype.prototype = new BusinessObject();

    var prototype = new Prototype();

    return prototype;
  })();

  return Class;
});

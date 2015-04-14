define([
  'classes/BusinessObject'
  ],
  function(
    BusinessObject
  ) {

  var Class = function GroupsMembers(params) {
    this.setByParams(params);
  };

  Class.prototype = (function(){
    var Prototype = function Prototype() {
      this.toString = function() {
        return this.id;
      };
    };

    Prototype.prototype = new BusinessObject();

    var prototype = new Prototype();

    return prototype;
  })();

  return Class;
});

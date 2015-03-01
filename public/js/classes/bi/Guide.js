define([], function() {
  var Class = function Guide(params) {
    this.setByParams(params);
  };

  Class.prototype = {
    toSelectOption: function() {
      var value = this.id;
      var label = this.name;

      var html = "<option value='" +
        value +
        "'>" +
        label +
        "</option>";

      return html;
    },

    toString: function() {
        return this.name;
    },

    setByParams: function(params) {
      var self = this;
      for (var prop in params) {
        if (params.hasOwnProperty(prop)) {
          self[prop] = params[prop];
        }
      }
    }
  };

  return Class;
});

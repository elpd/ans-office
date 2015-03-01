define([], function() {
  var Class = function Contact(params) {
    this.setByParams(params);
  };

  Class.prototype = {
    toSelectOption: function() {
      var value = this.id;
      var label = this.toString();

      var html = "<option value='" +
        value +
        "'>" +
        label +
        "</option>";

      return html;
    },

    toString: function() {
      return this.first_name + ' ' + this.last_name;
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

define([], function() {
  var Class = function GroupMembersStatus(params) {
    this.setByParams(params);
  };

  Class.prototype = {
    toSelectOption: function() {
      var value = this.id;
      var label = this.status;

      var html = "<option value='" +
        value +
        "'>" +
        label +
        "</option>";

      return html;
    },

    toString: function() {
      return this.status;
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

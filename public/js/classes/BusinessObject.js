define([], function(){
  var Class = function BusinessObject() {

  };

  Class.prototype = {
    setByParams: function(params) {
      var self = this;
      for (var prop in params) {
        if (params.hasOwnProperty(prop)) {
          self[prop] = params[prop];
        }
      }
    },
    
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

    to$SelectOption: function() {
      return $(this.toSelectOption());
    }
  };

  return Class;
});

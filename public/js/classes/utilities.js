define([], function(){
  var Class = function Utilities() {

  };

  Class.prototype = {
    errorsObjectToArray: function(errosObject) {
      var errorsArray = [];

      for (errorKey in errosObject) {
        if (errosObject.hasOwnProperty(errorKey)){
          errorsArray.push(errorKey + ': ' + errosObject[errorKey]);
        }
      }

      return errorsArray;
    }
  };

  var singleton = new Class();

  return singleton;
});

define([], function(){
  var Class = function Utilities() {

  };

  Class.prototype = {
    errorsObjectToArray: function(errosObject) {
      var errorsArray = [];

      for (var errorKey in errosObject) {
        if (errosObject.hasOwnProperty(errorKey)){
          errorsArray.push(errorKey + ': ' + errosObject[errorKey]);
        }
      }

      return errorsArray;
    },

    generateGetItems: function(apiUrl, BiClass) {
      function getItems() {
        var items = {
          '0': '' // Represent null
        };

        $.ajax({
          url: apiUrl,
          async: false,
          success: function(results) {
            results.rows.forEach(function(element) {
              var bi = new BiClass(element.cell);
              items[element.id.toString()] = bi.toString();
            });
          }
        });

        return items;
      }

      return getItems;
    },

    generateBuildSelect: function(BusinessClass) {

      function buildSelect(result) {
        var resultAsObject = JSON.parse(result);
        var html = '<select>';
        // Add empty item for null representation.
        html += "<option value=''></option>";

        resultAsObject.rows.forEach(function(element) {
          var bi = new BusinessClass(element.cell);
          html = html + bi.toSelectOption();
        });
        html = html + '</select>';

        return html;
      }

      return buildSelect;
    }
  };

  var singleton = new Class();

  return singleton;
});

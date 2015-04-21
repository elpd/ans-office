define([
    'classes/utilities'
  ],
  function(
    utilities
  ) {

    var Class = function EmptySubRow(params) {
      this.parentControllerUrl = params.parentControllerUrl;
    };

    Class.prototype = {
      // the event handler on expanding parent row receives two parameters
      // the ID of the grid row  and the primary key of the row
      show: function(parentRowID, parentRowKey) {

      }
    };

    return Class;
  });

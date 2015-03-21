define([], function() {
  var Class = function LoadingIndicator(parentId) {
    this.parentId = parentId;
    this.indicatorId = parentId + '_loading_indicator';
    this.finished = null;
  };

  Class.prototype = {
    setAsFinished: function() {
      var self = this;

      self.finished = true;

      $('#' + this.parentId).append(
        '<div id="' + self.indicatorId + '"></div>');
    }
  };

  return Class;
} ) ;

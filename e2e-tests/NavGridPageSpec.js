(function() {

  var Class = function NavGridPageSpec(params) {
    this.setParams(params);
  };

  Class.prototype = {
    setParams: function(params) {
      var self = this;
      self.getPageElement = params.getPageElement;
      self.waitOnData = params.waitOnData;
    },

    specify: function() {
      var self = this;

      describe('navgrid', function() {

        var navGrid = null;

        beforeEach(function(){
          navGrid = self.getPageElement();
        });

        it('should be present', function() {
          self.waitOnData().then(function() {
            var navElement = navGrid.getElement();

            expect(navElement).not.toBeNull();
            expect(navElement.isPresent()).toBe(true);
          });
        });

        describe('options', function() {

          describe('add', function() {

            it('should be present', function() {
              self.waitOnData().then(function() {
                var addElement = navGrid.getAddButtonElement();
                expect(addElement.isPresent()).toBe(
                  true);
              });
            });

            it('should open adding window when pressing',
              function() {
                self.waitOnData().then(function() {
                  var addWindow = navGrid.pressAdd();

                  expect(addWindow).not.toBeNull();
                  expect(addWindow.getElement().isPresent()).toBe(
                    true);
                });
              });
          });
        });

      });
    }

  };

  module.exports = Class;

})();

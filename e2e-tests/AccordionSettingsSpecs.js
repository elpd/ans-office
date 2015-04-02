(function () {
    var Class = function AccordionSettingsSpecs(params) {
        this.sectionName = params.sectionName;
        this.getTestObject = params.getTestObject;
    };

    Class.prototype = {
        specify: function () {
            var self = this;

            describe(self.sectionName + ' section', function () {

                var section = null;

                beforeEach(function () {
                    section = self.getTestObject();
                });

                it('should be present', function () {
                    expect(section.getElement().isPresent()).toBe(true);
                    expect(section.getHeaderElement().isDisplayed()).toBe(true);
                });

                it('should open when pressed', function () {
                    section.open();
                    section.waitOnData().then(function () {
                        expect(section.getContentElement().isDisplayed()).toBe(true);
                    });
                });
            });
        }
    };

    module.exports = Class;
})();

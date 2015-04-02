(function () {
    var mainSettings = require('./../../../mainSettings');
    var Promise = require("bluebird");
    var AccordionSettingsPageObject = require('./../../../AccordionSettingsPageObject');

    var Class = function UserNameSettingsSectionPage(params) {
        this.setParams(params);
    };

    Class.prototype = (function () {
        function Prototype() {


        }

        Prototype.prototype = new AccordionSettingsPageObject();
        var prototype = new Prototype();
        return prototype;
    })();

    module.exports = Class;
})();

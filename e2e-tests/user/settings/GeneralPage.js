(function () {
    var mainSettings = require('./../../mainSettings');
    var PageObject = require('./../../PageObject.js');
    var UserNameSettingSectionPage = require('./general/UserNameSettingSectionPage');
    var UserEmailSettingSectionPage = require('./general/UserEmailSettingSectionPage');
    var UserPasswordSettingSectionPage = require('./general/UserPasswordSettingSectionPage');
    var UserLanguageSettingSectionPage = require('./general/UserLanguageSettingSectionPage');
    var UserThemeSettingSectionPage = require('./general/UserThemeSettingSectionPage');

    var Class = function SettingPage(params) {
        this.element = params.element;
    };

    Class.prototype = (function () {
        function Prototype() {
            var self = this;

            self.getHeader = function () {
                return element(by.css('h2.section_header'));
            };

            self.getUserNameSection = function () {
                var self = this;
                var sectionEl = self.element.element(by.id('section_settings_user_name'));
                return new UserNameSettingSectionPage({
                    element: sectionEl
                });
            };

            self.getUserEmailSection = function () {
                var self = this;
                var sectionEl = self.element.element(by.id('section_settings_user_email'));
                return new UserEmailSettingSectionPage({
                    element: sectionEl
                });
            };

            self.getUserPasswordSection = function () {
                var self = this;
                var sectionEl = self.element.element(by.id('section_settings_user_password'));
                return new UserPasswordSettingSectionPage({
                    element: sectionEl
                });
            };

            self.getUserLanguageSection = function () {
                var self = this;
                var sectionEl = self.element.element(by.id('section_settings_user_language'));
                return new UserLanguageSettingSectionPage({
                    element: sectionEl
                });
            };

            self.getUserThemeSection = function () {
                var self = this;
                var sectionEl = self.element.element(by.id('section_settings_user_ui_theme'));
                return new UserThemeSettingSectionPage({
                    element: sectionEl
                });
            };
        }

        Prototype.prototype = new PageObject();
        var prototype = new Prototype();
        return prototype;
    })();

    module.exports = Class;
})();

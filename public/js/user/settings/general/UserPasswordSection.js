define([
    'lodash',
    'classes/utilities',
    'services/language',
    'classes/AnsApplication',
    'classes/views/AccordionView',
    'classes/Controller',
    'classes/services/UserPasswordService'
], function (_,
             utilities,
             lang,
             AnsApplication,
             AccordionView,
             Controller,
             UserPasswordService) {

    var Class = function UserPasswordSection() {

    };

    Class.prototype = {
        execute: function () {
            var userPasswordController = new Controller({});
            userPasswordController.dataService = new UserPasswordService();
            userPasswordController.setPassword = function (passwordData) {
                var self = this;
                return self.dataService.update({
                    password: passwordData.password,
                    password_confirmation: passwordData.password_confirmation
                });
            };

            var userPasswordView = new AccordionView({
                viewIdentity: '#section_settings_user_password',
                controller: userPasswordController
            });
            userPasswordView.sendDataToController = function () {
                var self = this;
                var passwordConfirmation = self.getPasswordConfirmation() ? self.getPasswordConfirmation() : ' ';
                var passwordData = {
                    password: self.getPassword(),
                    password_confirmation: passwordConfirmation
                };
                return self.controller.setPassword(passwordData);
            };
            userPasswordView.getPassword = function () {
                var self = this;
                return self.get$InputPassword().val();
            };
            userPasswordView.get$InputPassword = function () {
                var self = this;
                return self.get$View().find('.input_password');
            };
            userPasswordView.getPasswordConfirmation = function () {
                var self = this;
                return self.get$InputPasswordConfirmation().val();
            };
            userPasswordView.get$InputPasswordConfirmation = function () {
                var self = this;
                return self.get$View().find('.input_password_confirmation');
            };
            userPasswordView.draw = function () {
                var self = this;
                self.get$InputPassword().val('');
                self.get$InputPasswordConfirmation().val('');
            };

            userPasswordView.init();
        }
    };

    return Class;
});
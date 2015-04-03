define([
    'lodash',
    'classes/utilities',
    'services/language',
    'classes/AnsApplication',
    'classes/views/AccordionView',
    'classes/Controller',
    'classes/services/UserEmailService'
], function (_,
             utilities,
             lang,
             AnsApplication,
             AccordionView,
             Controller,
             UserEmailService) {

    var Class = function UserEmailSection() {

    };

    Class.prototype = {
        execute: function () {
            var userEmailController = new Controller({});
            userEmailController.dataService = new UserEmailService();
            userEmailController.setEmail = function (emailData) {
                var self = this;
                return self.dataService.update({
                    email: emailData
                });
            };
            userEmailController.getEmail = function () {
                var self = this;
                return self.dataService.get();
            };

            var userEmailView = new AccordionView({
                viewIdentity: '#section_settings_user_email',
                controller: userEmailController
            });
            userEmailView.sendDataToController = function () {
                var self = this;
                var emailData = self.getEmail();
                return self.controller.setEmail(emailData);
            };
            userEmailView.getEmail = function () {
                var self = this;
                return self.get$InputEmail().val();
            };

            userEmailView.get$InputEmail = function () {
                var self = this;
                return self.get$View().find('.input_email');
            };
            userEmailView.draw = function () {
                var self = this;
                self.controller.getEmail().done(function (result) {
                    self.get$InputEmail().val(result.data.email);
                });
            };

            userEmailView.init();
        }
    };

    return Class;
});
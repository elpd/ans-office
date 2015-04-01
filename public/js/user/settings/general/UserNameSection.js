define([
    'lodash',
    'classes/utilities',
    'services/language',
    'classes/AnsApplication',
    'classes/views/AccordionView',
    'classes/Controller',
    'classes/services/UserNameService'
], function (_,
             utilities,
             lang,
             AnsApplication,
             AccordionView,
             Controller,
             UserNameService) {

    var Class = function UserNameSection() {

    };

    Class.prototype = {
        execute: function () {
            var userNameController = new Controller({});
            userNameController.dataService = new UserNameService();
            userNameController.setName = function (nameData) {
                var self = this;
                return self.dataService.update({
                    name: nameData
                });
            };
            userNameController.getName = function () {
                var self = this;
                return self.dataService.get();
            };

            var userNameView = new AccordionView({
                viewIdentity: '#section_settings_user_name',
                controller: userNameController
            });
            userNameView.sendDataToController = function () {
                var self = this;
                var nameData = self.getName();
                return self.controller.setName(nameData);
            };
            userNameView.getName = function () {
                var self = this;
                return self.get$InputName().val();
            };

            userNameView.get$InputName = function () {
                var self = this;
                return self.get$View().find('.input_name');
            };
            userNameView.draw = function () {
                var self = this;
                self.controller.getName().done(function (result) {
                    self.get$InputName().val(result.data.name);
                });
            };

            userNameView.init();
        }
    };

    return Class;
});
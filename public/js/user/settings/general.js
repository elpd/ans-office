define([
        'lodash',
        'classes/utilities',
        'services/language',
        'classes/AnsApplication',
        'classes/views/AccordionView',
        'classes/Controller',
        'classes/services/UserNameService',
        'classes/services/UserEmailService',
        'classes/services/UserPasswordService',
        'classes/services/UserSettingsService',
        'classes/services/UiLanguageService',
        'user/settings/general/UiThemeSection'
    ],
    function (_,
              utilities,
              lang,
              AnsApplication,
              AccordionView,
              Controller,
              UserNameService,
              UserEmailService,
              UserPasswordService,
              UserSettingsService,
              UiLanguageService,
              UiThemeSection) {

        $(document).ready(function () {
            var app = new AnsApplication();

            // User Name

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

            // User Email

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

            // User Password

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

            // User Language

            var userLanguageController = new Controller({});
            userLanguageController.userDataService = new UserSettingsService();
            userLanguageController.uiLanguageService = new UiLanguageService();
            userLanguageController.getUiLanguages = function () {
                var self = this;
                var promise = self.uiLanguageService.get();
                return promise.then(function (result) {
                    return _.pluck(result.rows, 'cell');
                });
            };
            userLanguageController.getUserUiLanguage = function () {
                var self = this;
                var promise = self.userDataService.get().promise();
                return promise.then(function (result) {
                    return result.data.settings.ui_language_id;
                });
            };
            userLanguageController.setUserUiLanguage = function (ui_language_id) {
                var self = this;
                var data = {
                    ui_language_id: ui_language_id
                }
                return self.userDataService.update(data);
            };

            var userLanguageView = new AccordionView({
                viewIdentity: '#section_settings_user_language',
                controller: userLanguageController
            });
            userLanguageView.sendDataToController = function () {
                var self = this;
                var data = self.getUserUiLanguage();
                return self.controller.setUserUiLanguage(data);
            };
            userLanguageView.draw = function () {
                var self = this;
                self.controller.getUiLanguages().done(function (languages) {
                    self.redrawOptions(self.get$InputUserUiLanguage(), languages);
                });
                self.controller.getUserUiLanguage().done(function (selection) {
                    self.get$InputUserUiLanguage().val(selection);
                });
            };
            userLanguageView.redrawOptions = function ($selectInput, options) {
                var $oldOptions = $selectInput.find('option');
                $oldOptions.remove();

                options.forEach(function (option) {
                    var $newOption = $('<option value="' + option.id + '">' + option.name + '</option>')
                    $selectInput.append($newOption);
                });
            };
            userLanguageView.getUserUiLanguage = function () {
                var self = this;
                return self.get$InputUserUiLanguage().val();
            };
            userLanguageView.get$InputUserUiLanguage = function () {
                var self = this;
                return self.get$View().find('.input_language');
            };

            userLanguageView.init();

            //

            var uiThemeSection = new UiThemeSection();
            uiThemeSection.execute();
        });
    });

define([
    'lodash',
    'classes/utilities',
    'services/language',
    'classes/AnsApplication',
    'classes/views/AccordionView',
    'classes/Controller',
    'classes/services/UserSettingsService',
    'classes/services/UiLanguageService'
], function (_,
             utilities,
             lang,
             AnsApplication,
             AccordionView,
             Controller,
             UserSettingsService,
             UiLanguageService) {

    var Class = function UiThemeSection() {

    };

    Class.prototype = {
        execute: function () {

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
                    self.controller.getUserUiLanguage().done(function (selection) {
                        self.get$InputUserUiLanguage().val(selection);
                    });
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
        }
    };

    return Class;
});
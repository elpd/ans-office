define([
    'lodash',
    'classes/utilities',
    'services/language',
    'classes/AnsApplication',
    'classes/views/AccordionView',
    'classes/Controller',
    'classes/services/UserSettingsService',
    'classes/services/UiThemeService'
], function (_,
             utilities,
             lang,
             AnsApplication,
             AccordionView,
             Controller,
             UserSettingsService,
             UiThemeService) {

    var Class = function UiThemeSection() {

    };

    Class.prototype = {
        execute: function () {

            var userThemeController = new Controller({});
            userThemeController.userDataService = new UserSettingsService();
            userThemeController.uiThemeDataService = new UiThemeService();
            userThemeController.getUiThemes = function () {
                var self = this;
                var promise = self.uiThemeDataService.get();
                return promise.then(function (result) {
                    return _.pluck(result.rows, 'cell');
                });
            };
            userThemeController.getUserUiTheme = function () {
                var self = this;
                var promise = self.userDataService.get().promise();
                return promise.then(function (result) {
                    return result.data.settings.ui_theme_id;
                });
            };
            userThemeController.setUserUiTheme = function (ui_theme_id) {
                var self = this;
                var data = {
                    ui_theme_id: ui_theme_id
                }
                return self.userDataService.update(data);
            };

            var userThemeView = new AccordionView({
                viewIdentity: '#section_settings_user_ui_theme',
                controller: userThemeController
            });
            userThemeView.sendDataToController = function () {
                var self = this;
                var data = self.getUserUiTheme();
                return self.controller.setUserUiTheme(data);
            };
            userThemeView.draw = function () {
                var self = this;
                self.controller.getUiThemes().done(function (themes) {
                    self.redrawOptions(self.get$InputUserUiTheme(), themes);
                    self.controller.getUserUiTheme().done(function (selection) {
                        self.get$InputUserUiTheme().val(selection);
                    });
                });

            };
            userThemeView.redrawOptions = function ($selectInput, options) {
                var $oldOptions = $selectInput.find('option');
                $oldOptions.remove();

                options.forEach(function (option) {
                    var $newOption = $('<option value="' + option.id + '">' + option.name + '</option>')
                    $selectInput.append($newOption);
                });
            };
            userThemeView.getUserUiTheme = function () {
                var self = this;
                return self.get$InputUserUiTheme().val();
            };
            userThemeView.get$InputUserUiTheme = function () {
                var self = this;
                return self.get$View().find('.input_ui_theme');
            };

            userThemeView.init();
        }
    };

    return Class;
});
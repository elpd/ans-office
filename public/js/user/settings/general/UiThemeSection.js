define([
    'lodash',
    'classes/utilities',
    'services/language',
    'classes/AnsApplication',
    'classes/views/AccordionView',
    'classes/Controller',
    'classes/services/UserSettingsService',
    'classes/services/UiBootstrapThemeService',
    'classes/services/UiJqueryUiThemeService'
], function (_,
             utilities,
             lang,
             AnsApplication,
             AccordionView,
             Controller,
             UserSettingsService,
             UiBootstrapThemeService,
             UiJqueryUiThemeService) {

    var Class = function UiThemeSection() {

    };

    Class.prototype = {
        execute: function () {

            var userThemeController = new Controller({});
            userThemeController.userDataService = new UserSettingsService();
            userThemeController.uiBootstrapThemeDataService = new UiBootstrapThemeService();
            userThemeController.uiJqueryUiThemeDataService = new UiJqueryUiThemeService();
            userThemeController.getUiBootstrapThemes = function () {
                var self = this;
                var promise = self.uiBootstrapThemeDataService.get();
                return promise.then(function (result) {
                    return _.pluck(result.rows, 'cell');
                });
            };
            userThemeController.getUiJqueryUiThemes = function () {
                var self = this;
                var promise = self.uiJqueryUiThemeDataService.get();
                return promise.then(function (result) {
                    return _.pluck(result.rows, 'cell');
                });
            };
            userThemeController.getUserUiBootstrapTheme = function () {
                var self = this;
                var promise = self.userDataService.get().promise();
                return promise.then(function (result) {
                    return result.data.settings.ui_bootstrap_theme_id;
                });
            };
            userThemeController.getUserUiJqueryUiTheme = function () {
                var self = this;
                var promise = self.userDataService.get().promise();
                return promise.then(function (result) {
                    return result.data.settings.ui_jquery_ui_theme_id;
                });
            };
            userThemeController.setUserUiBootstrapTheme = function (ui_bootstrap_theme_id) {
                var self = this;
                var data = {
                    ui_bootstrap_theme_id: ui_bootstrap_theme_id
                }
                return self.userDataService.update(data);
            };
            userThemeController.setUserUiJqueryUiTheme = function (ui_jquery_ui_theme_id) {
                var self = this;
                var data = {
                    ui_jquery_ui_theme_id: ui_jquery_ui_theme_id
                }
                return self.userDataService.update(data);
            };
            userThemeController.setUserSettings = function (settings) {
                var self = this;
                var data = {
                    ui_bootstrap_theme_id: settings.ui_bootstrap_theme_id,
                    ui_jquery_ui_theme_id: settings.ui_jquery_ui_theme_id
                };
                return self.userDataService.update(data);
            };

            var userThemeView = new AccordionView({
                viewIdentity: '#section_settings_user_ui_theme',
                controller: userThemeController
            });
            userThemeView.sendDataToController = function () {
                var self = this;

                var bootstrapData = self.getUserUiBootstrapTheme();
                var jqueryUiData = self.getUserUiJqueryUiTheme();
                return self.controller.setUserSettings({
                    ui_bootstrap_theme_id: bootstrapData,
                    ui_jquery_ui_theme_id: jqueryUiData
                });

            };
            userThemeView.draw = function () {
                var self = this;

                self.controller.getUiBootstrapThemes().done(function (themes) {
                    self.redrawOptions(self.get$InputUserUiBootstrapTheme(), themes);
                    self.controller.getUserUiBootstrapTheme().done(function (selection) {
                        self.get$InputUserUiBootstrapTheme().val(selection);
                    });
                });

                self.controller.getUiJqueryUiThemes().done(function (themes) {
                    self.redrawOptions(self.get$InputUserUiJqueryUiTheme(), themes);
                    self.controller.getUserUiJqueryUiTheme().done(function (selection) {
                        self.get$InputUserUiJqueryUiTheme().val(selection);
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
            userThemeView.getUserUiBootstrapTheme = function () {
                var self = this;
                return self.get$InputUserUiBootstrapTheme().val();
            };
            userThemeView.getUserUiJqueryUiTheme = function () {
                var self = this;
                return self.get$InputUserUiJqueryUiTheme().val();
            };
            userThemeView.get$InputUserUiBootstrapTheme = function () {
                var self = this;
                return self.get$View().find('.input_ui_bootstrap_theme');
            };
            userThemeView.get$InputUserUiJqueryUiTheme = function () {
                var self = this;
                return self.get$View().find('.input_ui_jquery_ui_theme');
            };

            userThemeView.init();
        }
    };

    return Class;
});
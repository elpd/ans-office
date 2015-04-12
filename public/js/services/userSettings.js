define([
        'classes/services/UserSettingsService',
        'classes/services/UiLanguageService',
        'services/language'
    ],
    function (
        UserSettingsService,
        UiLanguageService,
        lang
    ) {

        var userSettingsService = new UserSettingsService();
        var languageService = new UiLanguageService();

        var service = {
            load: function() {
                var self = this;

                var settingsPromise = userSettingsService.get();
                var langPromise = settingsPromise.then(function (result) {
                    self.userSettings = result.data.settings;
                    return languageService.getById(self.userSettings.ui_language_id);
                });

                var next =langPromise.then(function(language){
                    self.language = language;
                    lang.setLocale(language.code);
                });

                return next;
            },

            getLanguage: function() {
                return this.language;
            }
        };

        return service;


    });

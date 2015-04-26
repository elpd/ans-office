define(['classes/utilities',
        'classes/services/UserSettingsService',
        'classes/services/UiLanguageService',
        'services/language'
    ],
    function (utilities,
              UserSettingsService,
              UiLanguageService,
              lang) {

        var servicePromise;

        var userSettingsService = new UserSettingsService();
        var languageService = new UiLanguageService();

        var service = {
            getLanguage: function () {
                var self = this;
                return self.language;
            },

            ready: function () {
                var self = this;
                if (servicePromise == null) {
                    servicePromise = loadService(self);
                }
                return servicePromise;
            }
        };

        function loadService(self) {

            var mainPromise = new Promise(function (resolve, reject) {
                var settingsPromise = userSettingsService.get();
                var langPromise = settingsPromise.then(function (result) {
                    self.userSettings = result.data.settings;
                    return languageService.getById(self.userSettings.ui_language_id);
                });

                var next = langPromise.then(function (language) {
                    self.language = language;
                    lang.setLocale(language.code);
                });

                next.then(function () {
                    resolve(service);
                });
            });

            return mainPromise;
        };


        return service;
    });

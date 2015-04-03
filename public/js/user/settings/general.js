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
        'user/settings/general/UserNameSection',
        'user/settings/general/UserEmailSection',
        'user/settings/general/UserPasswordSection',
        'user/settings/general/UiLanguageSection',
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
              UserNameSection,
              UserEmailSection,
              UserPasswordSection,
              UiLanguageSection,
              UiThemeSection) {

        $(document).ready(function () {
            var app = new AnsApplication();

            var userNameSection = new UserNameSection();
            userNameSection.execute();

            var userEmailSection = new UserEmailSection();
            userEmailSection.execute();

            var userPasswordSection = new UserPasswordSection();
            userPasswordSection.execute();

            var uiLanguageSection = new UiLanguageSection();
            uiLanguageSection.execute();

            var uiThemeSection = new UiThemeSection();
            uiThemeSection.execute();
        });
    });

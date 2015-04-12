(function () {

    var mainSettings = require('./../../mainSettings');
    var AnsHomepage = require('./../../AnsHomepage');
    var AccordionSettingsSpecs = require('./../../AccordionSettingsSpecs');

    describe('user general settings page', function () {

        var testPage = null;

        var getTestPage = function () {
            return testPage;
        };

        beforeEach(function () {
            isAngularSite(false);

            refreshData();
            testPage = openTestPage();
        });

        it('should have address access', function () {
            expect(testPage.getCurrentUrl()).toMatch(
                /user\/settings\/general/);
        });

        it('should have header', function () {
            // TODO: extract equal data from language database.
            expect(testPage.getHeader().getText()).toEqual(
                'General Settings');
        });

        describe('settings sectiongs', function () {

            var userNameSectionSpecs = new AccordionSettingsSpecs({
                sectionName: 'user name',
                getTestObject: function(){
                    return getTestPage().getUserNameSection();
                }
            });
            userNameSectionSpecs.specify();

            var userEmailSectionSpecs = new AccordionSettingsSpecs({
                sectionName: 'user email',
                getTestObject: function(){
                    return getTestPage().getUserEmailSection();
                }
            });
            userEmailSectionSpecs.specify();

            var userPasswordSectionSpecs = new AccordionSettingsSpecs({
                sectionName: 'user password',
                getTestObject: function(){
                    return getTestPage().getUserPasswordSection();
                }
            });
            userPasswordSectionSpecs.specify();

            var userLanguageSectionSpecs = new AccordionSettingsSpecs({
                sectionName: 'user language',
                getTestObject: function(){
                    return getTestPage().getUserLanguageSection();
                }
            });
            userLanguageSectionSpecs.specify();

            var userThemeSectionSpecs = new AccordionSettingsSpecs({
                sectionName: 'user theme',
                getTestObject: function(){
                    return getTestPage().getUserThemeSection();
                }
            });
            userThemeSectionSpecs.specify();

        });
    });

    function refreshData() {
        browser.get(mainSettings.mainUrl + '/test/refresh');
    }

    function openTestPage() {
        var ansHomepage = new AnsHomepage({
            element: element(by.css('body'))
        });
        var usersPage = ansHomepage.openGeneralSettingsUserPage();

        return usersPage;
    }

})();

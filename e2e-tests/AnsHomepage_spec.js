(function () {
    var AnsHomepage = require('./AnsHomepage');
    var MainNavbarPageObjectSpec = require('./MainNavbarPageObjectSpec');

    var ansHomepage = null;

    describe('ans homepage', function () {

        beforeEach(function () {
            isAngularSite(false);
            ansHomepage = new AnsHomepage({
                element: element(by.css('body'))
            });
        });

        it('should have a title', function () {
            var loginPage = ansHomepage.getAsLoggedOut();

            expect(ansHomepage.getTitle()).toEqual('ANS Office System');
        });

        var mainNavbarPageObjectSpec = new MainNavbarPageObjectSpec({
            getPageObject: function() {
                return ansHomepage.getMainNavbar();
            },
            parentWaitOnData: function() {
                return ansHomepage.waitOnData();
            }
        });
        mainNavbarPageObjectSpec.specify();

        it('should redirect to login page', function () {
            var loginPage = ansHomepage.getAsLoggedOut();

            expect(browser.getCurrentUrl()).toMatch(/\/auth\/login/);
        });
    });
})();


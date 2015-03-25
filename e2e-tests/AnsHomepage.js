(function () {
    var mainSettings = require('./mainSettings');
    var PageObject = require('./PageObject.js');
    var AdminPage = require('./AdminPage');
    var LoginPage = require('./LoginPage');
    var UsersPage = require('./admin/UsersPage');
    var RolesPage = require('./admin/RolesPage');
    var PermissionsPage = require('./admin/PermissionsPage');
    var MainNavbarPageObject = require('./MainNavbarPageObject');

    var Class = function AnsHomepage(params) {
        var self = this;
        self.setParams(params);
    };

    Class.prototype = (function () {
        function Prototype() {
            this.setParams = function(params) {
                var self = this;
                self.element = params.element;
            };

            this.getAsLoggedOut = function () {
                browser.manage().deleteAllCookies();
                browser.get(mainSettings.mainUrl);

                var loginPage = new LoginPage();
                return loginPage;
            };

            this.getTitle = function () {
                return browser.getTitle();
            };

            this.getMainNavbar = function() {
                var el = this.element.element(by.id('main_navbar'));
                return new MainNavbarPageObject({
                    element: el
                });
            };

            this.waitOnData = function() {
                return browser.wait(function(){
                    return true;
                });
            };

            this.loginAsRoot = function () {
                var loginPage = this.getAsLoggedOut();
                var homePage = loginPage.loginAsRoot();

                return homePage;
            };

            this.openAdminPage = function () {
                this.loginAsRoot();

                browser.get(mainSettings.mainUrl + '/admin');
                var section = element(by.id('admin_section'));
                return new AdminPage({
                    element: section
                });
            };

            this.openUsersPage = function () {
                this.loginAsRoot();

                browser.get(mainSettings.mainUrl + '/admin/users');
                var section = element(by.id('users_page'));
                return new UsersPage({
                    element: section
                });
            };

            this.openRolesPage = function () {
                this.loginAsRoot();

                browser.get(mainSettings.mainUrl + '/admin/roles');
                var section = element(by.id('roles_page'));
                return new RolesPage({
                    element: section
                });
            };


            this.openPermissionsPage = function () {
                var self = this;
                self.loginAsRoot();

                browser.get(mainSettings.mainUrl + '/admin/permissions');
                var section = element(by.id('permissions_page'));
                return new PermissionsPage({
                    element: section
                })
            };
        }

        Prototype.prototype = new PageObject();
        var prototype = new Prototype();
        return prototype;
    })();

    module.exports = Class;

})();

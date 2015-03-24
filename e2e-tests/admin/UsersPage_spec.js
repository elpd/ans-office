(function () {
    var CrudGridPageSpec = require('./../CrudGridPageSpec');
    var UsersPage = require('./UsersPage.js');
    var AnsHomepage = require('./../AnsHomepage');

    var specs = new CrudGridPageSpec({
        TestPageClass: UsersPage,
        testPageName: 'UsersPage',
        openTestPage: function () {
            var ansHomepage = new AnsHomepage();
            var usersPage = ansHomepage.openUsersPage();

            return usersPage;
        },
        pageAddressRegex: /admin\/users/,
        headerLabel: 'Users',
        testData: {
            rows: [{
                id: 1,
                name: 'root',
                email: 'root@example.com'
            }, {
                id: 2,
                name: 'user_1',
                email: 'user_1@example.com'
            }]
        },
        addParams: {
            name: 'user_c',
            email: 'user_c@example.com',
            password: 'first_password'
        },
        removeSpec: {
            by: 'email',
            value: 'user_1@example.com'
        }
    });

    specs.specify();

})();

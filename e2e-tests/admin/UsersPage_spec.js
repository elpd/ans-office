(function () {
    var CrudGridPageSpec = require('./../CrudGridPageSpec');
    var UsersPage = require('./UsersPage.js');
    var AnsHomepage = require('./../AnsHomepage');

    var specs = new CrudGridPageSpec({
        testPageName: 'UsersPage',
        openTestPage: function () {
            var ansHomepage = new AnsHomepage({
                element: element(by.css('body'))
            });
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
        },
        updateSpec: {
            fields: [
                {
                    name: 'name',
                    newValue: 'user_2'
                },
                {
                    name: 'email',
                    newValue: 'user_2@example.com'
                },
                {
                    name: 'password',
                    newValue: 'user_2_password'
                }
            ],
            keyName: 'email',
            keyValue: 'user_1@example.com'
        }
    });

    specs.specify();

})();

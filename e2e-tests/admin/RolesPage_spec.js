(function () {
    var CrudGridPageSpec = require('./../CrudGridPageSpec');
    var RolesPage = require('./RolesPage.js');
    var AnsHomepage = require('./../AnsHomepage');

    var specs = new CrudGridPageSpec({
        testPageName: 'RolesPage',
        openTestPage: function () {
            var ansHomepage = new AnsHomepage({
                element: element(by.css('body'))
            });
            var rolesPage = ansHomepage.openRolesPage();

            return rolesPage;
        },
        pageAddressRegex: /admin\/roles/,
        headerLabel: 'Roles',
        testData: {
            rows: [{
                id: 1,
                name: 'Admin'
            }, {
                id: 2,
                name: 'Employee'
            }, {
                id: 2,
                name: 'User'
            }, {
                id: 2,
                name: 'Guest'
            }]
        },
        addParams: {
            name: 'moderator',
            slug: 'moderator',
            description: 'moderating activites',
            level: 1
        },
        removeSpec: {
            by: 'slug',
            value: 'guest'
        },
        updateSpec: {
            fields: [
                {
                    name: 'name',
                    newValue: 'Moderator'
                },
                {
                    name: 'slug',
                    newValue: 'moderator'
                },
                {
                    name: 'description',
                    newValue: 'moderation rights'
                },
                {
                    name: 'level',
                    newValue: '2'
                }
            ],
            keyName: 'slug',
            keyValue: 'guest'
        }
    });

    specs.specify();

})();

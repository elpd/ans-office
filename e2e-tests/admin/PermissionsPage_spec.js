(function () {
    var CrudGridPageSpec = require('./../CrudGridPageSpec');
    var UsersPage = require('./UsersPage.js');
    var AnsHomepage = require('./../AnsHomepage');

    var specs = new CrudGridPageSpec({
        testPageName: 'PermissionsPage',
        openTestPage: function () {
            var ansHomepage = new AnsHomepage();
            return ansHomepage.openPermissionsPage();
        },
        pageAddressRegex: /admin\/permissions/,
        headerLabel: 'Permissions',
        testData: {
            rows: [{
                id: 1,
                name: 'Edit Template',
                slug: 'edit.template',
                description: '',
                model: 'DocumentTemplate'
            }, {
                id: 2,
                name: 'View Template',
                slug: 'view.template',
                description: '',
                model: 'DocumentTemplate'
            }]
        },
        addParams: {
            name: 'View Users',
            slug: 'view.users',
            description: 'view users list',
            model: 'User'
        },
        removeSpec: {
            by: 'slug',
            value: 'edit.template'
        },
        updateSpec: {
            fields: [
                {
                    name: 'name',
                    newValue: 'Edit letter'
                },
                {
                    name: 'slug',
                    newValue: 'edit-letter'
                },
                {
                    name: 'description',
                    newValue: 'Edit letter for customers'
                },
                {
                    name: 'model',
                    newValue: 'Letter'
                }
            ],
            keyName: 'slug',
            keyValue: 'edit.template'
        }
    });

    specs.specify();

})();

(function() {
  var CrudGridPageSpec = require('./../CrudGridPageSpec');
  var RolesPage = require('./RolesPage.js');
  var AnsHomepage = require('./../AnsHomepage');

  var specs = new CrudGridPageSpec({
    TestPageClass: RolesPage,
    testPageName: 'RolesPage',
    openTestPage: function() {
      var ansHomepage = new AnsHomepage();
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
    }
  });

  specs.specify();

})();

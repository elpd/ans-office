(function(){
  var AdminPage = require('./AdminPage');
  var AnsHomepage = require('./AnsHomepage');

  var adminPage = null;

  function openAdminPage() {
    var ansHomepage = new AnsHomepage();
    adminPage = ansHomepage.openAdminPage();

    return adminPage;
  }

  describe('admin page', function() {
    beforeEach(function() {
      isAngularSite(false);
      adminPage = openAdminPage();
    });

    it('should have currect address', function(){
      var currentUrl = adminPage.getCurrentUrl();
      expect(currentUrl).toMatch(/\/admin/);
    });

    it('should have admin section', function() {
      var adminSection = adminPage.getAdminSection();

      expect(adminSection.isPresent()).toBe(true);
    });

    describe('admin nav menu', function(){
      var adminNavMenu = null;

      beforeEach(function(){
        adminNavMenu = adminPage.getAdminNavMenu();
      });

      it('should have link actions', function(){
        var actions = ['usersList', 'rolesList', 'permissionsList'];

        actions.forEach(function(element){
          var action_element = adminNavMenu.getActionLink(element);

          expect(action_element.isPresent()).toBe(true);
        });
      });
    });
  });
})();

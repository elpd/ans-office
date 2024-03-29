(function() {
  var CyclesPage = require('./CyclesPage.js');
  var AnsHomepage = require('./../AnsHomepage');

  function openCyclesPage() {
    var ansHomepage = new AnsHomepage();
    var loginPage = ansHomepage.getAsLoggedOut();
    var homePage = loginPage.loginAsRoot();
    var employeePage = homePage.openEmployeeSection();
    var cyclesPage = employeePage.openCyclesPage();

    return cyclesPage;
  }

  var cyclesPage = null;

  describe('Cycles Page', function() {
    beforeEach(function() {
      isAngularSite(false);
      cyclesPage = openCyclesPage();
    });

    it('should be accessible from address bar', function() {
      expect(cyclesPage.getCurrentUrl()).toMatch(/employee\/cycles/);
    });

    it('should have header', function() {
      expect(cyclesPage.getHeader().getText()).toEqual('Cycles');
    });

    it('should have 2 data rows', function() {
      var loadIndicator = element(by.id('loading_indicator_finished'));
      browser.wait(function() {
        return loadIndicator.isPresent();
      }, 3000).then(function() {
        var rows = cyclesPage.getRows();

        rows.then(function(itemsRows) {
          expect(itemsRows).toBeDefined();
          expect(itemsRows.length).toEqual(2);
        });
      });
    });

    describe('- sub data', function() {

      it('should be with existing expand sub data element ', function() {
        var loadIndicator = element(by.id(
          'loading_indicator_finished'));
        browser.wait(function() {
          return loadIndicator.isPresent();
        }, 3000).then(function() {
          var cycleInt = cyclesPage.getCycleInt(0);
          var expandButton = cycleInt.getExpandButton();

          expect(expandButton).not.toBeNull();
        });

      });

      it('should be able to expand  ', function() {
        var loadIndicator = element(by.id(
          'loading_indicator_finished'));
        browser.wait(function() {
          return loadIndicator.isPresent();
        }, 3000).then(function() {
          var cycleInt = cyclesPage.getCycleInt(0);
          cycleInt.expand();
          var cycleSubDataInt = cycleInt.getExpendedRow();

          var subDataPromise = cycleSubDataInt.waitOnData();
          subDataPromise.then(function() {
            var groups = cycleSubDataInt.getRows();

            expect(groups).not.toBeNull();
            expect(groups.count()).toBe(2);
          });

        });
      });

      it('should be able to add sub group', function() {
        cyclesPage.waitOnData().then(function() {
          rowPage = cyclesPage.getRowPage(0);
          rowPage.expand();
          subDataPage = rowPage.getSubDataPage();
          subDataPage.waitOnData().then(function() {
            subDataPage.openAddRowPage().then(function(
              addRowPage) {
              addRowPage.doAdd({
                name: 'a',
                status: 'registration'
              });

              subDataPage.waitOnData().then(function() {
                var subRows = subDataPage.getRows();
                expect(subRows.count()).toBe(3);
              });
            });
          });
        });
      });

      it('should be able to remove sub group', function() {
        cyclesPage.waitOnData().then(function() {
          rowPage = cyclesPage.getRowPage(0);
          rowPage.expand();
          subDataPage = rowPage.getSubDataPage();
          subDataPage.waitOnData().then(function() {
            var oldCountP = subDataPage.getRows().count();
            oldCountP.then(function(oldCount) {
              subDataPage.openDeleteRowPage({
                row: 0
              }).then(function(deleteRowPage) {
                deleteRowPage.doDelete();

                //expect(deleteRowPage.isPresent()).toBe(false);

                subDataPage.waitOnData().then(
                  function() {
                    var subRows = subDataPage.getRows();

                    expect(subRows.count())
                      .toBe(oldCount - 1);
                  });
              });
            });
          });
        });
      });
    });

  });
})();

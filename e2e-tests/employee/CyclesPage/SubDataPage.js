(function() {
  var Promise = require("bluebird");
  var PageObject = require('./../../PageObject');
  var mainSettings = require('./../../mainSettings');
  var AddCycleGroupPage = require('./SubDataPage/AddCycleGroupPage');
  var DeleteCycleGroupPage = require('./SubDataPage/DeleteCycleGroupPage');

  var Class = function SubDataPage(params) {
    this.element = params.element;
  };

  Class.prototype = (function() {
    function Prototype() {
      this.waitOnData = function() {
        var loadIndicator = this.element.element(by.css(
          '.loadIndicator_finished'));
        var browserPromise = browser.wait(function() {
          return loadIndicator.isPresent();
        }, mainSettings.waitTimeout);

        return browserPromise;
      };

      this.openAddRowPage = function() {
        var self = this;
        var pagePromise = new Promise(function(resolve, reject) {
          self.getGridId().then(function(gridId) {

            var openButton = self.element.element(by.id(
              'add_' + gridId + '_table'));
            openButton.click();

            function getAddPageElement(){
              var el = element(by.id('editmod' + gridId + '_table'));
              return el;
            }

            var addPage = null;

            browser.wait(function() {
              addPage = getAddPageElement();
              return addPage.isPresent();
            }, mainSettings.waitTimeout).then(function(){
              var page = new AddCycleGroupPage({
                element: addPage
              });

              resolve(page);
            });
          });
        });

        return pagePromise;
      };

      this.getGridId = function() {
        var table_el = this.element.element(by.css('div.tablediv'));
        var idPromise = table_el.getAttribute('id');

        return idPromise;
      };

      this.getRows = function() {
        var rows = this.element.all(by.css('tr.dataRow.groupData'));
        return rows;
      };

      this.openDeleteRowPage = function(groupData) {

        var self = this;
        var pagePromise = new Promise(function(resolve, reject) {
          self.getGridId().then(function(gridId) {

            // Select row.
            var rows = self.getRows();
            rows.get(0).click();

            var deleteButton = self.element.element(by.id(
              'del_' + gridId + '_table'));
            deleteButton.click();

            var deletePageElement = element(by.id('delmod' +
              gridId + '_table'));
            var page = new DeleteCycleGroupPage({
              element: deletePageElement
            });

            resolve(page);
          });
        });

        return pagePromise;
      };
    }
    Prototype.prototype = new PageObject();

    return new Prototype();
  })();

  module.exports = Class;
})();

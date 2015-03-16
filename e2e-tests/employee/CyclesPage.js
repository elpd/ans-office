(function() {
  var Promise = require("bluebird");
  var PageObject = require('./../PageObject');
  var mainSettings = require('./../mainSettings');
  var RowPage = require ('./CyclesPage/RowPage');

  var Class = function CyclesPage(params) {
    this.element = params.element;
  };

  Class.prototype = (function() {
    function Prototype() {
      this.getHeader = function() {
        return element(by.css('h2.section_header'));
      };

      this.getRows = function() {
        return element.all(by.css('#jqGrid tr.dataRow.cycleData'));
      };

      this.getCurrentUrl = function() {
        return browser.getCurrentUrl();
      };

      this.getCycleInt = function(index) {
        var cyclesRows = this.getRows();
        var cycleRow = cyclesRows.get(index);
        var cycleInt = new CycleInterface({
          element: cycleRow
        });

        return cycleInt;
      };

      this.getRowPage = function(index) {
        var cyclesRows = this.getRows();
        var cycleRow = cyclesRows.get(index);
        var rowPage = new RowPage({
          element: cycleRow
        });

        return rowPage;
      };

      this.waitOnData = function() {
        var loadIndicator = this.element.element(by.id(
          'loading_indicator_finished'));
        var browserPromise = browser.wait(function() {
          return loadIndicator.isPresent();
        });

        return browserPromise;
      };
    }

    Prototype.prototype = new PageObject();
    var prototype = new Prototype();
    return prototype;
  })();

  module.exports = Class;

  var CycleInterface = (function() {
    function Class(params) {
      this.element = params.element;
    }

    Class.prototype = {
      getExpandButton: function() {
        return this.element.element(by.css(
          'td[aria-describedby="jqGrid_subgrid"]'));
      },

      expand: function() {
        var expendButton = this.getExpandButton();
        expendButton.click();
      },

      getExpendedRow: function() {
        var self = this;
        //         var expandedRowPromise = new Promise(function(resolve, reject){
        //           var idPromise = self.element.getAttribute('id');
        //           idPromise.then(function(id){
        //             var expandedElement = element(by.css('#' +
        //             id +
        //             '+ .ui-subgrid'));
        // //'.dataRow.cycleData' +
        //             var subDataInterface = new SubDataInterface({
        //               element: expandedElement
        //             });
        //
        //             resolve(subDataInterface);
        //           });
        //         });

        // TODO: add class .ui-subgrid to tr xpath selector.
        var expandedRow = this.element.element(By.xpath(
          'following-sibling::tr'));

        var subDataInterface = new SubDataInterface({
          element: expandedRow
        });

        return subDataInterface;
      }
    };

    var SubDataInterface = (function() {
      function Class(params) {
        this.element = params.element;
      }

      Class.prototype = {
        waitOnData: function() {
          var loadIndicator = this.element.element(by.css(
            '.loadIndicator_finished'));
          var browserPromise = browser.wait(function() {
            return loadIndicator.isPresent();
          });

          return browserPromise;
        },

        getRows: function() {
          return this.element.all(by.css('tr.dataRow.groupData'));
        }
      };

      return Class;
    })();

    return Class;
  })();
})();

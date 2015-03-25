(function () {
    var mainSettings = require('./../mainSettings');
    var Promise = require("bluebird");
    var CrudGridPageObject = require('./../CrudGridPageObject');

    var Class = function PermissionsPage(params) {
        this.element = params.element;
    };

    Class.prototype = (function () {
        function Prototype() {

        }

        Prototype.prototype = new CrudGridPageObject({
            gridId: 'permissions_grid',
            gridRowClass: 'permissionData',
            gridPagerId: 'permissions_grid_pager',
            fieldsDef: [{
                name: 'name',
                modalInputCss: 'input#name'
            }, {
                name: 'slug',
                modalInputCss: 'input#slug'
            }, {
                name: 'description',
                modalInputCss: 'input#description'
            }, {
                name: 'model',
                modalInputCss: 'input#model'
            }]
        });

        var prototype = new Prototype();
        return prototype;
    })();

    module.exports = Class;
})();

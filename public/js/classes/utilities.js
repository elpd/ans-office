define([], function () {
    var Class = function Utilities() {

    };

    Class.prototype = {
        errorsObjectToArray: function (errosObject) {
            var errorsArray = [];

            for (var errorKey in errosObject) {
                if (errosObject.hasOwnProperty(errorKey)) {
                    errorsArray.push(errorKey + ': ' + errosObject[errorKey]);
                }
            }

            return errorsArray;
        },

        generateGetItems: function (apiUrl, BiClass) {
            function getItems() {
                var items = {
                    '0': '' // Represent null
                };

                var dataPromise = $.ajax({
                    url: apiUrl,
                    async: false,
                    success: function (results) {
                        results.rows.forEach(function (element) {
                            var bi = new BiClass(element.cell);
                            items[element.id.toString()] = bi.toString();
                        });
                    }
                });

                Object.defineProperty(items, '_promise', {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: dataPromise
                });

                return items;
            }

            return getItems;
        },

        generateBuildSelect: function (BusinessClass) {

            function buildSelect(result) {
                var resultAsObject = JSON.parse(result);
                var html = '<select>';
                // Add empty item for null representation.
                html += "<option></option>";

                resultAsObject.rows.forEach(function (element) {
                    var bi = new BusinessClass(element.cell);
                    html = html + bi.toSelectOption();
                });
                html = html + '</select>';

                return html;
            }

            return buildSelect;
        },

        generateDateTimePicker: function (element) {
            $(element).datetimepicker({
                dateFormat: 'yy-mm-dd',
                timeFormat: 'HH:mm:ss'
            });
        },

        strEndsWith: function (str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        },

        arrayMove: function (array, old_index, new_index) {
            if (new_index >= array.length) {
                var k = new_index - array.length;
                while ((k--) + 1) {
                    array.push(undefined);
                }
            }
            array.splice(new_index, 0, array.splice(old_index, 1)[0]);
            return array; // for testing purposes
        },

        generateOptions: function(itemsPackage, BusinessObject) {
            var options = [];

            _.forEach(itemsPackage.rows, function(row){
                var bi = new BusinessObject(row.cell);
                var $option = bi.to$SelectOption();

                options.push($option);
            });

            return options;
        }
    };

    var singleton = new Class();

    return singleton;
});

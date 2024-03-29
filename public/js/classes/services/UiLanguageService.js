define([
    '../Service'
], function (Service) {
    var API_URL = '/api/ui_language';

    var Class = function UiLanguageService(params) {
        params ? this.setParams(params) : null;
    };

    Class.prototype = (function () {
        function Prototype() {
            var self = this;
            self.get = function () {
                return $.ajax({
                    dataType: "json",
                    url: API_URL,
                    data: {
                        _token: $_token
                    },
                    success: null
                });
            };

            self.getById = function(id) {
                return $.ajax({
                    dataType: "json",
                    url: API_URL + '/' + id,
                    data: {
                        _token: $_token,
                    },
                    success: null
                });
            };
        }

        Prototype.prototype = new Service();

        return new Prototype();
    })();

    return Class;
});

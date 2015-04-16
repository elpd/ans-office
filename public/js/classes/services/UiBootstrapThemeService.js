define([
    '../Service'
], function (Service) {
    var API_URL = '/api/ui_bootstrap_theme';

    var Class = function UiBootstrapThemeService(params) {
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

        }

        Prototype.prototype = new Service();

        return new Prototype();
    })();

    return Class;
});

define([], function () {

    var Class = function UserNameSettingController(params) {
        this.viewIdentifier = params.viewIdentifier;
    };

    Class.prototype = {
        init: function () {
            var self = this;
            self.getData(function (response) {
                self.setInputs(response.data);
            });
        },

        submit: function (fields) {
            var self = this;
            $.ajax({
                url: '/api/user-name',
                type: 'PUT',
                data: {
                    _token: $_token,
                    fields: fields
                }
            });
        },

        getData: function (handler) {
            $.getJSON("/api/user-name", handler);
        }

    };

    return Class;
});

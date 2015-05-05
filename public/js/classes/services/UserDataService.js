define([
    '../Service'
], function(
    Service
){
    var API_URL = '/api/user-data';

    var Class = function (params) {
       Service.call(this, params);
    };

    Class.prototype = Object.create(Service.prototype, {
        get: {
            value: function() {
                var self = this;
                return $.ajax({
                    dataType: "json",
                    url: API_URL,
                    data: {
                        _token: $_token
                    },
                    success: function(result) {
                        setDataByResult(self, result);
                    }
                });
            }
        }
    });

    function setDataByResult(self, result) {
        self.user = result.data.user;
        self.roles = result.data.roles;
        self.permissions = result.data.permissions;
    }

    return Class;
});

define([
    '../Service'
], function(
    Service
){
    var API_URL = '/api/user-email';
    var Class = function UserEmailService(params) {
        params ? this.setParams(params) : null;
    };

    Class.prototype = (function(){
        function Prototype(){
            var self = this;
            self.get = function() {
                return $.ajax({
                    dataType: "json",
                    url: API_URL,
                    data: {
                        _token: $_token
                    },
                    success: null
                });
            };

            self.update = function(data) {
                return $.ajax({
                    type: 'PUT',
                    url: API_URL,
                    data: {
                        _token: $_token,
                        data: data
                    }
                });
            };
        }

        Prototype.prototype = new Service();

        return new Prototype();
    })();

    return Class;
});

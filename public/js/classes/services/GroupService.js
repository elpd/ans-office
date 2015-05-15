define([
    '../Service'
], function(
    Service
){
    var API_URL = '/api/group';

    var Class = function (params) {
       Service.apply(this, params);
    };

    Class.prototype = Object.create(Service.prototype, {
        query: {
            value: function(params) {
                var query = {
                  filters: params.filter
                };

                return $.ajax({
                    dataType: "json",
                    url: API_URL,
                    data: {
                        _token: $_token,
                        _query: query
                    },
                    success: null
                });
            }
        }
    });

    return Class;
});

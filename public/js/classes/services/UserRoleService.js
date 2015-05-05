define([
    '../Service'
], function(
    Service
){
    var API_URL = '/api/user-role';

    var Class = function (params) {
       Service.call(this, params);
    };

    Class.prototype = Object.create(Service.prototype, {
        query: {
            value: function() {
                return $.ajax({
                    dataType: "json",
                    url: API_URL,
                    data: {
                        _token: $_token
                    },
                    success: null
                });
            }
        },

        hasRoleGuide: {
            value: function(roles) {
                if (_.indexOf(_.pluck(roles, 'slug'), 'guide') >= 0){
                    return true;
                }

                return false
            }
        }
    });

    return Class;
});

define(['classes/utilities',
        'classes/services/UserDataService'
    ],
    function (utilities,
              UserDataService) {

        var servicePromise;

        var service = {
            ready: function () {
                var self = this;
                if (servicePromise == null) {
                    servicePromise = loadService(self);
                }
                return servicePromise;
            },
            getUser: function() {
                var self = this;
                return self._user;
            },
            roles: function() {
                var self = this;
                return {
                    hasRoleGuide: function() {
                        if (_.indexOf(_.pluck(self._roles, 'slug'), 'guide') >= 0){
                            return true;
                        }

                        return false;
                    }
                }
            },
            getLanguageDesc: function() {
                var self = this;
                return self._language_description;
            }
        };

        function loadService(self) {

            var mainPromise = new Promise(function (resolve, reject) {
                var userDataService = new UserDataService();
                userDataService.get().
                    then(function (userDataResult) {
                        self._user = userDataResult.data.user;
                        self._roles = userDataResult.data.roles;
                        self._permissions = userDataResult.data.permissions;
                        self._settings = userDataResult.data.settings;
                        self._language_description = userDataResult.data.language_description;
                    }).
                    then(function () {
                        resolve(service);
                    });
            });

            return mainPromise;
        };


        return service;
    });

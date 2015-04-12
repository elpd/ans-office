define([
        'lodash'
    ],
    function (_) {

        var Class = function Language(params) {
            this.dataset = params.dataset;
            this.locale = params.locale ? params.locale : null;
            this.fallback = params.fallback ? params.fallback : 'en';
        };

        Class.prototype = {
            get: function (key, locale) {
                var self = this;
                var parsedKey = self.parseKey(key);

                var localesToUse = self.parseLocale(locale);
                var line = null;
                _.find(localesToUse, function(localeItem){
                    line = self.getLine(parsedKey, localeItem);
                    return (line != null);
                });

                if (line == null) {
                    return key;
                }

                return line;
            },

            parseKey: function (key) {
                var key_parts = basicParseKey(key);

                if (key_parts.namespace == null) {
                    key_parts.namespace = '*';
                }

                return key_parts;
            },

            parseLocale: function(locale) {
                var self = this;
               if (locale != null) {
                   return _.without([
                      locale,
                       self.fallback
                   ]);
               } else {
                   return _.without([
                       self.locale,
                       self.fallback
                   ], null);
               }

            },

            getLine: function(parsedKey, locale) {
                var self = this;
                if (!self.dataset.hasOwnProperty(parsedKey.namespace)){
                    return null;
                }
                var namespaceData = self.dataset[parsedKey.namespace];

                if (!namespaceData.hasOwnProperty(parsedKey.group)){
                    return null;
                }
                var groupData = namespaceData[parsedKey.group];

                if (!groupData.hasOwnProperty(locale)){
                    return null;
                }
                var localeData = groupData[locale];

                if (!localeData.hasOwnProperty(parsedKey.item)){
                    return null;
                }
                var line = localeData[parsedKey.item];

                if (typeof line == 'string') {
                    return line;
                    // TODO: replacments
                } else {
                    throw new Exception('unimplemented');
                }
            },

            setLocale: function(localeCode) {
                this.locale = localeCode;
            }
        };

        function basicParseKey(key) {
            if (key.indexOf('::') < 0) {
                var parts = key.split('.');
                var group = parts[0];
                if (parts.length == 1) {
                    return {
                        namespace: null,
                        group: group,
                        item: null
                    };
                } else {
                    var item = parts.slice(1).join('.');

                    return {
                        namespace: null,
                        group: group,
                        item: item
                    };
                }
            } else {
                // TODO: develop same as laravel namespaces
                throw new Error('unimplemented');
            }
        }

        return Class;
    });

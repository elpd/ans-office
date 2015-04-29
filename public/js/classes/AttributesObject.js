define([], function () {
    var Class = function (params, attributesRules) {
        var self = this;
        self.setAttributes(attributesRules, params);
    };

    Class.prototype = Object.create(Object.prototype, {
        setAttributes: {
            value: function (attributes, params) {
                var self = this;
                var attList = createAttributesListByDependencies(attributes);
                _.forEach(attList, function (attDef, attKey) {
                    setMutatorsForAttribute(self, attDef, attKey);
                    setInitialValueForAttribute(self, attDef, attKey, params);
                });
            }
        }
    });

    function createAttributesListByDependencies(attributes) {
        // TODO
        return attributes;
    }

    function setMutatorsForAttribute(self, attDef, attKey) {
        if (attDef.mutators) {
            var mutators = attDef.mutators;
            if (mutators.setget){
                Object.defineProperty(self, attKey, {
                    set: mutators.setget.set,
                    get: mutators.setget.get
                });
            }
        }
    }

    function setInitialValueForAttribute(self, attDef, attKey, params) {
        var required = calcRequired(self, attDef);

        if (params.hasOwnProperty(attKey)) {
            self[attKey] = params[attKey];

        } else if (attDef.defaults && required) {
            self[attKey] = calcAttributeDefault(self, attDef);

        } else if (required) {
            throw new Error('Initialization of object failed. Missing required attribute: ' +
                attKey
            );
        }
    }

    function calcRequired(self, attDef) {
        if (!attDef.hasOwnProperty('required')) {
            return false;
        }
        if (_.isFunction(attDef.required)) {
            attDef.required.apply(self, null);

        } else {
            return attDef.required;
        }
    }

    function calcAttributeDefault(self, attDef) {
        var dependenciesValues = [];
        var defaults = attDef.defaults;

        if (defaults.hasOwnProperty('dependencies')) {

            _.forEach(attDef.defaults.dependencies, function (depName) {
                if (!self.hasOwnProperty(depName)) {
                    throw new Error('something wrong in attributes dependencies list');
                }
                dependenciesValues.push(self[depName]);
            });
        }

        if (_.isFunction(defaults.calculation)) {
            return defaults.calculation.apply(self, dependenciesValues);
        } else {
            return defaults.calculation;
        }
    }

    return Class;
});
define([], function(){
   var Class = function(){

   };

    Class.prototype = {
        setVariables: function(){
            var self = this;
            var dependenciesResolved = {};
            _.forEach(self.variablesDefinitions, function(definition, key){
                if (self[key] == null && definition.defaults != null) {
                    // TODO: graph dependency resolution.
                    var dependenciesValues = _.map(definition.dependencies, function(dependencyKey){
                        if (!dependenciesResolved.hasOwnProperty(dependencyKey)) {
                            throw new Error('unimplemented dependency graph');
                        }

                        return dependenciesResolved[dependencyKey];
                    });
                    self[key] = definition.defaults.apply(null, dependenciesValues);
                    dependenciesResolved[key] = self[key];

                } else {
                    dependenciesResolved[key] = self[key];
                }
            });
        }
    };

    return Class;
});
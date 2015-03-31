define([], function(){
   var Class = function View(params) {
        this.setParams(params);
   };

    Class.prototype = {
        setParams : function(params) {
            var self = this;
            self.viewIdentity = params.viewIdentity;
            self.controller = params.controller;
        },

        getParentProto: function() {
            return this.__proto__.__proto__;
        },

        init: function() {
            var self = this;
            self.setBehavior();
        },

        setBehavior: function() {

        },

        get$View: function() {
            var self = this;
            var $view = $(self.viewIdentity);
            if ($view.length <= 0) {
                throw new Error('element not found');
            }
            return $view;
        },

        draw: function() {

        }
    };

    return Class;
});

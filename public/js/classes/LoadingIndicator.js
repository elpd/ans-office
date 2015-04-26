define([
    'lodash',
    'classes/AttributesObject'
], function (_,
             AttributesObject) {

    var INDICATOR_CLASS = 'loading_indicator';
    var INDICATOR_ID_SUFFIX = '_loading_indicator';
    var LOADING_STARTED_CLASS = 'loading_started';
    var LOADING_DONE_CLASS = 'loading_done_class';

    var attributesRules = {
        parentId: {
            required: true
        },
        indicatorId: {
            required: true,
            defaults: {
                dependencies: ['parentId'],
                calculation: function(parentId) {
                    return parentId + INDICATOR_ID_SUFFIX;
                }
            }
        },
        loadingCompleteEventId: {
            required: true
        },
        loadingStartedEventId: {
            required: true
        }
    };

    var Class = function (params) {
        AttributesObject.call(this, params, attributesRules);
    };

    Class.prototype = Object.create(AttributesObject.prototype, {
        get$Parent: {
            value: function(){
                var self = this;
                return $('#' + self.parentId);
            }
        },

        get$Indicator: {
            value: function() {
                var self = this;
                return $('#' + self.indicatorId);
            }
        },

        execute: {
            value: function() {
                var self = this;
                attachIndicatorToParent(self);
                configureEventBehavior(self);
            }
        }
    });

    function attachIndicatorToParent(self) {
        var $indicator = create$Indicator(self);
        var $parent = self.get$Parent();
        $parent.after($indicator);
        $indicator.hide();
    }

    function create$Indicator(self) {
        var $element = $('<div></div>');
        $element.addClass(INDICATOR_CLASS);
        $element.attr('id', self.indicatorId);

        return $element;
    }

    function configureEventBehavior(self) {
        var $parent = self.get$Parent();
        $parent.on(self.loadingCompleteEventId, function(e){
            setAsDone(self);
        });
        $parent.on(self.loadingStartedEventId, function(e){
           setAsStarted(self);
        });
    }

    function setAsDone(self){
        var $indicator = self.get$Indicator();
        $indicator.addClass(LOADING_DONE_CLASS);
        $indicator.removeClass(LOADING_STARTED_CLASS);
    }

    function setAsStarted(self) {
        var $indicator = self.get$Indicator();
        $indicator.addClass(LOADING_STARTED_CLASS);
        $indicator.removeClass(LOADING_DONE_CLASS);
    }

    return Class;
});

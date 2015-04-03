define([
    'classes/controllers/UserNameSettingController'
], function (
    UserNameSettingController
) {
    var Class = function AnsApplication() {

    };

    Class.prototype = {
        bindView: function (formIdentifier) {
            var params = {
                formIdentifier: formIdentifier
            };

            return {
                to: function() {
                    return {
                        userNameSettingController: function(action) {
                            return bindViewToUserNameSettingController(params);
                        }
                    }
                }
            }
        },

        setControllerActivation: function(controller) {
            var self = this;
            var params = {
                controller: controller
            };

            return {
                when: function(conditionFn) {
                    params.conditionFn = conditionFn;
                    self._setControllerActivation(params);
                },

                for: function(componentIdentity) {
                    params.componentIdentity = componentIdentity;

                    return {
                        accordion: function() {
                            self._setControllerActivationForAccordion(params);
                        }
                    };
                }
            };
        },

        _setControllerActivation: function(params) {
            params.conditionFn(params.controller.init.bind(params.controller));
        },

        _setControllerActivationForAccordion: function(params) {
            var $accordionSection = $(params.componentIdentity);
            var $sectionHeading = $accordionSection.find('.panel-heading');
            var $sectionContent = $('.panel-content');

            $sectionHeading.click(function (e) {
                if (! $sectionContent.hasClass('in')) {
                    params.controller.init.bind(params.controller)();
                }
            });
        },

        getController: function() {
            return {
                userNameSetting: function() {
                    return new UserNameSettingController();
                }
            };
        }
    };

    function bindViewToUserNameSettingController(params) {
        var controller = new UserNameSettingController({
            viewIdentifier: params.formIdentifier
        });
        controller.bind();

        return controller;
    }

    return Class;
});

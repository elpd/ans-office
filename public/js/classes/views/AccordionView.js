define([
    '../View'
], function (View) {

    var Class = function AccordionView(params) {
        var self = this;
        self.setParams(params);
    };

    Class.prototype = (function () {
        function Prototype() {

            this.setBehavior = function () {
                var self = this;
                self.getParentProto().setBehavior.bind(self)();

                var $form = self.get$Form();
                $form.submit(function (e) {
                    e.preventDefault();
                    var sendPromise = self.sendDataToController();
                    sendPromise.done(function (result) {
                        if (result.success) {
                            self.displaySuccessMessages(result.messages);
                        } else {
                            self.displayErrorMessages(result.messages);
                        }
                    });
                    sendPromise.fail(function (result) {
                        self.displayErrorMessages([]); // TODO: standard way for controller to return exceptions.
                    });
                });

                var $sectionHeading = self.get$PanelHeading();
                var $sectionContent = self.get$PanelContent();

                $sectionHeading.click(function (e) {
                    if (!$sectionContent.hasClass('in')) {
                        self.draw();
                    }
                });
            };

            this.init = function () {
                var self = this;
                self.getParentProto().init.bind(self)();
                self.get$MessageSection().hide();
                //self.draw();
            };

            this.get$Form = function () {
                var self = this;
                return self.get$View().find('form');
            };

            this.get$PanelHeading = function () {
                var self = this;
                return self.get$View().find('.panel-heading');
            };

            this.get$PanelContent = function () {
                var self = this;
                return self.get$View().find('.panel-content');
            };

            this.get$MessageSection = function () {
                var self = this;
                return self.get$View().find('.message_section');
            };

            this.displayErrorMessages = function (messages) {
                var self = this;
                var messageSection = self.get$MessageSection();
                messageSection.text('error in operation'); // TODO: language
                messageSection.removeClass('bs-callout-info');
                messageSection.addClass('bs-callout-danger');
                messageSection.show();
            };

            this.displaySuccessMessages = function (messages) {
                var self = this;
                var messageSection = self.get$MessageSection();
                messageSection.text('successfull operation'); // TODO: language
                messageSection.removeClass('bs-callout-danger');
                messageSection.addClass('bs-callout-info');
                messageSection.show();
            };
        }

        Prototype.prototype = new View({});

        return new Prototype();
    })();

    return Class;
});

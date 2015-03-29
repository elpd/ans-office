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
                    sendPromise.done(function(result){
                        if (result.success) {
                            self.displaySuccessMessages(result.messages);
                        } else {
                            self.displayErrorMessages(result.messages);
                        }
                    });
                    sendPromise.fail(function(result){
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
                self.draw();
            };

            this.get$Form = function () {
                var self = this;
                return self.get$View().find('form');
            };

            this.get$PanelHeading = function () {
                var self = this;
                return self.get$View().find('.panel-heading');
            };

            this.get$PanelContent = function() {
                var self = this;
                return self.get$View().find('.panel-content');
            };

            this.get$MessageSection = function() {
                var self = this;
                return self.get$View().find('.message_section');
            };

            this.displayErrorMessages = function(messages) {
                var self = this;
                var messageSection = self.get$MessageSection();
                messageSection.text('error in operation'); // TODO: language
                messageSection.removeClass('bg-success');
                messageSection.addClass('bg-danger');
            };

            this.displaySuccessMessages = function(messages) {
                var self = this;
                var messageSection = self.get$MessageSection();
                messageSection.text('successfull operation'); // TODO: language
                messageSection.removeClass('bg-danger');
                messageSection.addClass('bg-success');
            };
        }

        Prototype.prototype = new View({});

        return new Prototype();
    })();

    return Class;
});

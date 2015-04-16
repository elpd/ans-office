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
                        var response = result.responseJSON;
                        self.displayErrorMessages(response.messages);
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

                setMessageSectionText(messageSection, messages);

                messageSection.removeClass('bs-callout-info');
                messageSection.addClass('bs-callout-danger');

                messageSection.show();
            };

            this.displaySuccessMessages = function (messages) {
                var self = this;
                var messageSection = self.get$MessageSection();

                setMessageSectionText(messageSection, messages);

                messageSection.removeClass('bs-callout-danger');
                messageSection.addClass('bs-callout-info');

                messageSection.show();
            };
        }

        Prototype.prototype = new View({});

        return new Prototype();
    })();

    function generateMessagesHtml(messagesList) {
        var $html = $('<ul></ul>');

        if (Array.isArray(messagesList)) {
            messagesList.forEach(function (message) {
                var $li = $('<li>' + message + '</li>');
                $html.append($li);
            });
        } else {
            _.forEach(messagesList, function (val, key) {
                var $subField = $('<li>' + key + '</li>')
                var $subErrors = generateMessagesHtml(val);
                $subField.append($subErrors);
                $html.append($subField);
            });
        }

        return $html;
    }

    function setMessageSectionText(section, messages) {
        var messagesHtml = generateMessagesHtml(messages);
        section.empty();
        section.append(messagesHtml);
    }

    return Class;
});

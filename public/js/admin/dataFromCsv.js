define([
        'require',
        'lodash',
        'classes/utilities',
        'services/language',
        'services/userDataService'
    ],
    function (require,
              _,
              utilities,
              lang,
              userDataService) {

        $(document).ready(function () {
            get$LoadingIndicator().hide();
            get$ActionOutput().hide();

            userDataService.ready().then(function(){

                get$Submit().on('submit', function(e){
                    e.preventDefault();
                    e.stopPropagation();

                    sendFileToController();
                });
            });
        });

        function get$Submit() {
            return $('#' + 'data_from_csv_file_uploader');
        }

        function getFormElement() {
            return $('#' + 'data_from_csv_file_uploader')[0];
        }

        function get$ErrorsSection() {
            return $('#' + 'output_errors');
        }

        function get$InfoSection() {
            return $('#' + 'output_info');
        }

        function get$LoadingIndicator() {
            return $('#' + 'loading_indicator');
        }

        function get$LoadingIndicatorProgressBar() {
            return get$LoadingIndicator().find('.progress-bar');
        }

        function get$ActionOutput() {
            return $('#' + 'action_output');
        }

        function sendFileToController() {
            var formData = new FormData(getFormElement());
            formData.append('_token', $_token);

            get$ActionOutput().hide();
            get$LoadingIndicatorProgressBar().width('20%');
            get$LoadingIndicatorProgressBar().addClass('active');
            get$LoadingIndicator().show();
            get$LoadingIndicatorProgressBar().show();

            var actionPromise = $.ajax({
                type: "POST",
                headers: {
                    'X-XSRF-TOKEN': $_token
                },
                url: '/api/data-from-csv/add',
                data: formData,
                enctype: 'multipart/form-data',
                processData: false,  // tell jQuery not to process the data
                contentType: false   // tell jQuery not to set contentType
            });

            actionPromise.then(function(result){
                get$ActionOutput().show();
                get$LoadingIndicatorProgressBar().width('100%');
                get$LoadingIndicatorProgressBar().removeClass('active');

                var $errorsList = $('<ul></ul>');
                _.forEach(result.errors, function(error){
                    var $li = $('<li>' + error + '</li>');
                    $errorsList.append($li);
                });
                get$ErrorsSection().empty();
                get$ErrorsSection().append($errorsList);

                var $infoList = $('<ul></ul>');
                _.forEach(result.info, function(info){
                    var $li = $('<li>' + info + '</li>');
                    $infoList.append($li);
                });
                get$InfoSection().empty();
                get$InfoSection().append($infoList);
            });

            actionPromise.fail(function( jqXHR, textStatus, errorThrown ) {
                get$InfoSection().empty();

                get$LoadingIndicator().hide();
                get$ActionOutput().show();

                var $errorsList = $('<ul><li>General Error.</li></ul>');
                get$ErrorsSection().empty();
                get$ErrorsSection().append($errorsList);
            });
        }
    });
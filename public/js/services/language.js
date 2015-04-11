define([
    'classes/Language'
  ],
  function(
    Language
  ) {

    var SERVICE_URL = '/api/language';

    // $.getJSON(SERVICE_URL, function(data){
    //   lang.populate(data);
    // });

      var lang = null;

    $.ajax({
      dataType: "json",
      url: SERVICE_URL,
      data: null,
      async: false,
      success: function(results) {
          lang = new Language({
              dataset: results,
              locale: 'en'
          })
      }
    });

    return lang;
  });

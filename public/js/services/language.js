define([
    'classes/Language'
  ],
  function(
    Language
  ) {

    var SERVICE_URL = '/api/language';

    var lang = new Language();

    // $.getJSON(SERVICE_URL, function(data){
    //   lang.populate(data);
    // });

    $.ajax({
      dataType: "json",
      url: SERVICE_URL,
      data: null,
      async: false,
      success: function(results) {
        lang.populate(results);
      }
    });

    return lang;
  });

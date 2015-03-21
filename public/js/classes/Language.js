define([
    'lodash'
  ],
  function(_) {

    var Class = function Language() {
      this.languages = {};
    };

    Class.prototype = {
      get: function(params) {
        var selectedLanguage = this.languages[params.language];
        var selectedTopic = selectedLanguage[params.topic];
        var selectedSentence = selectedTopic[params.sentence];

        return selectedSentence;
      },

      getFor: function(key) {
        var params = this.parseKey(key);
        return this.get({
          language: params.language,
          topic: params.topic,
          sentence: params.sentence
        })
      },

      populate: function(data) {
        var self = this;
        _.forEach(data, function(value, key){
          self.languages[key] = value;
        });
      },

      parseKey: function(key) {
        var language = 'en'; // TODO: default;
        var topic = 'main'; // TODO: default;
        var sentence = null;

        var parsedKey = _.words(key, /[^\.]+/g);

        switch (parsedKey.length) {
          case 1:
            sentence = parsedKey[0];
            break;
          case 2:
            topic = parsedKey[0];
            sentence = parsedKey[1];
            break;
          case 3:
            language = parsedKey[0];
            topic = parsedKey[1];
            sentence = parsedKey[2];
            break;
          default:
            throw new Error('Unintended code path'); // TODO: standardize.
        }

        var result = {
          language: language,
          topic: topic,
          sentence: sentence
        };

        return result;
      }
    };

    return Class;
  });

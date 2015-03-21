requirejs.config({
  paths: {
    jquery: '/js/jquery/jquery-1.11.2',
    jqueryUi: '/lib/jquery-ui-1.11.3.custom/jquery-ui',
    jqGrid: '/js/jqGrid/src/jquery.jqGrid',
    jqGridLocal: '/js/jqGrid/src/i18n/grid.locale-en',
    bootstrap: '/lib/bootstrap-3.3.2-dist/js/bootstrap',
    lodash: 'lodash'
  },
  shim: {
    'jquery': {
      deps: []
    },
    'jqueryUi': {
      deps: ['jquery']
    },
    'jqGrid': {
      deps: ['jquery', 'jqGridLocal', 'jqueryUi']
    },
    'jqGridLocal': {
      deps: ['jquery']
    },
    'Underscore': {
      exports: '_'
    },
    'lodash': {
      exports: '_'
    },
    'bootstrap' : {
      deps: ['jquery']
    }
  }
});

require(['jquery', 'jqueryUi', 'jqGrid', 'jqGridLocal', 'bootstrap'], function() {
  scripts.forEach(function(script){
    require([script]);
  });
});

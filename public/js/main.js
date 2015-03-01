requirejs.config({
  paths: {
    jquery: '/js/jquery/jquery-1.11.2',
    jqGrid: '/js/jqGrid/src/jquery.jqGrid',
    jqGridLocal: '/js/jqGrid/src/i18n/grid.locale-en',
    bootstrap: '/lib/bootstrap-3.3.2-dist/js/bootstrap'
  },
  shim: {
    'jquery': {
      deps: []
    },
    'jqGrid': {
      deps: ['jquery']
    },
    'jqGridLocal': {
      deps: ['jqGrid']
    },
    'jqGridAll': {
      deps: ['jqGrid', 'jqGridLocal']
    },
    'Underscore': {
      exports: '_'
    },
    'bootstrap' : {
      deps: ['jquery']
    }
  }
});

require(['jquery', 'jqGrid', 'jqGridLocal', 'bootstrap'], function() {
  scripts.forEach(function(script){
    require([script]);
  });
});

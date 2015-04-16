requirejs.config({
    paths: {
        jquery: '/js/jquery/jquery-1.11.2',
        'jquery.ui': '/lib/jquery-ui/jquery-ui',
        jqGrid: '/js/jqGrid/src/jquery.jqGrid',
        jqGridLocal: '/js/jqGrid/src/i18n/grid.locale-en',
        jqueryTimepicker : '/js/lib/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.min',
        jqueryTimepickerI18n: '/js/lib/jQuery-Timepicker-Addon/i18n/jquery-ui-timepicker-addon-i18n.min',
        bootstrap: '/lib/bootstrap-3.3.2-dist/js/bootstrap',
        lodash: 'lodash'
    },
    shim: {
        'jquery': {
            deps: []
        },
        'jquery.ui': {
            deps: ['jquery']
        },
        'jqGrid': {
            deps: ['jquery', 'jqGridLocal', 'jquery.ui']
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
        'bootstrap': {
            deps: ['jquery']
        },
        'jqueryTimepicker': {
            deps: ['jquery', 'jquery.ui']
        },
        'jqueryTimepickerI18n': {
            deps: ['jquery', 'jqueryTimepicker']
        }
    }
});

require(['jquery',
    'jquery.ui',
    'jqGrid',
    'jqGridLocal',
    'bootstrap',
    'jqueryTimepicker'//,
    //'jqueryTimepickerI18n'
], function () {
    scripts.forEach(function (script) {
        require([script]);
    });
});

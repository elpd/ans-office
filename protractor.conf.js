// conf.js
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // If chromeOnly is true, we dont need to stand the selenium server.
    // If you want to test with firefox, then set this to false and change the browserName
    //chromeOnly: true,
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    onPrepare: function () {
        global.isAngularSite = function (flagAngularSite) {
            if (flagAngularSite) {
                browser.ignoreSynchronization = false;
            } else {
                browser.ignoreSynchronization = true;
            }
        };

        //var SpecReporter = require('jasmine-spec-reporter');
        // add jasmine spec reporter
        //jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
    },

    suites: {
        full: 'e2e-tests/*_spec.js',
        employee: 'e2e-tests/employee/*_spec.js',
        admin: 'e2e-tests/admin/*_spec.js',
        user: 'e2e-tests/user/*_spec.js'
    },

    getPageTimeout: 5000
};

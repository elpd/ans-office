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

  onPrepare: function() {
    global.isAngularSite = function(flagAngularSite){
      if (flagAngularSite) {
        browser.ignoreSynchronization = false;
      } else {
        browser.ignoreSynchronization = true;
      }
    };
  },

  specs: ['e2e-tests/*_spec.js', 'e2e-tests/employee/*_spec.js']
}

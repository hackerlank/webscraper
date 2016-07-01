
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],

    onPrepare: function () {
        global.isAngularSite = function (flag) {
            browser.ignoreSynchronization = !flag;
        };
    },
    capabilities: {
        browserName: 'chrome'
  }

}
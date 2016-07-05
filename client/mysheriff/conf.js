
exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['mysheriff.spec.js'],

    onPrepare: function () {
        global.isAngularSite = function (flag) {
            browser.ignoreSynchronization = !flag;
        };
    },
    capabilities: {
        'browserName': 'phantomjs'
        // 'phantom.binary.path' : __dirname+'node_modules/phantomjs/bin/phantomjs'

  }

}
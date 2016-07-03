
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['ptea.spec.js'],

    onPrepare: function () {
        global.isAngularSite = function (flag) {
            browser.ignoreSynchronization = !flag;
        };
    },
    capabilities: {
        'browserName': 'chrome'
        // 'phantom.binary.path' : __dirname+'node_modules/phantomjs/bin/phantomjs'

  }

}
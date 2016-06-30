var Crawler = require("js-crawler");

/**
 * Simple crawler. Callback to process data
 */
var options = {
    maxRequestsPerSecond: 10,
    maxConcurrentRequests: 5,
    depth: 3
}

new Crawler().configure(options).crawl("http://www.milanoo.com", function onSuccess(page) {
    console.log(page.url);
});
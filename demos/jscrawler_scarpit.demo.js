/**
 * combine jscrawler with scrapeit
 */

var Crawler = require("js-crawler");
var fs = require("fs");
var ScrapeIt = require("scrape-it");
var stringTool = require('../toolkits/stringtool');

fs.writeFileSync('email.csv', 'Begin \r\n', { encoding: 'utf-8' });

/**
 * Simple crawler. Callback to process data
 */
var options = {
    maxRequestsPerSecond: 10,
    maxConcurrentRequests: 5,
    depth: 3
}

// crawl
new Crawler().configure(options).crawl("http://www.zaful.com/", function onSuccess(page) {
    console.log('Start processing ' + page.url);
    var url = page.url;

    // scrape
    ScrapeIt(url, {
        content: 'html'
    }).then(function (page) {
        var r = stringTool.fetchAllMailAddress(page.content);
        if (r) {
            console.log('Email fetched ... ');
            for(var em in r) {
                fs.appendFileSync('email.csv', '"' + r[em] + '","' + url + '"', { encoding: 'utf-8' });
            }
            
        }
    });

}, function onFailure(response) {
    console.log("ERROR occurred:");
    console.log(response.status);
    console.log(response.url);
}, function onAllFinished(crawledUrls) {
    console.log('All crawling finished');
    console.log(crawledUrls);
});
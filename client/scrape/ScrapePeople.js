/// <reference path="../include.d.ts" />


/**
 * combine jscrawler with scrapeit
 */

var Crawler = require("js-crawler");
var fs = require("fs");
var ScrapeIt = require("scrape-it");
var stringTool = require('../toolkits/stringtool');

fs.writeFileSync('people.csv', 'Begin \r\n', { encoding: 'utf-8' });

/**
 * Simple crawler. Callback to process data
 */
var options = {
    maxRequestsPerSecond: 10,
    maxConcurrentRequests: 5,
    depth: 3
}

// crawl
new Crawler().configure(options).crawl("http://www.teaconnect.org/Members/Member-Directory/index.cfm?membercode=7043&membersection=team&personcode=19576", function onSuccess(page) {

    if (page.url.match("http://www.teaconnect.org/Members/Member-Directory/index.cfm?membercode=\d+&membersection=team&personcode=\d+")) {
        console.log('Start processing ' + page.url);
        var url = page.url;

        // scrape
        ScrapeIt(url, {
            Name: "div[class='personProfile'] h1",
            Email: "div[class='personProfile'] p span(1)",
            Company: "div[class='personProfile'] p strong",
            JobTitle: "div[class='personProfile'] span strong"
        }).then(function (page) {
             
            console.log(page);
                    //fs.appendFileSync('email_top20.csv', '"' + r[em] + '","' + url + '"\r\n', { encoding: 'utf-8' });
                
        });
    }

}, function onFailure(response) {
    console.log("ERROR occurred:");
    console.log(response.status);
    console.log(response.url);
}, function onAllFinished(crawledUrls) {
    console.log('All crawling finished');
    console.log(crawledUrls);
});


/// <reference path="../include.d.ts" />

var Crawler = require("simplecrawler");
var fs = require("fs");
var ScrapeIt = require("scrape-it");
var stringTool = require('../toolkits/stringtool');
var cheerio = require('cheerio');

fs.writeFileSync('milanoo_products.csv', 'Begin\r\n');
var crawler = new Crawler("www.milanoo.com");
crawler.initialPath = "/";
// crawler.initialPort = 80;
crawler.initialProtocol = "http";

crawler.maxDepth = 7;



var conditionID = crawler.addFetchCondition(function (parsedURL, queueItem) {
    return !parsedURL.path.match(/(css|js|gif|jpg|png|mp3|mp3|zip|gz)/i);
});

// crawler.discoverResources = function(buffer, queueItem) {
//     var $ = cheerio.load(buffer.toString("utf8"));

//     return $("a[href]").map(function () {
//         return $(this).attr("href");
//     }).get();
// };

crawler.on("fetchcomplete", function (queueItem, responseBuffer, response) {
    console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);

    // console.log("It was a resource of type %s", response.headers['content-type']);

    var html = responseBuffer.toString('utf-8');
    var $ = cheerio.load(html);
    var list = $('.goods_name  a span').map(function(index, element) {
        return $(this).text();
    }).get().forEach(function(value, index, array) {
        fs.appendFileSync('milanoo_products.csv', value + '\r\n');
        console.log('product fetched');
    })
});

crawler.start();

// Crawler.crawl("https://www.milanoo.com", function(queueItem) {
//     console.log("Completed fetching resource:", queueItem);

    // ScrapeIt(queueItem.url, {
    //     content: 'html'
    // }).then(function (page) {
    //     var r = stringTool.fetchAllMailAddress(page.content);
    //     if (r) {
    //         console.log('Email fetched ... ');
    //         for(var em in r) {
    //             fs.appendFileSync('email_google.csv', '"' + r[em] + '","' + url + '"\r\n', { encoding: 'utf-8' });
    //         }

    //     }
    // });
// });
/// <reference path="../../include.d.ts" />

var Crawler = require("simplecrawler");
var fs = require("fs");
var ScrapeIt = require("scrape-it");
var stringTool = require('../../toolkits/stringtool');
var cheerio = require('cheerio');
var request = require('request');

// fs.writeFileSync('milanoo_products.csv', 'Begin\r\n');
var crawler = new Crawler("www.yellowpages.ca");
crawler.initialPath = "/search/si/1/Restaurant/Toronto%2C%20ON";
// crawler.initialPort = 80;
crawler.initialProtocol = "http";

crawler.maxDepth = 7;



var conditionID = crawler.addFetchCondition(function (parsedURL, queueItem) {
    // fs.appendFileSync('urls.txt', parsedURL.path);
    // console.log(queueItem.url);
    return (!parsedURL.path.match(/(css|js|gif|jpg|png|mp3|mp3|zip|gz)/i));
});

// crawler.discoverResources = function(buffer, queueItem) {
//     var $ = cheerio.load(buffer.toString("utf8"));

//     return $("a[href]").map(function () {
//         return $(this).attr("href");
//     }).get();
// };

var names=[];

crawler.on("fetchcomplete", function (queueItem, responseBuffer, response) {
    console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);

    // console.log("It was a resource of type %s", response.headers['content-type']);

    var html = responseBuffer.toString('utf-8');
    var $ = cheerio.load(html);
    $('.listing__name').each(function(index, item) {
        var name = $(this).find('a').text();
        if(names.indexOf(name) == -1) {
            names.push(name);
        }

        if(names.length % 1000 == 0) {
            fs.writeFileSync('Business.txt', names.join('\r\n'));
        }
    });
});

crawler.start();


/// <reference path="../../include.d.ts" />

var Crawler = require("simplecrawler");
var fs = require("fs");
var ScrapeIt = require("scrape-it");
var stringTool = require('../../toolkits/stringtool');
var cheerio = require('cheerio');
var request = require('request');

// fs.writeFileSync('milanoo_products.csv', 'Begin\r\n');
var crawler = new Crawler("www.milanoo.com");
crawler.initialPath = "/";
// crawler.initialPort = 80;
crawler.initialProtocol = "http";

crawler.maxDepth = 7;



var conditionID = crawler.addFetchCondition(function (parsedURL, queueItem) {
    // fs.appendFileSync('urls.txt', parsedURL.path);
    // console.log(queueItem.url);
    return (!parsedURL.path.match(/(css|js|gif|jpg|png|mp3|mp3|zip|gz)/i)) && ((parsedURL.path.match(/\/product\//)) || (parsedURL.path.match(/\/reviews\//)));
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
    $('.review_pic_item li a').each(function (index, element) {
        var href = $(this).attr('href');
        request({ url: href, method: 'GET' }, function (err, resp, body) {
            if (err) console.log(err);
            if (!resp) {
                return;
            }
            var length = parseInt(resp.headers['Content-Length']);
            if (length < 5 || (resp.statusCode !== 200)) {
                fs.appendFile('invalid.txt', queueItem.url + ' - ' + href + '\r\n');
            } else {
                fs.appendFile('valid.txt', queueItem.url + ' - ' + href + '\r\n');
            }
        });
    });
});

crawler.start();

// var u = 'http://test.item.www.milanoo.com/product/gorgeous-high-heel-rhinestone-fashion-high-heels-4-colors--p77917.html';

// request({ url: u, method: 'GET' }, function (err, resp, body) {
//     var $ = cheerio.load(body);
//     $('.review_pic_item li a').each(function (index, element) {
//         var href = $(this).attr('href');
//         request({ url: href, method: 'GET' }, function (err, resp, body) {
//             if (err) console.log(err);
//             if (!resp) {
//                 return;
//             }
//             var length = parseInt(resp.headers['Content-Length']);
//             if (length < 5 || (resp.statusCode !== 200)) {
//                 fs.appendFile('invalid.txt', u + ' - ' + href + '\r\n');
//             } else {
//                 fs.appendFile('valid1.txt', u + ' - ' + href + '\r\n');
//             }
//         });
//     });
// });
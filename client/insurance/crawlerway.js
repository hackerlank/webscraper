/// <reference path="../../include.d.ts" />

var Crawler = require("simplecrawler");
var fs = require("fs");
var ScrapeIt = require("scrape-it");
var stringTool = require('../../toolkits/stringtool');
var cheerio = require('cheerio');

// fs.writeFileSync('milanoo_products.csv', 'Begin\r\n');
var crawler = new Crawler("understandinsurance.com.au");//http://understandinsurance.com.au/
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
    if ($('article').text()) {
        var article = $('article').text();
        var title = $('h1').text().replace(/\?/g, '');
        fs.writeFile('./articles_c/' + title + '.docx', article, function (err) {
            if (err) console.log(err);
        });
    }
});

crawler.start();
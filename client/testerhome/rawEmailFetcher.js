/// <reference path="../../include.d.ts" />

var cheerio = require('cheerio');
var Crawler = require("simplecrawler");
var fs = require('fs');
var request = require('request');
var sTool = require('../../toolkits/stringtool.js');

// request.get('https://testerhome.com/').pipe(fs.createWriteStream('body.html;'));

// var crawler = new Crawler("bbs.51testing.com");
// var crawler = new Crawler("www.testtao.com");
var crawler = new Crawler("www.testwo.com")

crawler.maxConcurrency = 3;
crawler.maxDepth = 7;

// fs.appendFileSync('result.csv', '"' + '姓名' + '","' + '邮箱' + '","' + '公司' + '","' + '注册日期' + '","' + '战绩' + '"\r\n');
var conditionID = crawler.addFetchCondition(function (parsedURL, queueItem) {
    return !parsedURL.path.match(/(css|js|gif|jpg|png|mp3|mp3|zip|gz|svg)/i);
});

crawler.on("complete", function () {
    console.log('All items finished');
    process.exit(0);
});

crawler.on("crawlstart", function () {
    console.log('Start crawling');
});

crawler.on("queueerror ", function (errorData, URLData) {
    console.log(errorData);
    console.log(URLData);
});

crawler.on("fetchdisallowed ", function (queueItem) {
    console.log(queueItem + ' robots disallowed');
});

crawler.on("fetchcomplete", function (queueItem, responseBuffer, response) {
    console.log("Fetched", queueItem.url);

    var emails = sTool.fetchAllComMailAddress(responseBuffer.toString());
    if (emails) {
        emails.forEach(function (element) {
            fs.appendFile('testersEmail_testwo.txt', element + '\r\n', function (err) {
                if (err) console.log(err);
            });
        });
    }
});



crawler.start();
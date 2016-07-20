/// <reference path="../../include.d.ts" />

var cheerio = require('cheerio');
var Crawler = require("simplecrawler");
var fs = require('fs');
var request = require('request');
var sTool = require('../../toolkits/stringtool.js');

// request.get('https://testerhome.com/').pipe(fs.createWriteStream('body.html;'));

var crawler = new Crawler("testerhome.com");
crawler.maxConcurrency = 3;
crawler.maxDepth = 3;

fs.appendFileSync('result.csv', '"' + '姓名' + '","' + '邮箱' + '","' + '公司' + '","' + '注册日期' + '","' + '战绩' + '"\r\n');
var conditionID = crawler.addFetchCondition(function (parsedURL, queueItem) {
    return !parsedURL.path.match(/(css|js|gif|jpg|png|mp3|mp3|zip|gz|svg)/i);
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

    var $ = cheerio.load(responseBuffer);

    if($('span[title="注册日期"]').text()) {
        var name = $('.media-body .item').eq(0).text();
        var mail = '';
        $('.social a').each(function(index, item) {
            var href = $(this).attr('href');
            if(href && (sTool.fetchAllMailAddress(href))) {
                mail = sTool.fetchAllMailAddress(href)[0];
            }
        });
        var company = $('.company').text() ? $('.company').text().trim() : '';
        var regDate = $('span[title="注册日期"]').text();
        var sum = $('.counts').text().trim().replace(/\r\n/g, ',');
        fs.appendFileSync('result.csv', '"' + name + '","' + mail + '","' + company + '","' + regDate + '","' + sum + '"\r\n');
    }
});



crawler.start();
/// <reference path="../../include.d.ts" />

var cheerio = require('cheerio');
var Crawler = require("simplecrawler");
var fs = require('fs');
var request = require('request');
var sTool = require('../../toolkits/stringtool.js');


var crawler = new Crawler("superpages.com");
crawler.maxConcurrency = 3;
crawler.maxDepth = 7;
crawler.interval= 1000;
crawler.initialPath = '/listings.jsp?CS=L&MCBP=true&search=Find+It&STYPE=S&SCS=&C=4084518429';

// fs.appendFileSync('result.csv', '"' + '姓名' + '","' + '邮箱' + '","' + '公司' + '","' + '注册日期' + '","' + '战绩' + '"\r\n');
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

    //    fs.appendFileSync('result.txt', responseBuffer.toString());
    if(responseBuffer.toString().indexOf("We couldn't find any") !== -1) { 
        fs.appendFile('fetched.csv', queueItem.url + '\r\n', function(err) {
            if(err) console.log(err);
        });
    }
    
});



crawler.start();
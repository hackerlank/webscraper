var Crawler = require("js-crawler");
var fs = require("fs");
var ScrapeIt = require("scrape-it");
var stringTool = require('../toolkits/stringtool');

for (var i = 0; i < 30000; i++) {
    for (var j = 0; j < 30000; j++) {
        var url = "http://www.teaconnect.org/Members/Member-Directory/index.cfm?membercode=" + i + "&membersection=team&personcode=" + j;
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
}
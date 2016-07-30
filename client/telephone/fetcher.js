/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ExcelWriter = require('../../private/ExcelWriter.js');

// var columns = ['name', 'Address', 'Phone'];
// var ew = new ExcelWriter('result.xlsx', columns, 'r');
// fs.appendFileSync('result.csv', '"name","phone","street","city"');

var url = 'http://www.thephonebook.bt.com/publisha.content/en/search/residential/search.publisha?Surname=smith&Location=&Initial=&Street=&Page=5';

var request = request.defaults({ proxy: 'http://127.0.0.1:2099' });
var har = {
				"headersSize": 806,
				"postData": {
        "text": "",
        "mimeType": ""
				},
				"queryString": [{
        "name": "Surname",
        "value": "smith"
				},
        {
            "name": "Location",
            "value": "Birmingham"
        },
        {
            "name": "Initial",
            "value": ""
        },
        {
            "name": "Street",
            "value": ""
        }],
				"headers": [{
        "name": "Host",
        "value": "www.thephonebook.bt.com"
				},
        {
            "name": "Proxy-Connection",
            "value": "keep-alive"
        },
        {
            "name": "Cache-Control",
            "value": "max-age=0"
        },
        {
            "name": "Upgrade-Insecure-Requests",
            "value": "1"
        },
        {
            "name": "User-Agent",
            "value": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36"
        },
        {
            "name": "Accept",
            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        },
        {
            "name": "Referer",
            "value": "http://www.thephonebook.bt.com/publisha.content/en/search/residential/search.publisha?Surname=moseley&Location=*&Initial=&Street="
        },
        {
            "name": "Accept-Encoding",
            "value": "gzip, deflate, sdch"
        },
        {
            "name": "Accept-Language",
            "value": "zh-CN,zh;q=0.8"
        },
        {
            "name": "Cookie",
            "value": "ASP.NET_SessionId=bscjha55jda5lgzc2o3cxu55; thephonebook.stats=user=7921e936-91dd-4af9-9df1-0a42934deae3"
        }],
				"bodySize": 0,
				"url": "http://www.thephonebook.bt.com/publisha.content/en/search/residential/search.publisha?Surname=smith&Location=Birmingham&Initial=&Street=&Page=5",
				"cookies": [{
        "name": "ASP.NET_SessionId",
        "value": "bscjha55jda5lgzc2o3cxu55"
				},
        {
            "name": "thephonebook.stats",
            "value": "user=7921e936-91dd-4af9-9df1-0a42934deae3"
        }],
				"method": "GET",
				"httpVersion": "HTTP/1.1"
};
request({ gzip: true, url: url, method: 'GET', har: har }, function (err, resp, body) {
    fs.appendFileSync('body.html', body);
    if (err) console.log(err);

    var $ = cheerio.load(body);

    $('.searchListings .record').each(function (index, item) {
        var name = $(this).find('.recordTitle').text();
        var phone = $(this).find('.phone').text();
        var street = $(this).find('.recordBody div').eq(2).text();
        var city = 'Birmingham';
        fs.appendFileSync('result.csv', '"' + name + '","' + phone + '","' + street + '"," ' + city + '"\r\n');
    });
});
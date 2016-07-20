/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');

var url = 'http://pubapi.yp.com/search-api/search/devapi/search?searchloc=91203&term=Water%20Companies-Bottled,%20Bulk,%20Etc&format=json&listingcount=50&key=c6vl2ss5p6';
// fs.appendFileSync('result.csv', '"Name","Address","Phone Number","BBB Rating","Hours","General Info","Other Links","User name","star rating","review comments","date posted"\r\n');
fs.appendFileSync('result.csv', '"Name","Address","Phone Number","BBB Rating","Hours","General Info","Other Links"\r\n');
var header = sTool.regularHeader('pubapi.yp.com', '');
var har = {

				"headersSize": 614,
				"postData": {
        "text": "",
        "mimeType": ""
				},
				"queryString": [{
        "name": "searchloc",
        "value": "91203"
				},
        {
            "name": "term",
            "value": "Water Companies-Bottled, Bulk, Etc"
        },
        {
            "name": "format",
            "value": "json"
        },
        {
            "name": "listingcount",
            "value": "50"
        },
        {
            "name": "key",
            "value": "c6vl2ss5p6"
        }],
				"headers": [{
        "name": "Host",
        "value": "pubapi.yp.com"
				},
        {
            "name": "Connection",
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
            "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
        },
        {
            "name": "Accept",
            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
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
            "value": "s_cc=true; s_sq=%5B%5BB%5D%5D; s_nr=1468899734959"
        }],
				"bodySize": 0,
				"url": "http://pubapi.yp.com/search-api/search/devapi/search?searchloc=91203&term=Water%20Companies-Bottled,%20Bulk,%20Etc&format=json&listingcount=50&key=c6vl2ss5p6",
				"cookies": [{
        "name": "s_cc",
        "value": "true"
				},
        {
            "name": "s_sq",
            "value": "%5B%5BB%5D%5D"
        },
        {
            "name": "s_nr",
            "value": "1468899734959"
        }],
				"method": "GET",
				"httpVersion": "HTTP/1.1"

}
request({ har: har, gzip: true }, function (err, resp, body) {
    if (err) console.log(err);
    fs.appendFileSync('body.txt', body);
    var r = JSON.parse(body);
    r.searchResult.searchListings.searchListing.forEach(function (item) {
        var Name = item.businessName;
        var Address = item.state + ' ' + item.city + ' ' + item.street;
        var PhoneNumber = item.phone;
        var Rating = item.averageRating;
        var Hours = item.openHours;
        var GeneralInfo = '';
        var Otherlinks = item.customLink;
        fs.appendFileSync('result.csv', '"' + Name + '","' + Address + '","' + PhoneNumber + '","' + Rating + '","' + Hours + '","' + GeneralInfo + '","' + Otherlinks + '"\r\n');
    });
});
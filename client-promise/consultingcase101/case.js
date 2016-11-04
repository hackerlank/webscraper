

/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var columns = [];
var sheet = { name: 'result', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 2500;

/** compose url by yourself */
var urls = fs.readFileSync('caseLinks.txt').toString().split('\r\n');
// urls = urls.slice(0, 3);



var results = JSON.parse(fs.readFileSync('result.json').toString());
var existing = [];

results.forEach(function (record, index, array) {
    existing.push(record.url);
});
console.log('existing length ' + existing.length);

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('temp.xlsx', buffer);
    console.log('Everything was done successfully');
}

Promise.all(Promise.map(urls, singleRequest, { concurrency: 5 })).then(function () {
    fs.writeFileSync('result.json', JSON.stringify(results));
});


/** Single Req */
function singleRequest(url) {
    if (existing.indexOf(url) !== -1) {
        console.log('Already done, passed');
        return new Promise(function (res, rej) {
            setTimeout(function () {
                res(false);
            }, 1);
        });
    }
    var har = {
        "method": "GET",
        "url": url,
        "httpVersion": "HTTP/1.1",
        "headers": [
            {
                "name": "Cookie",
                "value": "__utma=91929352.243153743.1478220370.1478220370.1478245527.2; __utmb=91929352.4.10.1478245527; __utmc=91929352; __utmz=91929352.1478220370.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); wordpress_test_cookie=WP+Cookie+check; wordpress_logged_in_7095e54efb4d345b0bed6bf64af9de60=simonwr%7C1478419912%7Cf7abe372fc181304ceddd6b896a00027; wp-settings-time-13651=1478247114"
            },
            {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, sdch"
            },
            {
                "name": "Host",
                "value": "www.consultingcase101.com"
            },
            {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.8"
            },
            {
                "name": "Upgrade-Insecure-Requests",
                "value": "1"
            },
            {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"
            },
            {
                "name": "Accept",
                "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
            },
            {
                "name": "Cache-Control",
                "value": "max-age=0"
            },
            {
                "name": "Referer",
                "value": "http://www.consultingcase101.com/category/case-interview-questions/page/2/"
            },
            {
                "name": "Proxy-Connection",
                "value": "keep-alive"
            }
        ],
        "queryString": [],
        "cookies": [
            {
                "name": "__utma",
                "value": "91929352.243153743.1478220370.1478220370.1478245527.2",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "__utmb",
                "value": "91929352.4.10.1478245527",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "__utmc",
                "value": "91929352",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "__utmz",
                "value": "91929352.1478220370.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "wordpress_test_cookie",
                "value": "WP+Cookie+check",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "wordpress_logged_in_7095e54efb4d345b0bed6bf64af9de60",
                "value": "simonwr%7C1478419912%7Cf7abe372fc181304ceddd6b896a00027",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "wp-settings-time-13651",
                "value": "1478247114",
                "expires": null,
                "httpOnly": false,
                "secure": false
            }
        ],
        "headersSize": 954,
        "bodySize": 0
    };
    var options = {
        har: har,
        gzip: true,
        proxy: 'http://118.178.229.187:45887'
    };
    return rp(options)
        .then(function (body) {
            var $ = cheerio.load(body);
            //process html via cheerio
            var title = $('.entry-title').text();
            var content = $('.entry-content').text();
            var record = {};
            record['title'] = title;
            record['url'] = url;
            record['content'] = content;
            results.push(record);
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(url);
                }, timeout);
            });

        }).then(function (url) {
            console.log(url + ' was done');
        }).catch(function (err) {
            //handle errors
            console.log(err.message);
        });
}

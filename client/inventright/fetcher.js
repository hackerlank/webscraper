/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var excel = require('node-xlsx');


var columns = ["Name", "Category", "Email"];
var sheet1 = { name: 'result', data: [] };
sheet1.data.push(columns);

var rows = sheet1.data;

var base = 'http://www.inventright.com/companies/'
var urls = [];
for (var i = 0; i < 3000; i++) {
    (function (k) {
        urls.push(base + k);
    })(i);
}

var har = {
    "method": "GET",
    "httpVersion": "HTTP/1.1",
    "cookies": [
        {
            "name": "2e647238c4bfe59ae37bee90aaf192a6",
            "value": "7bd6ec0d7ccff5c33d3756b99c2f0890"
        },
        {
            "name": "_ga",
            "value": "GA1.2.2042495966.1471915468"
        },
        {
            "name": "_gat",
            "value": "1"
        },
        {
            "name": "__utma",
            "value": "212540236.2042495966.1471915468.1471915468.1471915468.1"
        },
        {
            "name": "__utmb",
            "value": "212540236.1.10.1471915468"
        },
        {
            "name": "__utmc",
            "value": "212540236"
        },
        {
            "name": "__utmz",
            "value": "212540236.1471915468.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)"
        },
        {
            "name": "__utmt",
            "value": "1"
        }
    ],
    "headers": [
        {
            "name": "Accept",
            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        },
        {
            "name": "Accept-Encoding",
            "value": "gzip, deflate"
        },
        {
            "name": "Accept-Language",
            "value": "zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3"
        },
        {
            "name": "Cache-Control",
            "value": "max-age=0"
        },
        {
            "name": "Connection",
            "value": "keep-alive"
        },
        {
            "name": "Cookie",
            "value": "2e647238c4bfe59ae37bee90aaf192a6=7bd6ec0d7ccff5c33d3756b99c2f0890; _ga=GA1.2.2042495966.1471915468; _gat=1; __utma=212540236.2042495966.1471915468.1471915468.1471915468.1; __utmb=212540236.1.10.1471915468; __utmc=212540236; __utmz=212540236.1471915468.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmt=1"
        },
        {
            "name": "Host",
            "value": "www.inventright.com"
        },
        {
            "name": "User-Agent",
            "value": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0"
        }
    ],
    "queryString": [],

}

function singleFetch(url, callback) {
    request({ url: url, method: 'GET', gzip: true, har : har }, function (err, resp, body) {
            // fs.writeFileSync('b.html', body);
            var $ = cheerio.load(body);
            if (resp.statusCode !== 200) {
                callback();
                return;
            }
            if (!$('.SPDetailEntry').attr('class') || $('.SPDetailEntry').attr('class') == '') {
                callback();
                return;
            }

            var row = [];
            var name = $('.SPDetailEntry h1').text();
            var cate = $('.spEntryCats a').text();
            var emai='';
            $('.SPDetailEntry a').each(function(index, element) {
                if($(this).attr('href') && ($(this).attr('href').indexOf('mailto') !==0)) {
                    email = $(this).text();
                }
            });
            row.push(name);
            row.push(cate);
            row.push(email);

            fs.appendFileSync('collected.txt', row + ',' + url + '\r\n');

            rows.push(row);

            setTimeout(function() {
                callback();
            }, 2000);

    });
}

process.on('error', function() {
    var buffer = excel.build([sheet1]);
    fs.writeFileSync('result.xlsx', buffer);
});

async.mapLimit(urls, 4, function(url, callback) {
    singleFetch(url, callback);
}, function(err) {
    var buffer = excel.build([sheet1]);
    fs.writeFileSync('result.xlsx', buffer);
});







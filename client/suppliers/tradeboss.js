/// <reference path="../../include.d.ts" />

var request = require('request');
var cheerio = require('cheerio');
var ExcelWriter = require('../../private/ExcelWriter');
var fs = require('fs');
var async = require('async');

var eWriter = new ExcelWriter('healthybeauty.xlsx', ['Website', 'Name', 'Address'], 'result');

var baseUrl = "http://www.tradeboss.com/default.cgi/action/viewcompanies/classificationid/2207/classification/Hair_Products/from/"
var urls = [];

for (var i = 0; i < 6343; i = i + 20) {
    (function (i) {
        var k = i;
        urls.push(baseUrl + k);
    })(i);
}

async.mapLimit(urls, 2, function(url, callback) {
        singleUrlFetch(url, callback);
}, function(err) {
    if(err) console.log(err);
});


function singleUrlFetch(url, callback) {
    request({ url: url, method: 'GET' }, function (err, resp, body) {
        if (err) console.log(err);

        var $ = cheerio.load(body);
        $('td font font[size=2] a').each(function (index, a) {
            if (($(this).attr('href')) && $(this).attr('href').match(/viewcompanies\/companyid\/\d+/)) {
                fs.appendFile('links.txt', 'http://www.tradeboss.com' + $(this).attr('href') + '\r\n', function (err) { if (err) console.log(err) });
            }
        });
        setTimeout(function() {
            console.log(url + ' was done');
            callback();
        }, 2000);
    });
}
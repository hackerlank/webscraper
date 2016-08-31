//http://aflca.com.au/index.php?id=9&tx_ttnews%5Bpointer%5D=228&cHash=1c2604ba7fd7380b5c3803c9533406e9

/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ew = require('node-xlsx');

var urls = [];

for (var i = 0; i < 229; i++) {
    (function (k) {
        urls.push('http://aflca.com.au/index.php?id=9&tx_ttnews%5Bpointer%5D=' + k + '&cHash=1c2604ba7fd7380b5c3803c9533406e9')
    })(i);
}

console.log(urls.length);

function singleQuery(url, callback) {
    request({ method: 'GET', url: url, gzip: true }, function (e, r, b) {
        var $ = cheerio.load(b);
        $('.news-list-title').each(function (index, item) {
            var link = 'http://aflca.com.au/' + $(this).find('a').attr('href');
            var title = $(this).find('a').attr('title');
            fs.appendFileSync('links.csv', link + '\r\n');
        });

        setTimeout(function () {
            console.log(url + ' is done');
            callback();
        }, 2000);
    });
}

async.mapLimit(urls, 10, function (url, callback) {
    singleQuery(url, callback);
}, function (err) {
    if (err) console.log(err);
});


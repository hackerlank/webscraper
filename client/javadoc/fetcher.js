/// <reference path="../../include.d.ts" />

var request = require('request');
var fs = require('fs');
var async = require('async')
var cheerio = require('cheerio');

async.waterfall([
    function composeUrls(callback) {
        var base = 'http://192.168.11.16:8680/doc/doc/detail.htm?methodId=';
        var urls = [];
        for (var i = 1; i < 8500; i++) {
            (function (i) {
                var k = i;
                urls.push(base + k);
            })(i);
        }
        callback(null, urls);
    },
    function fetch(urls, callback) {
        console.log(urls);

        async.mapLimit(urls, 3, function (url, callback) {
            request({ url: url, method: 'GET' }, function (err, resp, body) {
                var $ = cheerio.load(body);
                var name = $('.tableList tr').eq(0).find('td').eq(1).text();
                if (name !== '$methodInfo.name') {
                    var fpath = './apis/' + name + '.html';
                    fs.writeFile(fpath, body, function (err) {
                        if (err) console.log(err);
                    })
                }
                setTimeout(function () {
                    console.log(url + ' is done');
                    callback(null);
                }, 2000);


            });
        }, function (err, results) {
            if (err) console.log(err);
        });

        // urls.forEach(function(url, index, arr) {

        // });
    }], function (err, results) {
        if (err) console.log(err);
    });

/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ExcelWriter = require('../../private/ExcelWriter.js');

// fs.appendFileSync('result.csv', '"FullAddress", "Speed"\r\n');

fs.readFile('list.txt', function (err, data) {
    if (err) console.log(err);
    var list = data.toString().split('\r\n');

    async.mapLimit(list, 10, function (link, callback) {
        var start = Date.now();
        request({ url: 'http://' + link, method: 'GET' }, function (err, res, body) {
            if (!err) {
                var end = Date.now();
                console.log('end :' + end + ', start :' + start + '. Time diff : ' + (end - start));
                fs.appendFileSync('result.csv', '"' + link + '","' + (end - start) + '"\r\n');
            } else {
                // fs.appendFileSync('result.csv', '"' + link + '","' + 'Unavailable' + '"\r\n');
            }
            setTimeout(function() {
                console.log(link + ' was done');
                callback();
            }, 2000);
        });
    }, function (err) { if (err) console.log(err) });

});
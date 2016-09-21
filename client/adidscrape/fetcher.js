//$("div:regex(class, .*sd.*)")

/// <reference path="../../include.d.ts" />

/**
 * 直接拷贝这个，开始编码
 */

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ew = require('node-xlsx');


var folder = './adlist/';

var files = fs.readdirSync(folder);

files.shift();


async.mapLimit(files, 10, function (file, callback) {
    singleFile(folder+file, callback);
}, function (err) {
    console.log('all files done');
});


function singleFile(file, next) {
    var rows = ew.parse(fs.readFileSync(file))[0].data;

    rows[0].push('ids');

    async.mapLimit(rows, 5, function (row, callback) {
        if (!row[1] || row[1].indexOf('http') === -1) {
            callback();
            return;
        }
        var url = row[1];
        // console.log(url);

        request({ url: url, method: 'GET', gzip: true }, function (err, resp, body) {

            if(!body) {
                fs.appendFileSync('NoAccess.txt', 'unable to access ' + url + '\r\n');
                callback();
                return;
            }
            // fs.writeFileSync('body.html', body); 
            var ids = body.toString().match('trends.revcontent.*w=(\\d+)');
            if (!ids) {
                callback();
                return;
            }
            ids.shift();
            var toStore = ids.join(",");
            row.push(toStore);

            setTimeout(function () {
                console.log(url + ' was done');
                callback();
            }, 1000);
        });
    }, function (err) {
        var buffer = ew.build([{ name: 'after', data: rows }]);
        fs.writeFileSync(file + '_done.xlsx', buffer);
        console.log(file + 'File was done');
        next();
    });

}
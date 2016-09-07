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


var columns = ['在这里填满列名'];

var sheet = { name: 'result', data: [] };//默认就叫result

sheet.data.push(columns);

var rows = sheet.data;

/** 最基本的权限绕过，不伪造浏览器 */
var cookie = '';

var headers = {
    Cookie: cookie
}


/** 构造任务队列 */
var urls = [];

for (var i = 1; i < 100; i++) {
    (function (k) {
        urls.push(k);
    } (i));
}

async.mapLimit(urls, 10, function (id, callback) {
    single(url, callback)
}, function (err) {
    if (err) console.log(err);
    console.log('everything was done');
    var buffer = ew.build([sheet]);
    fs.writeFileSync('zcool.xlsx', buffer);
});

function single(url, callback) {
    request({ url: url, method: 'POST', form: {}, headers: headers, gzip: true },
        function (e, r, b) {
            var $ = cheerio.load(b);

            setTimeout(function () {
                console.log(url + ' was done');
                callback();
            }, 2000);

        });
}
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

var timeout = 1500;

/** compose url by yourself */
var base = 'http://www.consultingcase101.com/category/case-interview-questions';
var urls = [];

for (var i = 1; i < 223; i++) {
    (function (k) {
        urls.push(base + '/page/' + k + '/');
    } (i));
}


/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('temp.xlsx', buffer);
    console.log('Everything was done successfully');
}

Promise.all(Promise.map(urls, singleRequest, { concurrency: 10 })).then();


/** Single Req */
function singleRequest(url) {
    var options = {
        method: 'GET',
        uri: url,
        headers: {
        },
        gzip: true
    };
    return rp(options)
        .then(function (body) {
            var $ = cheerio.load(body);
            //process html via cheerio
            $('.post').each(function (post, index, array) {
                var link = $(this).find('.entry-title').find('a').attr('href');
                fs.appendFileSync('caseLinks.txt', link + '\r\n');
            });
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(url);
                }, timeout);
            });

        }).then(function (url) {
            console.log(url + ' was done');
        }).catch(function (err) {
            //handle errors
        });
}
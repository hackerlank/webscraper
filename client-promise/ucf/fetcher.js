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

var timeout = 3000;

/** compose url by yourself */
var urls = [];

for (var i = 200; i < 210; i++) {
    (function (k) {
        urls.push('http://www.ufc.com/event/ufc-' + 204);
    } (i));
}
/**  Use the for loop if neccessary
for (var i = 1; i < 100; i++) {
    (function (k) {
        urls.push(k);
    } (i));
}
*/

var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('temp.xlsx', buffer);
    console.log('Everything was done successfully');
}
Promise.all(Promise.map(urls, singleRequest, { concurrency: 3 })).then(printToExcel);


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
            $('#odds-list .fight').each(function (index, element) {
                var oddsline1 = $(this).find('.odds-line').eq(0).text();
                var oddsline2 = $(this).find('.odds-line').eq(1).text();
                var vs = $(this).find('.vs-text').text();
                var title = $(this).find('.fight-title').text();
                rows.push([oddsline1, oddsline2, vs, title]);
            });

            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(url);
                }, timeout);
            });

        }).then(function (url) {
            console.log(url + ' was done');
        }).catch(function (err) {
            // console.log(err);
        });
}

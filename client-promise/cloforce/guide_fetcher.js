//http://www.cloforce.com/assets/addictions.html

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
var urls = ['http://www.cloforce.com/assets/addictions.html'];
var items = [];

/**  Use the for loop if neccessary
for (var i = 1; i < 100; i++) {
    (function (k) {
        urls.push(k);
    } (i));
}
*/

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    // fs.writeFileSync('temp.xlsx', buffer);
    fs.writeFileSync('items.json', JSON.stringify(items));
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
            //process html via cheerio
            var title = $('.titleguide').text();
            $('p').each(function (index, element) {
                if ($(this).find('.justbold').text().indexOf('—') !== -1) {
                    var item = {};
                    var col = $(this).find('.justbold').text().replace('—', '');
                    // console.log(col);
                    var primary = $(this).find('.primarytext').text();
                    var secondary = $(this).find('.secondarytext').text();
                    // console.log(val);
                    var fullText = '';
                    if (secondary) {
                        fullText = primary + ',　' + secondary;
                    } else {
                        fullText = primary;
                    }
                    item['' + col] = fullText;
                    items.push(item);
                }
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

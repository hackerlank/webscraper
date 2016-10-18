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
var urls = ['http://www.nla.gov.au/apps/libraries/?action=OrgDetails&id=8914'];

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
            //process html via cheerio
            var whole = $('.libsearch').eq(1).find('tr').eq(1).find('td').eq(0);
            fs.writeFileSync('whole.txt', $('body').text().trim());
            var libraryType = whole.find('p').eq(0).text().trim().split(':')[1];
            var related = '';
            var relatedArray = [];
            var parentUrl = '';
            whole.find('p').eq(1).find('a').each(function (index, element) {
                var length = whole.find('p').eq(1).find('a').length;
                if (index < length - 1) {
                    relatedArray.push($(this).text().trim());
                } else {
                    parentUrl = $(this).text().trim();
                }
            });
            related = relatedArray.join(',');
            // var allText = whole.find('p').eq(5).text();
            // var textArr = allText.split('\r\n');


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

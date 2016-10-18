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
var urls = ['http://www.baysidebusiness.com.au/members/page/1/', 'http://www.baysidebusiness.com.au/members/page/2/', 'http://www.baysidebusiness.com.au/members/page/3/', 'http://www.baysidebusiness.com.au/members/page/4/'];

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

            $('.business-details').each(function (index, element) {
                var name = $(this).find('h2').text();
                var phone = $(this).find('li').eq(0).text().trim();
                var address = $(this).find('li').eq(1).text().trim();
                var mail = $(this).find('li').eq(2).text().trim();
                var website = $(this).find('li').eq(3).find('a').attr('href');
                rows.push([name, phone, address, mail, website]);
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

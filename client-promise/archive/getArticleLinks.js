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

var timeout = 2000;

/** compose url by yourself */
// var urls = ['http://web.archive.org/web/20150206054127/http://www.petitionspot.com/listpetitions/'];
var urls = fs.readFileSync('lists.txt').toString().split('\r\n');


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

Promise.all(Promise.map(urls, singleRequest, { concurrency: 8 })).then(printToExcel);


/** Single Req */
function singleRequest(url) {
    fs.appendFileSync('lists.txt', url + '\r\n');
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
            $('.list_row .nounderline').each(function (index, element) {
                if (index > 0) {
                    fs.appendFileSync('articlelinks.txt', 'http://web.archive.org/' + $(this).attr('href') + '\r\n');
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
            if (err) fs.appendFileSync('Unfetched.txt', url + '\r\n');
        });
}

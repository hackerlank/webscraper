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

/** configure proxy */
var proxies = fs.readFileSync('usefulproxies.txt').toString();
var pArray = proxies.split('\r\n');

Promise.all(Promise.map(urls, singleRequest, { concurrency: 3 })).then(printToExcel);


/** Single Req */
function singleRequest(url) {
    var checker = function (target) {
        var random = Math.floor(Math.random() * pArray.length);
        var proxy = pArray[random];
        var op = { uri: target, method: 'GET', proxy: proxy, timeout: 20000, gzip: true };
        return rp(op).then(body => {
            if ((!body) || (body.length < 1000)) {
                return checker(target);
            } else {
                return { body: body, proxy: proxy };
            }
        }).catch(error => {
            pArray = pArray.slice(0, pArray.indexOf(proxy)).concat(pArray.slice(pArray.indexOf(proxy) + 1));
            // console.log(proxy + ' not work, removed')
            return checker(target);
        });
    }

    return checker(url)
        .then(function (entity) {
            var body = entity.body;
            var $ = cheerio.load(body);
            //process html via cheerio

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

//https://www.upwork.com/freelancers/_~016928bfceb0347a4f/

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
// var urls = ['https://www.upwork.com/freelancers/_~016928bfceb0347a4f/'];
var urls = ['https://www.upwork.com/o/profiles/browse/c/web-mobile-software-dev/'];

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
        // proxy: 'http://43.241.225.182:20225',
        gzip: true
    };
    return rp(options)
        .then(function (body) {
            var $ = cheerio.load(body);
            //process html via cheerio
            // fs.writeFileSync('body.html', body);
            var jsonStr = body.match(/var phpVars = (.*);/)[1];
            // console.log('json str is ' + jsonStr);
            var profiles = JSON.parse(jsonStr);
            profiles.profiles.forEach(function (profile, index, array) {
                console.log(profile.ciphertext);
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
            console.log(err.message);
        });
}

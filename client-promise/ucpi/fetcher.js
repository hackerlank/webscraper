/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var columns = ['Owner(s) Name1', 'Owner(s) Name2', 'Owner(s) Name3', 'Owner(s) Name4', 'Owner(s) Name5', 'Owner(s) Name6', 'Reported Owner Address', 'Type of Property', 'Cash Reported', 'Reported By'];
var sheet = { name: 'result', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 2000;

/** compose url by yourself */
var urls = [];
var base = 'https://ucpi.sco.ca.gov/ucp/PropertyDetails.aspx?propertyRecID=';

for (var i = 7178236; i < 7178736; i++) {
    (function (k) {
        urls.push(base + k);
    } (i));
}

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('temp.xlsx', buffer);
    console.log('Everything was done successfully');
}

Promise.all(Promise.map(urls, singleRequest, { concurrency: 20 })).then(printToExcel);


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
            var attr1 = $('#OwnersNameData span span').text().trim();
            var names = [];
            var originNames = attr1.split(' ');
            originNames.forEach(function (name, index, array) {
                names.push(name);
            });
            while (names.length < 6) {
                names.push('');
            }
            var attr2 = $('#ReportedAddressData').text().trim();
            var attr3 = $('#PropertyTypeData').text().trim();
            var attr4 = $('#ctl00_ContentPlaceHolder1_CashReportData').text().trim();
            var attr5 = $('#ReportedByData').text().trim();
            rows.push(names.concat([attr2, attr3, attr4, attr5]));
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

/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var columns = ['Name', 'Price'];
var sheet = { name: 'result', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 1000;

var base = 'http://www.trademe.co.nz/browse/categoryattributesearchresults.aspx?cid=5748&search=1&rptpath=350-5748-&nofilters=1&originalsidebar=1&key=217060528&sort_order=prop_default&page=';
/** compose url by yourself */
var urls = [];


for (var i = 1; i < 191; i++) {
    (function (k) {
        urls.push(base + k);
    } (i));
}

urls = urls.slice(0, 2);

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('temp.xlsx', buffer);
    console.log('Excel written');
}

Promise.all(Promise.map(urls, singleRequest, { concurrency: 10 })).then(printToExcel);


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
            $('#listing-cards .galleryCard').each(function(index, element) {
                var name = $(this).find('.dotted').text();
                var price = $(this).find('.for-sale-price').text();
                rows.push([name, price]);
                if(rows % 1000 === 0) {
                    printToExcel();
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

/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var columns = ["Name", "We bPage Link", "Address", "Zip Code", "City", "Display Phone", "Real Phone Number"];
var sheet = {name: 'result', data: []};
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 1500;

/** compose url by yourself */
var urls = [];
var base = 'https://www.hitta.se/fris%C3%B6rer/f%C3%B6retag/';
var done = fs.readFileSync('done.txt').toString().split('\r\n');

for (var i = 2; i < 514; i++) {
    (function (k) {
        urls.push(base + k);
    }(i));
}

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('temp.xlsx', buffer);
    console.log('Everything was done successfully');
}

// urls = urls.slice(0, 1);

Promise.all(Promise.map(urls, singleRequest, {concurrency: 3})).then(printToExcel);


/** Single Req */
function singleRequest(url) {
    if (done.indexOf(url) != -1) {
        console.log(url + ' has already done');
        return 0;
    }
    var options = {
        method: 'GET',
        timeout : 30000,
        uri: url,
        headers: {},
        gzip: true
    };
    return rp(options)
        .then(function (body) {
            var $ = cheerio.load(body);
            //process html via cheerio
            var items = $('.result-row-company');
            items.each(function (index, element) {
                var name = $(this).find('.result-row-company__header').find('span').eq(1).text().trim();
                var webpageLink = 'https://www.hitta.se' + $(this).find('.result-row__link').attr('href');
                var address = $(this).find('.result-row__address').find('span').eq(0).text().trim();
                var zipAndCityText = $(this).find('.result-row__address').find('span').eq(1).text().trim();
                var zip = zipAndCityText.match(/\d+\s\d+/);
                // var zip = '';
                // if (zipArray) {
                //     zipArray.forEach(function (item, index, array) {
                //         if (index > 0) {
                //             zip += item;
                //         }
                //     });
                // }
                var city = zipAndCityText.replace(zip, '').trim();
                var displayPhone = $(this).find('.result-row-company__phone').text().trim();
                var realNumberHref = $(this).find('.result-row-company__phone').attr('href');
                var realNumber = realNumberHref.split('=')[realNumberHref.split('=').length - 1];
                rows.push([name, webpageLink, address, zip, city, displayPhone, realNumber]);
            });
            if (items.length > 0) {
                fs.appendFileSync('done.txt', url + '\r\n');
            }
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

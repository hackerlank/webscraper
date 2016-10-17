//http://crautos.com/usados/economicos-usearch2.cfm

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
var url = 'http://crautos.com/usados/economicos-usearch2.cfm';
var pages = [];

for (var i = 466; i < 467; i++) {
    (function (k) {
        pages.push(k);
    } (i));
}


/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('temp.xlsx', buffer);
    console.log('Everything was done successfully');
}

Promise.all(Promise.map(pages, singleRequest, { concurrency: 8 })).then(printToExcel);


/** Single Req */
function singleRequest(page) {
    var form = {
        "rmax": "30",
        "brand": "00",
        "financed": "00",
        "yearfrom": "1960",
        "yearto": "2017",
        "pricefrom": "1",
        "priceto": "999999999",
        "style": "00",
        "orderby": "0",
        "fuel": "0",
        "trans": "0",
        "modelstr": "No Importa",
        "p": page,
    }
    var options = {
        method: 'POST',
        uri: url,
        headers: {
        },
        gzip: true,
        form: form
    };
    return rp(options)
        .then(function (body) {
            var $ = cheerio.load(body);
            $('tr[onmouseover="this.style.backgroundColor=\'#EEEEC7\';"]').each(function (index, element) {
                var id = $(this).find('td').eq(2).find('a').attr('href').match(/\d+/);
                // console.log($(this).find('td').eq(2).find('a').attr('href'));
                fs.appendFileSync('ids.txt', id + '\r\n');
            });
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(url);
                }, timeout);
            });

        }).then(function (url) {
            console.log(page + ' was done');
        }).catch(function (err) {
            //handle errors
            console.log(err);
        });
}

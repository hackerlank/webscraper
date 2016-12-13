/**
 * Created by Administrator on 2016/12/12.
 */
/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

rp = rp.defaults({timeout : 30000});
var columns = ['name', 'subtitle','OrgNummer','Verksamhet'];
var sheet = { name: 'result', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 1500;
var base = 'http://www.allabolag.se/what/fris%C3%B6rer?page='
/** compose url by yourself */
var urls = [];


 for (var i = 1; i < 800; i++) {
    (function (k) {
        urls.push(base + k);
    } (i));
}


/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('allabolag' + Date.now() +'.xlsx', buffer);
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
            $('.search-results__item__text').each(function(index, element) {
                var link = $(this).find('h2 a').attr('href');
                fs.appendFileSync('links.txt', link + '\r\n');
                var name = $(this).find('h2 a').text();
                var subtitle = $(this).find('.search-results__item__subtitle').text();
                var OrgNummer = $(this).find('.search-results__item__details dd').eq(0).text();
                var Verksamhet = $(this).find('.search-results__item__details dd').eq(1).text();
                rows.push([name, subtitle, OrgNummer, Verksamhet]);
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
            console.log(err);
        });
}

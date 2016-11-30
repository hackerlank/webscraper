/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var FACEBOOK_REGEX = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-\.]*)?/;

var columns = ["Name", "Phone", "Website Domain", "Email", "Address", "Postal code", "City", "Facebook Link"];
var sheet = { name: 'result', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 1500;

/** compose url by yourself */
var urls = fs.readFileSync('hrefs.txt').toString().split('\r\n');
urls = urls.slice(0, 100);

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('bokadirekt.xlsx', buffer);
    console.log('Excel printed');
}

Promise.all(Promise.map(urls, singleRequest, { concurrency: 3 })).then(printToExcel);


/** Single Req */
function singleRequest(url) {
    if(url.indexOf('http') == -1) {
        console.log('Invalid url, passed');
        return 0;
    }
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
            var descriptionText = $('#ctl00_MainContent_ctl07__pnlUserContent').text();
            var facebookLink = descriptionText.match(FACEBOOK_REGEX) ? descriptionText.match(FACEBOOK_REGEX) : '';
            var name = $('*[itemprop="name"]').text();
            var phone = $('*[itemprop="telephone"]').text();
            var websiteDomain = $('*[itemprop="url"] a').text();
            var email = $('*[itemprop="email"] a').text();
            var address =$('*[itemprop="streetAddress"]').text().trim();
            var postal =$('*[itemprop="postalCode"]').text().trim();
            var city =$('*[itemprop="addressLocality"]').text().trim();
            rows.push([name, phone, websiteDomain, email, address, postal, city, facebookLink]);
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

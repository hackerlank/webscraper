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
var urls = ['http://www.bizyellow.com/businesses/johnson-law-llc', 'http://www.bizyellow.com/businesses/nail-spot-spa'];

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

var headers = {
    "Cookie": "Cookie:_jsuid=15075952; _ga=GA1.2.1965949943.1476769194; _gat=1; _first_pageview=1; _ceg.s=of8bf1; _ceg.u=of8bf1; _eventqueue=%7B%22heatmap%22%3A%5B%5D%2C%22events%22%3A%5B%5D%7D",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, sdch",
    "Upgrade-Insecure-Requests": 1
}

/** Single Req */
function singleRequest(url) {

    var checker = function (target) {
        var random = Math.floor(Math.random() * pArray.length);
        var proxy = pArray[random];
        var op = { uri: target, method: 'GET', proxy: proxy, timeout: 20000, gzip: true, resolveWithFullResponse: true };
        return rp(op).then(response => {
            var body = response.body;
            if ((!body) || (response.statusCode !== 200) || (body.length < 3000)) {
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
            if (body.toString().match('Claim and update it now')) {
                console.log(url + ' has specific text, should not be done');
                return new Promise(function (res, rej) {
                    setTimeout(function () {
                        res(url);
                    }, timeout);
                });
            } else {
                console.log(url + ' should be done');
                var $ = cheerio.load(body);
                var phoneFromMainPage = $('span[itemprop="telephone"]').find('a').text().trim();
                var websiteFromMainPage = $('#view-website a').attr('href');
                var categoryFromMainPage = $('#other-info').find('p').eq(0).text().trim();
                return checker(url + '/directions').then(function (response) {
                    var directionBody = response.body;
                    var $ = cheerio.load(directionBody);
                    var CompanyName = $('#directions-column p strong').eq(0).text();
                    var address = $('#directions-column p').eq(0).text().trim().replace(CompanyName, '');
                    var cityAndState = $('#crumbs').find('a').eq(2).text();
                    var zipCode = address.split(' ').pop();
                    address = address.replace(zipCode, '');
                    var phoneNumber = phoneFromMainPage;
                    var websiteLink = websiteFromMainPage;
                    var category = categoryFromMainPage;
                    rows.push([CompanyName, address, cityAndState, zipCode, phoneNumber, websiteLink, category]);
                    return new Promise(function (res, rej) {
                        setTimeout(function () {
                            res(url);
                        }, timeout);
                    });
                }).catch(function (err) {
                    console.log(err + '\r\n' + url);
                });
            }
        }).then(function (url) {
            console.log(url + ' was done');
        }).catch(function (err) {
            console.log(err + '\r\n' + url);
        });
}

/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var columns = ['Name', 'Rating', 'Skills'];
var sheet = { name: 'result', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 2000;
var base = 'https://www.upwork.com/o/profiles/browse/c/web-mobile-software-dev/';
/** compose url by yourself */
var urls = [];


for (var i = 20; i < 75333; i++) {
    (function (k) {
        urls.push(base + '?page=' + k);
    } (i));
}


/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('temp.xlsx', buffer);
    console.log('Everything was done successfully');
}

/** configure proxy */
var proxies = fs.readFileSync('usefulproxies.txt').toString();
var pArray = proxies.split('\r\n');

Promise.all(Promise.map(urls, singleRequest, { concurrency: 10 })).then(printToExcel);


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
            // var $ = cheerio.load(body);
            //process html via cheerio
            var jsonStr = body.match(/var phpVars = (.*);/)[1];
            // console.log('json str is ' + jsonStr);
            var profiles = JSON.parse(jsonStr);
            var pages = [];
            profiles.profiles.forEach(function (profile, index, array) {
                var page = 'https://www.upwork.com/freelancers/' + profile.ciphertext;
                pages.push(page);
                fs.appendFileSync('collected.txt', page + '\r\n');
            });
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res({ pages: pages, proxy: entity.proxy });
                }, timeout);
            });

        }).then(function (entity) {
            var pages = entity.pages;
            var proxy = entity.proxy;
            console.log(pages.length + ' freelancers were gathered');
            /** Function to scrape single details */
            function scrapeEach(detailLink) {
                console.log('Start working on ' + detailLink);
                var options = {
                    method: 'GET',
                    uri: detailLink,
                    proxy: proxy,
                    gzip: true
                };
                return rp(options)
                    .then(function (body) {
                        var jsonStr = body.match(/var phpVars = (.*);/)[1];
                        var freelancer = JSON.parse(jsonStr);
                        var profile = freelancer.profile.profile;
                        var name = profile.name;
                        var rating = profile.stats.rating;
                        var skills = profile.skills;
                        var skillStr = '';
                        skills.forEach(function (skill, index, array) {
                            skillStr += skill;
                            if (index < array.length - 1) {
                                skillStr += ', ';
                            }
                        });
                        rows.push([name, rating, skillStr]);
                        return new Promise(function (res, rej) {
                            setTimeout(function () {
                                res('success');
                            }, timeout);
                        });
                    }).then(function (status) {
                        console.log(detailLink + ' status ' + status);
                    });
            }

            // return Promise.map(pages, scrapeEach, { concurrency: 2 });
        }).catch(function (err) {
            //handle errors
            console.log(err.message);
        });
}

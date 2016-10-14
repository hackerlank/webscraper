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
var items = [];
var fullList = JSON.parse(fs.readFileSync('foodtrucks_new.json').toString());

/** record unfetched item */
var unfetched = [];

fullList.forEach(function (business, index, array) {
    if (fs.existsSync('./foodtrucks/' + business.id + '.json')) {
        console.log(business.id + ' already done, passed');
        return;
    }
    var item = {};
    item['id'] = business.id;
    item['url'] = business.url;
    item['name'] = business.name;
    item['is_claimed'] = business.is_claimed ? 'claimed' : 'unclaimed';
    item['review_count'] = business.review_count;
    item['rating'] = business.rating;
    item['display_address'] = business.display_address;
    item['display_phone'] = business.display_phone;
    item['image_url'] = business.image_url;
    item['reviews'] = [];
    items.push(item);
});

console.log(items.length);

/** configure proxy */
var proxies = fs.readFileSync('proxies.txt').toString();
var pArray = proxies.split('\r\n');

// pArray = pArray.slice(0, 75);

// items = items.slice(0, 3);

Promise.all(Promise.map(items, singleRequest, { concurrency: 10 })).then(function () {
    // fs.writeFileSync('delivery_withreviews_2016101313.json', JSON.stringify(items));
    fs.writeFileSync('unfetched_reviews.json', JSON.stringify(unfetched));
});


/** Single Req */
function singleRequest(item) {
    var url = item.url;
    // console.log('Start ' + url);
    var checker = function (target) {
        var random = Math.floor(Math.random() * pArray.length);
        var proxy = pArray[random];
        var op = { uri: target, method: 'GET', proxy: proxy, timeout: 20000, gzip: true };
        return rp(op).then(body => {
            if ((!body) || (body.length < 1000) || (body.indexOf('content="Yelp"') === -1)) {
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

    return checker(url).then(checkedResult => {
        var body = checkedResult.body;
        var proxy = checkedResult.proxy;
        console.log('start working on ' + url);
        var $ = cheerio.load(body);
        var price = $('.price-range').eq(1).attr('data-remainder');
        var health = $('.health-score-description').text().trim();
        var menu = $('.external-menu').attr('href');
        item['price'] = price;
        item['health'] = health;
        item['menu'] = menu;
        $('.bordered-rail dl').each(function (index, element) {
            var key = $(this).find('dt').text().trim();
            var value = $(this).find('dd').text().trim();
            if (key && (key != '')) {
                item['' + key] = value;
            }
        });
        return new Promise(function (res, rej) {
            setTimeout(function () {
                res(proxy);
            }, timeout);
        });

    }).then(function (proxy) {
        console.log(item.id + 'has ' + item.review_count + ' reviews');
        var reviewUrls = [];
        var base = 'https://www.yelp.com/biz/'
        for (var offset = 0; offset < item.review_count; offset += 20) {
            (function (k) {
                if (k === 0) {
                    reviewUrls.push(base + item.id);
                } else {
                    reviewUrls.push(base + item.id + '?start=' + offset);
                }
            })(offset);
        }
        return Promise.map(reviewUrls, function (reviewUrl) {
            console.log('start working on ' + reviewUrl);
            return checker(reviewUrl).then(checked => {
                var body = checked.body;
                var $ = cheerio.load(body);
                $('div[itemprop="review"]').each(function (index, element) {
                    // $('.review-list .ylist li .review-content').each(function (index, element) {
                    var ratings = $(this).find('meta[itemprop="ratingValue"]').attr('content');
                    var content = $(this).find('p[itemprop="description"]').text();
                    item.reviews.push({ "ratings": ratings, "content": content });
                    content = null;
                });
                return new Promise(function (res, rej) {
                    setTimeout(function () {
                        res();
                    }, timeout);
                });
            }).catch(function (error) {
                fs.writeFileSync('reviewError ' + reviewUrls + '\r\n' + error + '\r\n');
            });

        }, { concurrency: 15 });
    }).then(function () {
        fs.writeFileSync('./foodtrucks/' + item.id + '.json', JSON.stringify(item));
        console.log(item.id + ' was successfully done');
    }).catch(function (err) {
        unfetched.push(item);
    });
}

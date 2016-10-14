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

var timeout = 5000;

/** compose url by yourself */
var items = [];
var fullList = JSON.parse(fs.readFileSync('foodtrucks_new.json').toString());

/** record unfetched item */
var unfetched = [];

fullList.forEach(function (business, index, array) {
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
    items.push(item);
});

/** configure proxy */
var proxies = fs.readFileSync('proxies.txt').toString();
var pArray = proxies.split('\r\n');


Promise.all(Promise.map(items, singleRequest, { concurrency: 10 })).then(function () {
    fs.writeFileSync('delivery_2016101313.json', JSON.stringify(items));
    fs.writeFileSync('unfetched.json', JSON.stringify(unfetched));
});


/** Single Req */
function singleRequest(item) {
    if (item.price) {
        return item;
    }
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
                return body;
            }
        }).catch(error => {
            pArray = pArray.slice(0, pArray.indexOf(proxy)).concat(pArray.slice(pArray.indexOf(proxy) + 1));
            // console.log(proxy + ' not work, removed')
            return checker(target);
        });
    }

    return checker(url).then(body => {
        // var options = {
        //     method: 'GET',
        //     uri: url,
        //     headers: {
        //     },
        //     gzip: true,
        //     timeout: 60000,
        //     proxy: proxy
        // };
        console.log('start working on ' + url);
        // return rp(options)
        //     .then(function (body) {
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
                res(url);
            }, timeout);
        });

    }).then(function (url) {
        console.log(url + ' was done');
    }).catch(function (err) {
        //handle errors
        unfetched.push(item);
    });
    // });
}

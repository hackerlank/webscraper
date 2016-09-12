/// <reference path="../../include.d.ts" />

/**
 * 直接拷贝这个，开始编码
 */

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ew = require('node-xlsx');




var columns = ["name", "phone", "twitter", "address", "lat", "lng", "neighborhood", "city", "state", "country", "canonicalUrl", "category", "checkinsCount", "usersCount", "tipCount", "visitsCount", "url", "tier", "message", "currency", "rating"];

var sheet = { name: 'result', data: [] };//默认就叫result

sheet.data.push(columns);

var rows = sheet.data;

/** 最基本的权限绕过，不伪造浏览器 */
var cookie = '';

var headers = {
    Cookie: cookie
}


// /** 构造任务队列 */
// var urls = [];

// for (var i = 1; i < 100; i++) {
//     (function (k) {
//         urls.push(k);
//     } (i));
// }

// async.mapLimit(urls, 10, function (id, callback) {
//     single(url, callback)
// }, function (err) {
//     if (err) console.log(err);
//     console.log('everything was done');
//     var buffer = ew.build([sheet]);
//     fs.writeFileSync('zcool.xlsx', buffer);
// });


var geoBase = 'https://api.foursquare.com/v2/geo/geocode?locale=en&explicit-lang=false&v=20160908&autocomplete=true&allowCountry=false&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP&query=';
var searchBase = 'https://api.foursquare.com/v2/search/recommendations?locale=en&explicit-lang=false&v=20160908&m=foursquare&query=Nightlife&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP';
var suffix = 'v=20160908&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP';
/**
 * url : anyone of the prameters can fetch data, 
 * 
 */
function single(city, callback) {

    /** geo */
    request({ url: geoBase + city, gzip: true, method: 'GET' }, function (err, resp, body) {
        // fs.writeFileSync('body.json', body);
        var rj = JSON.parse(body);
        try {
            var ne = rj.response.geocode.interpretations.items[0].feature.geometry.bounds.ne.lat + ',' + rj.response.geocode.interpretations.items[0].feature.geometry.bounds.ne.lng;
            var sw = rj.response.geocode.interpretations.items[0].feature.geometry.bounds.sw.lat + ',' + rj.response.geocode.interpretations.items[0].feature.geometry.bounds.sw.lng;
        } catch (error) {
            fs.writeFileSync('error.txt', 'Unexpected Error while geo ' + city + ' - ' + error + '\r\n\r\n');
            return;
        }
        var searchUrl = searchBase + '&limit=26&offset=0&intent=bestnearby&ne=' + ne + '&sw=' + sw;
        //limit=1000&offset=1000&intent=bestnearby&sw=37.73379707124429%2C-122.67917633056639&ne=37.80707148060925%2C-122.22049713134766&
        request({ url: searchUrl, method: 'GET', gzip: true },
            function (e, r, b) {
                var resJson = JSON.parse(b);
                fs.writeFileSync('body.json', b);
                var items = resJson.response.group.results;

                items.forEach(function (item, index, array) {
                    if (item.displayType !== 'venue') {
                        return;
                    }
                    var id = item.venue.id;

                    var detailUrl = 'https://api.foursquare.com/v2/venues/' + id + '?' + suffix;

                    request({ url: detailUrl, gzip: true, method: 'GET' }, function (err, resp, body) {
                        fs.writeFileSync('body.json', body);
                        var resJson = JSON.parse(body);
                        var venue = resJson.response.venue;
                        var name = venue.name;
                        var phone = venue.contact.phone;
                        var twitter = venue.contact.twitter;
                        var address = venue.location.address;
                        var lat = venue.location.lat;
                        var lng = venue.location.lng;
                        var neighborhood = venue.location.neighborhood;
                        var city = venue.location.city;
                        var state = venue.location.state;
                        var country = venue.location.country;
                        var canonicalUrl = venue.canonicalUrl;
                        var category = venue.categories[0].name;
                        var checkinsCount = venue.stats.checkinsCount;
                        var usersCount = venue.stats.usersCount;
                        var tipCount = venue.stats.tipCount;
                        var visitsCount = venue.stats.visitsCount;
                        var url = venue.url;
                        var tier = '';
                        var message = '';
                        var currency = '';
                        if (venue.price) {
                            tier = venue.price.tier;
                            message = venue.price.message;
                            currency = venue.price.currency;
                        }
                        var rating = venue.rating;
                        rows.push([name, phone, twitter, address, lat, lng, neighborhood, city, state, country, canonicalUrl, category, checkinsCount, usersCount, tipCount, visitsCount, url, tier, message, currency, rating]);
                        setTimeout(function () {
                            console.log(id + ' was done, current index ' + index + ' current arraylength ' + array.length);
                            if (index === array.length - 1) {
                                console.log(city + ' was done');
                                var buffer = ew.build([sheet]);
                                fs.writeFileSync('sf.xlsx', buffer);
                            }
                        }, index * 1000);
                    });
                });



            });
    });
}



single('San Francisco', null);
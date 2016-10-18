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

/** final container */
var all = [];

/** compose url by yourself */
var urls = [];

var es = [];
var category = "4bf58dd8d48988d1cb941735";
var cities = ["San Francisco", "New York", "Seattle", "Portland", "Chicago"];
cities.forEach(function (city, index, array) {
    es.push({ category: category, city: city });
});


Promise.all(Promise.map(es, fetchUrls, { concurrency: 2 })).then(function () {
    console.log('All urls pushed to array urls, totally ' + urls.length + ' urls');
    Promise.map(urls, scrape, { concurrency: 5 }).then(function () {
        fs.writeFileSync('foursquare.json', JSON.stringify(all));
        console.log('Everything was done');
    });
});


/** Fetch urls (when the total number more than the page size) */
function fetchUrls(entity) {
    var city = entity.city;
    var category = entity.category;
    var firstSearchUrl = 'https://api.foursquare.com/v2/search/recommendations?near=' + city + '&categoryId=' + category + '&locale=en&explicit-lang=false&v=20161012&m=foursquare&limit=20&offset=0&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP';
    var options = {
        method: 'GET',
        uri: firstSearchUrl,
        headers: {
        },
        gzip: true,
        json: true
    };
    return rp(options)
        .then(function (body) {

            var total = body.response.group.totalResults;
            var offset = 0;
            while (offset <= total) {
                urls.push('https://api.foursquare.com/v2/search/recommendations?near=' + city + '&categoryId=' + category + '&locale=en&explicit-lang=false&v=20160919&m=foursquare&limit=100&offset=' + offset + '&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP');
                offset = offset + 101;
            }
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(total);
                }, timeout);
            });

        }).then(function (total) {
            console.log(total + ' urls fetched');
        }).catch(function (err) {
            //handle errors
            fs.appendFileSync('error.log', err + '\r\n');
        });
}

/** scrape data based on url */
function scrape(url) {
    var options = {
        method: 'GET',
        uri: url,
        headers: {
        },
        gzip: true,
        json: true
    };
    return rp(options)
        .then(function (body) {
            var items = body.response.group.results;
            items.forEach(function (item, index, array) {
                if ((item.displayType === 'venue') && (item.venue.rating)) {
                    all.push(item.venue)
                }
            });

            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(body);
                }, timeout);
            });

        }).then(function (body) {
            console.log(url + ' was done');
        }).catch(function (err) {
            //handle errors
            fs.appendFileSync('error.log', err + '\r\n');
        });
}
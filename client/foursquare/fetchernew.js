/// <reference path="../../include.d.ts" />


var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ew = require('node-xlsx');


function prepareDir(dPath) {
    fs.exists(dPath, function (exists) {
        if (!exists) {
            fs.mkdir(dPath);
        }
    });
}

prepareDir('./usa');
prepareDir('./china');
prepareDir('./uk');


var cityJson = JSON.parse(fs.readFileSync('./cities.json').toString());

var usaCities = cityJson.usa;
var chinaCities = cityJson.china;
var ukCities = cityJson.uk;

/** define remaining cities, for special city names */
var remainingCities = usaCities.concat(chinaCities, ukCities);

var categories = ["4d4b7105d754a06376d81259", "4bf58dd8d48988d116941735", "52e81612bcbc57f1066b7a0d", "56aa371ce4b08b9a8d57356c", "4bf58dd8d48988d117941735", "52e81612bcbc57f1066b7a0e", "4bf58dd8d48988d11e941735", "4bf58dd8d48988d118941735", "4bf58dd8d48988d1d8941735", "4bf58dd8d48988d119941735", "4bf58dd8d48988d1d5941735", "4bf58dd8d48988d120941735", "4bf58dd8d48988d11b941735", "4bf58dd8d48988d11c941735", "4bf58dd8d48988d11d941735", "56aa371be4b08b9a8d57354d", "4bf58dd8d48988d122941735", "4bf58dd8d48988d123941735", "50327c8591d4c4b30a586d5d", "4bf58dd8d48988d121941735", "53e510b7498ebcb1801b55d4", "4bf58dd8d48988d11f941735", "4bf58dd8d48988d11a941735", "4bf58dd8d48988d1d4941735", "4bf58dd8d48988d1d6941735"];

var suffix = 'v=20160908&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP';

/**
 * url : anyone of the prameters can fetch data, 
 * 
 */
function single(country, city, callback) {
    var finalItems = [];
    var ids = [];

    async.mapLimit(categories, 3, function (category, categoryCallBack) {
        var firstSearchUrl = 'https://api.foursquare.com/v2/search/recommendations?near=' + city + '&categoryId=' + category + '&locale=en&explicit-lang=false&v=20160908&m=foursquare&limit=20&offset=0&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP'
        request({ url: firstSearchUrl, method: 'GET', gzip: true }, function (error, response, body) {
            var resJson = JSON.parse(body);
            try {
                var total = resJson.response.group.totalResults;
            } catch (error) {
                fs.appendFileSync('error.txt', 'Unexpected Error while fetching ' + city + ' - ' + error + '\r\n\r\n');
                categoryCallBack();
                return;
            }
            var offset = 0;
            var searchUrls = [];
            while (offset <= total) {
                searchUrls.push('https://api.foursquare.com/v2/search/recommendations?near=' + city + '&categoryId=' + category + '&locale=en&explicit-lang=false&v=20160908&m=foursquare&limit=100&offset=' + offset + '&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP');
                offset = offset + 101;
            }

            async.mapLimit(searchUrls, 1, function (su, scb) {
                request({ url: su, method: 'GET', gzip: true }, function (err, resp, body) {
                    try {
                        var resJson = JSON.parse(body);
                        var sresults = resJson.response.group.results;
                        sresults.forEach(function (rec, index, array) {
                            if ((rec.displayType === 'venue') && (rec.venue.rating)) {
                                var id = rec.venue.id;
                                if (ids.indexOf(id) === -1) {
                                    ids.push(id);
                                }
                            }
                        });
                        scb();
                    } catch (error) {
                        fs.appendFileSync('error.txt', 'Unexpected Error while fetching ' + city + ' - ' + su + ' - ' + error + '\r\n\r\n');
                        scb();
                        return;
                    }
                });
            }, function (error) {
                if (error) console.log(error);
                categoryCallBack();
            });
        });
    }, function (error) {
        if (error) console.log(error);
        console.log(city + ' - all ' + ids.length + ' records');

        async.mapSeries(ids, function (id, cb) {

            var detailUrl = 'https://api.foursquare.com/v2/venues/' + id + '?' + suffix;

            request({ url: detailUrl, gzip: true, method: 'GET' }, function (err, resp, body) {
                try {
                    var resJson = JSON.parse(body);
                    var venue = resJson.response.venue;
                    var name = venue.name;
                    var phone = venue.contact.phone;
                    var twitter = venue.contact.twitter;
                    var address = venue.location.address;
                    var lat = venue.location.lat;
                    var lng = venue.location.lng;
                    var neighborhood = venue.location.neighborhood;
                    var city_fetched = venue.location.city;
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
                } catch (parseError) {
                    fs.appendFileSync('error.txt', 'Unexpected Error while parsing ' + city + ' - ' + id + ' - ' + parseError + '\r\n\r\n');
                    cb();
                    return;
                }
                finalItems.push({ name: name, phone: phone, twitter: twitter, address: address, lat: lat, lng: lng, neighborhood: neighborhood, city_fetched: city, state: state, country: country, canonicalUrl: canonicalUrl, category: category, checkinsCount: checkinsCount, usersCount: usersCount, tipCount: tipCount, visitsCount: visitsCount, url: url, tier: tier, message: message, currency: currency, rating: rating });
                setTimeout(function () {
                    console.log(id + ' was done');
                    cb();
                }, 800);
            });
        }, function (err) {
            if (err) console.log(err);
            /** sort finalItems */
            finalItems.sort(compare('rating'))
            console.log(city + ' was done, length ' + finalItems.length);
            fs.writeFileSync(country + '/' + city + '.json', JSON.stringify(finalItems));
            var cindex = remainingCities.indexOf(city);
            remainingCities = remainingCities.slice(0, cindex).concat(remainingCities.slice(cindex + 1));
            callback();
        });

    });
}

process.on('exit', function () {
    fs.writeFileSync('remainingCities.txt', remainingCities);
});


var cs = ['usa', 'uk', 'china'];

cs.forEach(function (country, index, array) {
    async.mapLimit(cities, 7, function (city, callback) {
        single(country, city, callback)
    }, function (err) {
        if (err) console.log(err);
        console.log(country + ' was done');
    });

});
/** sorting comparation, for Array.sort */
function compare(p) {
    return function (object1, object2) {
        var value1 = object1[p];
        var value2 = object2[p];
        if (value2 < value1) {
            return -1;
        }
        else if (value2 > value1) {
            return 1;
        }
        else {
            return 0;
        }
    }
}


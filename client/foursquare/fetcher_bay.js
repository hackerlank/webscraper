/** For the client asking for Bay area */
/// <reference path="../../include.d.ts" />

//https://en.wikipedia.org/wiki/List_of_metropolitan_areas_of_the_United_States
//https://en.wikipedia.org/wiki/List_of_cities_in_China


var request = require('request');
var fs = require('fs');
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
prepareDir('./aus');
prepareDir('./uk');
prepareDir('./canada');
prepareDir('./sf-bayarea')

var columns = ["name", "phone", "twitter", "facebook", "facebookUsername", "facebookName", "address", "lat", "lng", "neighborhood", "city_fetched", "state", "country", "canonicalUrl", "category", "checkinsCount", "usersCount", "tipCount", "visitsCount", "url", "tier", "message", "currency", "rating"];
var sheet = { name: 'result', data: [] };

sheet.data.push(columns);

var rows = sheet.data;

var cityJson = JSON.parse(fs.readFileSync('./cities.json').toString());


// var usaCities = cityJson.usa;
// var chinaCities = cityJson.china;
// var ukCities = cityJson.uk;

/** define remaining cities, for special city names */
// var remainingCities = usaCities.concat(chinaCities, ukCities);

var categories = ["503288ae91d4c4b30a586d67", "4bf58dd8d48988d1c8941735", "4bf58dd8d48988d10a941735", "4bf58dd8d48988d14e941735", "4bf58dd8d48988d157941735", "4bf58dd8d48988d142941735", "56aa371be4b08b9a8d573568", "52e81612bcbc57f1066b7a03", "4bf58dd8d48988d145941735", "52af3a5e3cf9994f4e043bea", "52af3a723cf9994f4e043bec", "52af3a7c3cf9994f4e043bed", "52af3a673cf9994f4e043beb", "4bf58dd8d48988d1f5931735", "52af3a9f3cf9994f4e043bef", "52af3aaa3cf9994f4e043bf0", "52af3ab53cf9994f4e043bf1", "52af3abe3cf9994f4e043bf2", "52af3ac83cf9994f4e043bf3", "52af3ad23cf9994f4e043bf4", "52af3add3cf9994f4e043bf5", "52af3af23cf9994f4e043bf7", "52af3ae63cf9994f4e043bf6", "52af3afc3cf9994f4e043bf8", "52af3b053cf9994f4e043bf9", "52af3b213cf9994f4e043bfa", "52af3b293cf9994f4e043bfb", "52af3b343cf9994f4e043bfc", "52af3b3b3cf9994f4e043bfd", "52af3b463cf9994f4e043bfe", "52af3b633cf9994f4e043c01", "52af3b513cf9994f4e043bff", "52af3b593cf9994f4e043c00", "52af3b6e3cf9994f4e043c02", "52af3b773cf9994f4e043c03", "52af3b813cf9994f4e043c04", "52af3b893cf9994f4e043c05", "52af3b913cf9994f4e043c06", "52af3b9a3cf9994f4e043c07", "52af3ba23cf9994f4e043c08", "4eb1bd1c3b7b55596b4a748f", "52e81612bcbc57f1066b79fb", "52af0bd33cf9994f4e043bdd", "4deefc054765f83613cdba6f", "52960eda3cf9994f4e043ac9", "52960eda3cf9994f4e043acb", "52960eda3cf9994f4e043aca", "52960eda3cf9994f4e043ac7", "52960eda3cf9994f4e043ac8", "52960eda3cf9994f4e043ac5", "52960eda3cf9994f4e043ac6", "4bf58dd8d48988d111941735", "55a59bace4b013909087cb0c", "55a59bace4b013909087cb30", "55a59bace4b013909087cb21", "55a59bace4b013909087cb06", "55a59bace4b013909087cb1b", "55a59bace4b013909087cb1e", "55a59bace4b013909087cb18", "55a59bace4b013909087cb24", "55a59bace4b013909087cb15", "55a59bace4b013909087cb27", "55a59bace4b013909087cb12", "4bf58dd8d48988d1d2941735", "55a59a31e4b013909087cb00", "55a59af1e4b013909087cb03", "55a59bace4b013909087cb2a", "55a59bace4b013909087cb0f", "55a59bace4b013909087cb09", "55a59bace4b013909087cb36", "4bf58dd8d48988d113941735", "56aa371be4b08b9a8d5734e4", "56aa371be4b08b9a8d5734f0", "56aa371be4b08b9a8d5734e7", "56aa371be4b08b9a8d5734ed", "56aa371be4b08b9a8d5734ea", "4bf58dd8d48988d156941735", "4eb1d5724b900d56c88a45fe", "56aa371be4b08b9a8d57350e", "4bf58dd8d48988d149941735", "56aa371be4b08b9a8d573502", "52af39fb3cf9994f4e043be9", "4bf58dd8d48988d14a941735", "4bf58dd8d48988d169941735", "52e81612bcbc57f1066b7a01", "52e81612bcbc57f1066b7a02", "4bf58dd8d48988d17a941735", "4bf58dd8d48988d144941735", "4bf58dd8d48988d154941735", "5293a7d53cf9994f4e043a45", "52e81612bcbc57f1066b7a00", "52f2ae52bcbc57f1066b8b81", "4bf58dd8d48988d108941735", "5744ccdfe4b0c0459246b4d0", "4bf58dd8d48988d109941735", "52e928d0bcbc57f1066b7e97", "56aa371be4b08b9a8d5734f3", "52960bac3cf9994f4e043ac4", "52e928d0bcbc57f1066b7e98", "52e81612bcbc57f1066b7a05", "4bf58dd8d48988d10b941735", "4bf58dd8d48988d16e941735", "52e81612bcbc57f1066b7a09", "4bf58dd8d48988d10c941735", "57558b36e4b065ecebd306b6", "57558b36e4b065ecebd306b8", "57558b36e4b065ecebd306bc", "57558b36e4b065ecebd306c5", "57558b36e4b065ecebd306c0", "57558b36e4b065ecebd306cb", "57558b36e4b065ecebd306ce", "57558b36e4b065ecebd306d1", "57558b36e4b065ecebd306d4", "57558b36e4b065ecebd306d7", "57558b36e4b065ecebd306da", "57558b36e4b065ecebd306ba", "4bf58dd8d48988d10d941735", "56aa371ce4b08b9a8d573572", "56aa371ce4b08b9a8d573574", "56aa371ce4b08b9a8d573592", "56aa371ce4b08b9a8d573578", "56aa371ce4b08b9a8d57357b", "56aa371ce4b08b9a8d573587", "56aa371ce4b08b9a8d57357f", "56aa371ce4b08b9a8d573576", "4c2cd86ed066bed06c3c5209", "4bf58dd8d48988d10e941735", "53d6c1b0e4b02351e88a83e2", "53d6c1b0e4b02351e88a83d6", "53d6c1b0e4b02351e88a83da", "53d6c1b0e4b02351e88a83d4", "53d6c1b0e4b02351e88a83e0", "53d6c1b0e4b02351e88a83de", "52e81612bcbc57f1066b79ff", "52e81612bcbc57f1066b79fe", "52e81612bcbc57f1066b79fa", "4bf58dd8d48988d10f941735", "54135bf5e4b08f3d2429dfe5", "54135bf5e4b08f3d2429dff3", "54135bf5e4b08f3d2429dff5", "54135bf5e4b08f3d2429dff2", "54135bf5e4b08f3d2429dfe8", "54135bf5e4b08f3d2429dfe9", "54135bf5e4b08f3d2429dfe6", "54135bf5e4b08f3d2429dfdf", "54135bf5e4b08f3d2429dfea", "54135bf5e4b08f3d2429dfeb", "54135bf5e4b08f3d2429dfed", "54135bf5e4b08f3d2429dfee", "54135bf5e4b08f3d2429dff4", "54135bf5e4b08f3d2429dfe0", "54135bf5e4b08f3d2429dfdd", "54135bf5e4b08f3d2429dff6", "54135bf5e4b08f3d2429dfef", "54135bf5e4b08f3d2429dff0", "54135bf5e4b08f3d2429dff1", "54135bf5e4b08f3d2429dfde", "54135bf5e4b08f3d2429dfec", "4bf58dd8d48988d110941735", "55a5a1ebe4b013909087cbb6", "55a5a1ebe4b013909087cba7", "55a5a1ebe4b013909087cba1", "55a5a1ebe4b013909087cba4", "55a5a1ebe4b013909087cb95", "55a5a1ebe4b013909087cb89", "55a5a1ebe4b013909087cb9b", "55a5a1ebe4b013909087cb98", "55a5a1ebe4b013909087cbbf", "55a5a1ebe4b013909087cbb0", "55a5a1ebe4b013909087cbb3", "55a5a1ebe4b013909087cbaa", "55a5a1ebe4b013909087cb83", "55a5a1ebe4b013909087cb8c", "55a5a1ebe4b013909087cb92", "55a5a1ebe4b013909087cb8f", "55a5a1ebe4b013909087cb86", "55a5a1ebe4b013909087cbb9", "55a5a1ebe4b013909087cbbc", "55a5a1ebe4b013909087cb9e", "55a5a1ebe4b013909087cbc2", "55a5a1ebe4b013909087cbad", "52e81612bcbc57f1066b79fd", "52e81612bcbc57f1066b79fc", "5283c7b4e4b094cb91ec88d7", "4bf58dd8d48988d1be941735", "4bf58dd8d48988d152941735", "52939a8c3cf9994f4e043a35", "5745c7ac498e5d0483112fdb", "4bf58dd8d48988d1cd941735", "4bf58dd8d48988d107941735", "4bf58dd8d48988d16b941735", "52939ae13cf9994f4e043a3b", "52939a9e3cf9994f4e043a36", "52939af83cf9994f4e043a3d", "52939aed3cf9994f4e043a3c", "52939aae3cf9994f4e043a37", "52939ab93cf9994f4e043a38", "52939ac53cf9994f4e043a39", "52939ad03cf9994f4e043a3a", "4eb1bfa43b7b52c0e1adc2e8", "56aa371be4b08b9a8d573558", "4bf58dd8d48988d1c0941735", "4bf58dd8d48988d1c3941735", "4bf58dd8d48988d1c1941735", "56aa371ae4b08b9a8d5734ba", "5744ccdfe4b0c0459246b4d3", "4bf58dd8d48988d115941735", "56aa371be4b08b9a8d573529", "5744ccdfe4b0c0459246b4ca", "52e81612bcbc57f1066b79f7", "52e81612bcbc57f1066b79f9", "4bf58dd8d48988d1c2941735", "52e81612bcbc57f1066b79f8", "52e81612bcbc57f1066b7a04", "4def73e84765ae376e57713a", "4bf58dd8d48988d1c4941735", "5293a7563cf9994f4e043a44", "4bf58dd8d48988d1c6941735", "5744ccdde4b0c0459246b4a3", "4bf58dd8d48988d1ce941735", "56aa371be4b08b9a8d57355a", "4bf58dd8d48988d14f941735", "4bf58dd8d48988d150941735", "4bf58dd8d48988d14d941735", "4bf58dd8d48988d1db931735", "5413605de4b0ae91d18581a9", "4bf58dd8d48988d158941735", "56aa371be4b08b9a8d573538", "4f04af1f2fb6e1c99f3db0bb", "5283c7b4e4b094cb91ec88d8", "5283c7b4e4b094cb91ec88d6", "56aa371be4b08b9a8d573535", "56aa371be4b08b9a8d5734bd", "56aa371be4b08b9a8d5734bf", "5283c7b4e4b094cb91ec88d4", "52e928d0bcbc57f1066b7e96", "52e928d0bcbc57f1066b7e9b", "4bf58dd8d48988d1d3941735", "4d4b7105d754a06376d81259", "4bf58dd8d48988d116941735", "52e81612bcbc57f1066b7a0d", "56aa371ce4b08b9a8d57356c", "4bf58dd8d48988d117941735", "52e81612bcbc57f1066b7a0e", "4bf58dd8d48988d11e941735", "4bf58dd8d48988d118941735", "4bf58dd8d48988d1d8941735", "4bf58dd8d48988d119941735", "4bf58dd8d48988d1d5941735", "4bf58dd8d48988d120941735", "4bf58dd8d48988d11b941735", "4bf58dd8d48988d11c941735", "4bf58dd8d48988d11d941735", "56aa371be4b08b9a8d57354d", "4bf58dd8d48988d122941735", "4bf58dd8d48988d123941735", "50327c8591d4c4b30a586d5d", "4bf58dd8d48988d121941735", "53e510b7498ebcb1801b55d4", "4bf58dd8d48988d11f941735", "4bf58dd8d48988d11a941735", "4bf58dd8d48988d1d4941735", "4bf58dd8d48988d1d6941735", "4bf58dd8d48988d1e0931735"];


var suffix = 'v=20160919&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP';

/**
 * url : anyone of the prameters can fetch data, 
 * 
 */
function single(country, city, callback) {
    var already = fs.existsSync(country + '/' + city.split(',')[0] + '.json');
    if (already) {
        console.log(country + ' - ' + city + ' already exists, ignore');
        callback();
        return;
    }
    var finalItems = [];
    var ids = [];

    async.mapLimit(categories, 3, function (category, categoryCallBack) {
        var firstSearchUrl = 'https://api.foursquare.com/v2/search/recommendations?near=' + city + '&categoryId=' + category + '&locale=en&explicit-lang=false&v=20160919&m=foursquare&limit=20&offset=0&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP';
        request({ url: firstSearchUrl, method: 'GET', gzip: true, timeout: 60000 }, function (error, response, body) {
            if (error && (error.code === 'ETIMEDOUT' || error.connect === true)) {
                fs.appendFileSync('error.txt', 'Timeout ' + category + ' item ' + name + '\r\n\r\n');
                categoryCallBack();
                return;
            }
            try {
                var resJson = JSON.parse(body);
                if (resJson.meta.code !== 200) {
                    fs.appendFileSync('codeError.txt', country + ' - ' + city + ' - ' + firstSearchUrl + ' - ' + '\r\n\r\n');
                    categoryCallBack();
                    return;
                }
            } catch (e) {
                console.log(e);
                fs.appendFileSync('body.json', firstSearchUrl + ' - ' + body + '\r\n\r\n\r\n');
            }
            try {
                var total = resJson.response.group.totalResults;
                if ((!total) || (total === 0)) {
                    categoryCallBack();
                    return;
                }
            } catch (error) {
                fs.appendFileSync('error.txt', 'Unexpected Error while fetching ' + city + ' - ' + error + '\r\n\r\n');
                categoryCallBack();
                return;
            }
            var offset = 0;
            var searchUrls = [];
            while (offset <= total) {
                searchUrls.push('https://api.foursquare.com/v2/search/recommendations?near=' + city + '&categoryId=' + category + '&locale=en&explicit-lang=false&v=20160919&m=foursquare&limit=100&offset=' + offset + '&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP');
                offset = offset + 101;
            }
            // fs.appendFileSync('urls.txt', searchUrls + '\r\n');
            async.mapLimit(searchUrls, 1, function (su, scb) {
                request({ url: su, method: 'GET', gzip: true, timeout: 60000 }, function (err, resp, body) {
                    if (err && (err.code === 'ETIMEDOUT' || err.connect === true)) {
                        fs.appendFileSync('error.txt', 'Timeout ' + searchUrls + '\r\n\r\n');
                        scb();
                        return;
                    }
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

        async.mapLimit(ids, 10, function (id, cb) {

            var detailUrl = 'https://api.foursquare.com/v2/venues/' + id + '?' + suffix;

            request({ url: detailUrl, gzip: true, method: 'GET', timeout: 60000 }, function (err, resp, body) {
                if (err && (err.code === 'ETIMEDOUT' || err.connect === true)) {
                    fs.appendFileSync('error.txt', 'Timeout ' + detailUrl + '\r\n\r\n');
                    cb();
                    return;
                }
                try {
                    var resJson = JSON.parse(body);
                    var venue = resJson.response.venue;
                    var name = venue.name;
                    var phone = venue.contact.phone;
                    var twitter = venue.contact.twitter;
                    var facebook = venue.contact.facebook;
                    var facebookUsername = venue.contact.facebookUsername;
                    var facebookName = venue.contact.facebookName;
                    // var website = venue.url;                              
                    var address = venue.location.address;
                    var lat = venue.location.lat;
                    var lng = venue.location.lng;
                    var neighborhood = venue.location.neighborhood;
                    var city_fetched = venue.location.city;
                    var state = venue.location.state;
                    var country = venue.location.country;
                    var canonicalUrl = venue.canonicalUrl;
                    var cateId = venue.categories[0].id;
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
                    var businessTime = '';
                    if (venue.hours && venue.hours.timeframes) {
                        businessTime = venue.hours.timeframes;
                    }

                } catch (parseError) {
                    fs.appendFileSync('error.txt', 'Unexpected Error while parsing ' + city + ' - ' + id + ' - ' + parseError + '\r\n\r\n');
                    cb();
                    return;
                }
                if (categories.indexOf(cateId) !== -1) {
                    rows.push([name, phone, twitter, facebook, facebookUsername, facebookName, address, lat, lng, neighborhood, city_fetched, state, country, canonicalUrl, category, checkinsCount, usersCount, tipCount, visitsCount, url, tier, message, currency, rating]);
                }
                setTimeout(function () {
                    console.log(id + ' was done');
                    cb();
                }, 500);
            });
        }, function (err) {
            if (err) console.log(err);
            console.log(city + ' was done');
            callback();
        });

    });
}

process.on('exit', function () {
    // fs.writeFileSync('remainingCities.txt', remainingCities);
});

// async.mapLimit(["San Francisco"], 10, function (city, callback) {
//     single('usa', city, callback)
// }, function (err) {
//     if (err) console.log(err);
//     console.log(country + ' was done');
// });

var cs = ['usa_sf_bayarea'];

cs.forEach(function (country, index, array) {
    async.mapLimit(cityJson[country], 7, function (city, callback) {
        single(country, city, callback)
    }, function (err) {
        if (err) console.log(err);
        var buffer = ew.build([sheet]);
        fs.writeFileSync('sf-bayarea_demo.xlsx', buffer);
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


// var cheerio = require('cheerio');
// var cates = [];
// request({ url: 'https://developer.foursquare.com/categorytree', gzip: true, method: 'GET' }, function (err, resp, body) {
//     var $ = cheerio.load(body);

//     $('.level-1 li .name').each(function (index, element) {
//         if ($(this).text().trim() === 'Food') {
//             $(this).parent('.categoryDescription').find('.children .level-2 li').each(function (index, element) {
//                 if ($(this).find('.name').eq(0).text().indexOf('Restaurant') !== -1) {
//                     var name = $(this).find('.name').eq(0).text().trim();
//                     var id = $(this).find('.id tt').eq(0).text().trim();
//                     // cates.push({name : name, id : id});
//                     cates.push(id);
//                 }
//             });
//         }
//     });
//     console.log(cates.length);
//     fs.writeFileSync('catesrow.txt', JSON.stringify(cates));
// });
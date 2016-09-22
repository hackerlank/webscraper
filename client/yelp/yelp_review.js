/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
/* require the modules needed */
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');
var ew = require('node-xlsx');
var jsonfile = require('jsonfile');
var util = require('util');

var columns = ['name', 'rating', 'phone', 'url', 'price', 'category'];

var sheet = { name: 'result', data: [] };

sheet.data.push(columns);

var rows = sheet.data;

/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */
var request_yelp = function (api, set_parameters, callback) {
    var consumer_key = api.auth[0];
    var token = api.auth[1];
    var consumer_sec = api.auth[2];
    var token_sec = api.auth[3];
    /* The type of request */
    var httpMethod = 'GET';

    /* The url we are using for the request */
    var url = '';
    var default_parameters = {};
    if (api.type === 'search') {
        url = 'http://api.yelp.com/v2/search';
        /* We can setup default parameters here */
        default_parameters = {
            location: 'San Francisco',
            sort: '0'
        };
    } else if (api.type === 'business') {
        url = 'https://api.yelp.com/v2/business/' + api.bid;
    } else if (api.type === 'review') {
        url = 'https://api.yelp.com/v2/businesses/' + api.bid + '/reviews'
    }

    /* We set the require parameters here */
    var required_parameters = {
        oauth_consumer_key: consumer_key,
        oauth_token: token,
        oauth_nonce: n(),
        oauth_timestamp: n().toString().substr(0, 10),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0'
    };

    /* We combine all the parameters in order of importance */
    var parameters = _.assign(default_parameters, set_parameters, required_parameters);

    /* We set our secrets here */
    var consumerSecret = consumer_sec;
    var tokenSecret = token_sec;

    /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
    /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
    var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });

    /* We add the signature to the list of paramters */
    parameters.oauth_signature = signature;

    /* Then we turn the paramters object, to a query string */
    var paramURL = qs.stringify(parameters);

    /* Add the query string to the url */
    var apiURL = url + '?' + paramURL;

    /* Then we use request to send make the API Request */
    request(apiURL, function (error, response, body) {
        return callback(error, response, body);
    });

};


// data = {
// 	'grant_type': 'client_credentials',
// 	'client_id': 'UnFptTiqd25GkIJo8d3E3g',
// 	'client_secret': 'Eib9jUMb8QKgZIQF10RlAodej2uorLtkHctgOsbVnNyXv9ZW9Cf2dgRuJSxoLDKs'
// }
/** v3 api */
// apiInfo = {
//     appId: 'rQxgTpLT_OsY3nvdrcowIg',
//     appSec: '59ah9NwqLRliPyrdVqkLafsOltdux37VcjfLQZ1BdyGT2mTVTP7q0MCTRXdJREcx',
//     grant_type: 'client_credentials'
// }

var request_yelp_v3 = function (appInfo, runInfo, callback) {
    var required_parameters = {
        grant_type: appInfo.grant_type,
        client_id: appInfo.appId,
        client_secret: appInfo.appSec
    };

    var paramURL = qs.stringify(required_parameters);
    var tokenUrl = 'https://api.yelp.com/oauth2/token';
    console.log(tokenUrl + '?' + paramURL);
    request({ url: tokenUrl + '?' + paramURL, method: 'POST' }, function (err, resp, body) {
        console.log(body);
    });

    // if (runInfo.type = 'review') {
    //     var url = 'https://api.yelp.com/v3/businesses/' + runInfo.id + '/reviews';

    // }
}

var food = { type: 'food', auth: ['D39sJgBReatVUjYcaw4Giw', '4FB08NtU64bqRedN8tymwGGknZkGfkkC', 'QBZjSbJWvSjxJWh3xZXBp7ESL_M', '1CWM6CM_3YISGFPXewwuf67Yf7E'] };
var nightlife = { type: 'nightlife', auth: ['LMPzr51KN5dpW3Z7DS6ZYw', 'hsLQDPhQkkWZ-lRk-xwyZ_toVy8GkP8C', 'yAEgTAq2j6DagR1T1BpCNjsLS_U', '88au7Hq6lMw3T5YWAAcOgCXJM8c'] };
var restaurants = { type: 'restaurants', auth: ['1PTTNbZLc_nm0EPb8VD0_w', 'pj1lm5gnYI_ZqLpfe_n9RF235B2C8Sbc', 'SkP6TbFZX3b_W-ECFgu4HD5HxlY', '--6obL7D6iwAdYyMPektuwXGM8c'] };
var beautysvc = { type: 'beautysvc', auth: ['5PdL-gP7n6F-e0U1Mzn0DQ', 'FVOFgN2P6V7MaL7tlZOgR4Pgc-jR50yA', 'GRikuhra_nb2VYTlfhKpXiFyirw', 'CYjHEmzSwH7YE7-PGmQOSb9xaA4'] };


var coffe = { type: 'coffee', auth: ['Q9ytXgv7OcR2aC2HYDsGPg', 'KdkGSp3vHhxzajyR2sNfkpY15m53MaSV', 'MlUPkhWTf-2ar9ZWhnNlRb1PDZg', 'fUufpxoSWMiwutlBmKs9x5_ck8o'] };
var bars = { type: 'bars', auth: ['Q9ytXgv7OcR2aC2HYDsGPg', 'KdkGSp3vHhxzajyR2sNfkpY15m53MaSV', 'MlUPkhWTf-2ar9ZWhnNlRb1PDZg', 'fUufpxoSWMiwutlBmKs9x5_ck8o'] };
var restaurants = { type: 'restaurants', auth: ['Q9ytXgv7OcR2aC2HYDsGPg', 'KdkGSp3vHhxzajyR2sNfkpY15m53MaSV', 'MlUPkhWTf-2ar9ZWhnNlRb1PDZg', 'fUufpxoSWMiwutlBmKs9x5_ck8o'] };
var categories = [restaurants, coffe, bars];


// var sfRecords = [];
// async.mapLimit(categories, 3, function (category, callback) {
//     singleBusiness(category.auth, category.type, callback);
// }, function (err) {
//     var sfJson = JSON.stringify(sfRecords);
//     fs.writeFileSync('sf_items.json', sfJson);
// });




function singleBusiness(auth, category, callback) {
    /* the first req, fetch total */
    request_yelp({ type: 'search', auth: auth }, { category_filter: category, limit: 2 }, function (error, response, body) {
        if (error || (!body)) {
            fs.appendFileSync('error.txt', 'Something wrong with ' + category + ' first request\r\n\r\n');
            callback();
            return;
        }
        try {
            var rJson = JSON.parse(body);
        } catch (err) {
            fs.appendFileSync('error.txt', 'Something wrong with ' + category + ' first request json parsing \r\n\r\n');
            callback();
            return;
        }
        var total = rJson.total;

        /** b20 loops */
        var forms = [];
        for (var offset = 0; offset < 1000; offset += 20) {
            (function (k) {
                if (k === 0) {
                    forms.push({ category_filter: category, limit: 20 });
                } else {
                    forms.push({ category_filter: category, limit: 20, offset: k });
                }
            })(offset);
        }

        async.mapLimit(forms, 5, function (form, innerCb) {
            request_yelp({ type: 'search', auth: auth }, form, function (error, response, body) {
                try {
                    var rJson = JSON.parse(body);
                } catch (err) {
                    fs.appendFileSync('error.txt', 'Something wrong with ' + category + ' with request json' + JSON.stringify(form) + '\r\n\r\n');
                    fs.appendFileSync('error.json', body + '\r\n\r\n');
                    innerCb();
                    return;
                }
                if (!rJson.businesses) {
                    fs.appendFileSync('error.txt', 'here Something wrong with ' + category + ' with request json' + JSON.stringify(form) + '\r\n\r\n');
                    fs.appendFileSync('error.json', body + '\r\n\r\n');
                    innerCb();
                    return;
                }
                var items = rJson.businesses;
                async.mapLimit(items, 5, function (business, uicb) {
                    var id = business.id;
                    var name = business.name;
                    var rating = business.rating;
                    var reviewCount = business.review_count;
                    sfRecords.push({ id: id, name: name, rating: rating, reviewCount: reviewCount });
                    setTimeout(function () {
                        uicb();
                    }, 100);
                }, function (err) {
                    setTimeout(function () {
                        innerCb();
                        console.log('category ' + category + ' - ' + (form.offset ? form.offset : 0) + ' was done')
                    }, 100);
                });
            });
        }, function (err) {
            console.log(category + ' was done');
            callback();
        });
    });
}



// request_yelp({ type: 'review', bid: 'so-san-francisco-4', auth: ['D39sJgBReatVUjYcaw4Giw', '4FB08NtU64bqRedN8tymwGGknZkGfkkC', 'QBZjSbJWvSjxJWh3xZXBp7ESL_M', '1CWM6CM_3YISGFPXewwuf67Yf7E'] }, {}, function (error, response, body) {
//     fs.writeFileSync('sf-reviews.json', body);
// });

// var accessToken = 'aqKeXPatJnHAFTXPoyuhkrIbgDvt5KfFrkwitxXGVGrtexzENT57Pk2EPmGoebTeQT7-iMC6Ul-Q568toAA4oe8LUNlL571AjfEHfNktKUKzhYD--mizotdiG4bdV3Yx';
// var url = 'https://api.yelp.com/v3/businesses/so-san-francisco-4/reviews?token=' + accessToken;

// request({ url: url, method: 'GET' }, function (err, resp, body) {
//     fs.writeFileSync('sf-reviews.json', body);
// });

var after = [];

var items = JSON.parse(fs.readFileSync('sf_items.json').toString());

process.on('exit', function () {
    fs.writeFileSync('error_occur.json', JSON.stringify(items));
});


async.mapLimit(items, 2, function (item, outCallback) {
    var count = item.reviewCount;
    /** b20 loops */
    var urls = [];
    var base = 'https://www.yelp.com/biz/'
    for (var offset = 0; offset < count; offset += 20) {
        (function (k) {
            if (k === 0) {
                urls.push(base + item.id);
            } else {
                urls.push(base + item.id + '?start=' + offset);
            }
        })(offset);
    }

    var reviews = [];
    // item['reviews'] = '';
    async.mapLimit(urls, 2, function (url, insideCallback) {
        request({ url: url, method: 'GET', gzip: true, timeout: 60000 }, function (err, resp, body) {
            if (err && (err.code === 'ETIMEDOUT' || err.connect === true)) {
                fs.appendFileSync('TimeoutError.txt', 'Timeout ' + url + '\r\n\r\n');
                insideCallback();
                return;
            }
            if ((!resp) || (!body) || (body.length < 10)) {
                fs.appendFileSync('reviewError.txt', url + '\r\n');
                insideCallback();
                return;
            }
            var $ = cheerio.load(body);
            $('.review-list .ylist li .review-content').each(function (index, element) {
                var ratings = $(this).find('meta[itemprop="ratingValue"]').attr('content');
                var content = $(this).find('p[itemprop="description"]').text();
                reviews.push({ "ratings": ratings, "content": content });
                // item['reviews'] += "{ r:" + ratings + ", c: " + content + "},";
            });

            setTimeout(function () {
                console.log(url + ' was done');
                insideCallback();
            }, 2000);
        });
    }, function (err) {
        setTimeout(function () {
            console.log(item.id + ' was done');
            item['reviewList'] = reviews;
            outCallback();
        }, 500);
    });

}, function (err) {
    fs.writeFileSync('sf_reviews.json', JSON.stringify(items));
    console.log('Everything was done');
    // var cache = [];
    // JSON.stringify(items, function (key, value) {
    //     if (typeof value === 'object' && value !== null) {
    //         if (cache.indexOf(value) !== -1) {
    //             // Circular reference found, discard key
    //             return;
    //         }
    //         // Store value in our collection
    //         cache.push(value);
    //     }
    //     return value;
    // });
    // cache = null; // Enable garbage collection
    // // console.log(items);
});

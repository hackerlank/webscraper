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
        var url = 'http://api.yelp.com/v2/search';
        /* We can setup default parameters here */
        default_parameters = {
            location: 'San+Francisco',
            sort: '0'
        };
    } else if (api.type === 'business') {
        var url = 'https://api.yelp.com/v2/business/' + api.bid;
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


var food = { type: 'food', auth: ['D39sJgBReatVUjYcaw4Giw', '4FB08NtU64bqRedN8tymwGGknZkGfkkC', 'QBZjSbJWvSjxJWh3xZXBp7ESL_M', '1CWM6CM_3YISGFPXewwuf67Yf7E'] };
var nightlife = { type: 'nightlife', auth: ['LMPzr51KN5dpW3Z7DS6ZYw', 'hsLQDPhQkkWZ-lRk-xwyZ_toVy8GkP8C', 'yAEgTAq2j6DagR1T1BpCNjsLS_U', '88au7Hq6lMw3T5YWAAcOgCXJM8c'] };
var restaurants = { type: 'restaurants', auth: ['1PTTNbZLc_nm0EPb8VD0_w', 'pj1lm5gnYI_ZqLpfe_n9RF235B2C8Sbc', 'SkP6TbFZX3b_W-ECFgu4HD5HxlY', '--6obL7D6iwAdYyMPektuwXGM8c'] };
var beautysvc = { type: 'beautysvc', auth: ['5PdL-gP7n6F-e0U1Mzn0DQ', 'FVOFgN2P6V7MaL7tlZOgR4Pgc-jR50yA', 'GRikuhra_nb2VYTlfhKpXiFyirw', 'CYjHEmzSwH7YE7-PGmQOSb9xaA4'] };

var categories = [food, nightlife, restaurants, beautysvc];

async.mapLimit(categories, 4, function (category, callback) {
    singleBusiness(category.auth, category.type, callback);
}, function (err) {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('sf-first100.xlsx', buffer);
});

// request('https://www.yelp.com/biz/bon-nene-san-francisco?adjust_creative=D39sJgBReatVUjYcaw4Giw\u0026utm_campaign=yelp_api\u0026utm_medium=api_v2_search\u0026utm_source=D39sJgBReatVUjYcaw4Giw', function(e, r, b) {
//     console.log(b);
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
                    var name = business.name;
                    var rating = business.rating;
                    var phone = business.phone;
                    var url = business.url;
                    request(url, function (e, r, b) {
                        try {
                            var $ = cheerio.load(b);
                        } catch (err) {
                            fs.appendFileSync('error.txt', 'Something wrong with ' + category + ' item ' + name + '\r\n\r\n');
                            fs.appendFileSync('error.json', b + '\r\n\r\n');
                            uicb();
                            return;
                        }
                        var price = $('.price-range').text();
                        rows.push([name, rating, phone, url, price, category]);
                        setTimeout(function () {
                            console.log(business.name + ' was done');
                            uicb();
                        }, 2000);
                    });

                }, function (err) {
                    setTimeout(function () {
                        innerCb();
                        console.log('category ' + category + ' - ' + form.offset + ' was done')
                    }, 100);
                });
            });
        }, function (err) {
            console.log(category + ' was done');
            callback();
        });
    });
}



// request_yelp({ type: 'business', bid: 'tacorea-san-francisco' }, {actionlinks:true, cc :'US', lang : 'en'}, function (error, response, body) {
//     fs.writeFileSync('sf-food_detail.json', body);
// });
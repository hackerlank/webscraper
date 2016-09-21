/** to apppend yelp page based on foursquare result */

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

    var term = api.term;
    var location = api.location;
    /* The type of request */
    var httpMethod = 'GET';

    /* The url we are using for the request */
    var url = '';
    var default_parameters = {};
    if (api.type === 'search') {
        var url = 'http://api.yelp.com/v2/search';
        /* We can setup default parameters here */
        default_parameters = {
            location: location,
            term: term,
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
    request(apiURL, { timeout: 50000 }, function (error, response, body) {
        return callback(error, response, body);
    });

};


var food = { type: 'food', auth: ['D39sJgBReatVUjYcaw4Giw', '4FB08NtU64bqRedN8tymwGGknZkGfkkC', 'QBZjSbJWvSjxJWh3xZXBp7ESL_M', '1CWM6CM_3YISGFPXewwuf67Yf7E'] };
var nightlife = { type: 'nightlife', auth: ['LMPzr51KN5dpW3Z7DS6ZYw', 'hsLQDPhQkkWZ-lRk-xwyZ_toVy8GkP8C', 'yAEgTAq2j6DagR1T1BpCNjsLS_U', '88au7Hq6lMw3T5YWAAcOgCXJM8c'] };
var restaurants = { type: 'restaurants', auth: ['1PTTNbZLc_nm0EPb8VD0_w', 'pj1lm5gnYI_ZqLpfe_n9RF235B2C8Sbc', 'SkP6TbFZX3b_W-ECFgu4HD5HxlY', '--6obL7D6iwAdYyMPektuwXGM8c'] };
var beautysvc = { type: 'beautysvc', auth: ['5PdL-gP7n6F-e0U1Mzn0DQ', 'FVOFgN2P6V7MaL7tlZOgR4Pgc-jR50yA', 'GRikuhra_nb2VYTlfhKpXiFyirw', 'CYjHEmzSwH7YE7-PGmQOSb9xaA4'] };

var fromGit1 = { type: '', auth: ['Q9ytXgv7OcR2aC2HYDsGPg', 'KdkGSp3vHhxzajyR2sNfkpY15m53MaSV', 'MlUPkhWTf-2ar9ZWhnNlRb1PDZg', 'fUufpxoSWMiwutlBmKs9x5_ck8o'] };


var filePath = 'usa_all_deliver.xlsx'

var sheet = ew.parse(fs.readFileSync(filePath))[0];

var rows = sheet.data;

// process.on('exit', function () {
//     var buffer = ew.build([{ name: 'yelpappended', data: rows }]);
//     fs.writeFileSync('yelpappended_all.xlsx', buffer);
//     console.log('done');
// });

rows = rows.slice(38562);

rows[0].push('yelp page');

async.mapLimit(rows, 10, function (row, callback) {
    if (row[0] == 'name') {
        callback();
        return;
    }

    var name = row[0];
    var phone = row[1];
    var city = row[10];

    request_yelp({ type: 'search', auth: restaurants.auth, term: name, location: city }, {}, function (error, response, body) {
        if (error && (error.code === 'ETIMEDOUT' || error.connect === true)) {
            fs.appendFileSync('TimeoutError.txt', 'Timeout ' + name + '\r\n\r\n');
            callback();
            return;
        }
        try {
            var resJson = JSON.parse(body);
        } catch (error) {
            fs.appendFileSync('ParseError.txt', 'Parse error - ' + name + '\r\n');
            callback();
            return;
        }

        var businesses = resJson.businesses;

        if (!businesses) {
            fs.appendFileSync('NonBussinessError.txt', 'Non business error - ' + name + '\r\n');
            callback();
            return;
        }
        var flag = 0;
        businesses.forEach(function (record, index, array) {
            if ((flag === 0) && (record.name === name) && (record.phone === phone)) {
                row.push(record.url);
                flag = 1;
            }
        });
        setTimeout(function () {
            if (flag === 1) {
                var so = {};
                so.name = name;
                so.phone = phone;
                so.yelpurl = row[row.length - 1];
                fs.appendFileSync('done.txt', JSON.stringify(so) + '\r\n');
            }
            console.log(name + ' was done');
            callback();
        }, 200);
    });
}, function (err) {
    var buffer = ew.build([{ name: 'yelpappended', data: rows }]);
    fs.writeFileSync('yelpappended_all.xlsx', buffer);
    console.log('done');
});


// request_yelp({ type: 'search', auth: food.auth, term: 'Columbus Gold Gentlemen\'s Club', location: 'Columbus' }, {}, function (error, response, body) {
//         if (error && (error.code === 'ETIMEDOUT' || error.connect === true)) {
//             fs.appendFileSync('TimeoutError.txt', 'Timeout ' + name + '\r\n\r\n');
//             callback();
//             return;
//         }
//         fs.writeFileSync('item.json', body);
// });


/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ExcelWriter = require('../../private/ExcelWriter.js');


var __getSessions = function (resp) {
    var cookies = [];
    var fullArr = resp.headers['set-cookie'];
    for (var i in fullArr) {
        cookies.push(fullArr[i].split(';')[0]);
    }

    return cookies.join("; ");
}

/**
 * fetching cookie
 */
var ew = new ExcelWriter('result.xlsx', ['Name', 'Email Address', 'HomePage(website)', 'Instagram account', 'Number of followers'], '40wto50w');

var cookies;
var urls = [];

for (var i = 400000; i < 500000; i++) {
	(function (i) {
		var k = i;
		urls.push('https://ecommerce.shopify.com/users/' + i);
	})(i);
}

request({ url: 'https://ecommerce.shopify.com/login', method: 'GET' }, function (err, resp, body) {
    var loginCookie = 	__getSessions(resp);
    console.log(resp.statusCode);
	var $ = cheerio.load(body);
	var auth_token = $('meta[name="csrf-token"]').attr('content');
	console.log(auth_token);
    var loginForm = {
        'utf8': '✓',
        'authenticity_token': auth_token,
        'return_to': '/',
        'user[email]': 'lc515515@163.com',
        'user[password]': '123456',
        'remember': 'on',
        'submit': 'Login'
    }

    var postData = {
        "params": [
            { "name": "utf8", "value": "✓" },
            { "name": "return_to", "value": "/" },
            { "name": "user[email]", "value": "lc515515@163.com" },
            { "name": "user[password]", "value": "123456" },
            { "name": "remember", "value": "on" },
            { "name": "submit", "value": "Login" }
        ]
    }

    var loginHeader = sTool.regularHeader('ecommerce.shopify.com', loginCookie);

    var loginHar = {
		"headers": loginHeader,
		"method": "POST",
		"httpVersion": "HTTP/1.1",
		"url": 'https://ecommerce.shopify.com/login'

    }

    // request = request.defaults({'proxy' : 'http://127.0.0.1:8888'});
    request({ har: loginHar, form: loginForm }, function (err, resp, body) {
        if (err) console.log(err);
        cookies = __getSessions(resp);
		async.mapLimit(urls, 1, function (url, callback) {
			singleFetching(url, callback);
		}, function (err) {
			if (err) console.log(err);
		})
    });
});

function singleFetching(url, callback) {
	var fetchHeader = sTool.regularHeader('ecommerce.shopify.com', cookies);

	var fetchHar = {
		'url': url,
		'method': 'GET',
		'httpVersion': 'HTTP/1.1',
		'headers': fetchHeader
	}

	request({ har: fetchHar, gzip: true }, function (err, resp, body) {
		if (err) {
			console.log(url + ' meets error ');
			console.log(err);
			fs.appendFileSync('err.txt', body);
			callback();
		}
		if (!body) {
			console.log('Nothing fetched on ' + url);
			callback();
		}
		var $ = cheerio.load(body);
		// fs.appendFileSync('body.txt', body);
		var email = $('.user-stats dd').eq(0).text();
		var name = $('.user-stats dd').eq(1).text();
		var homePage = $('.user-stats dd').eq(2).text();
		var row = [];
		row.push(name);
		row.push(email);
		row.push(homePage);
		console.log(row);
		request({ url: homePage, method: 'GET' }, function (err, resp, body) {
			if (body && body.match(/instagram/i)) {
				row.push('true');
			};
			ew.appendRow(row);
			ew.build();
			setTimeout(function () {
				console.log(url + ' fetched');
				callback();
			}, 4);

		})
	});
}


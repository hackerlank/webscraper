/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');

var __getSessions = function (resp) {
    var cookies = [];
    var fullArr = resp.headers['set-cookie'];
    for (var i in fullArr) {
        cookies.push(fullArr[i].split(';')[0]);
    }

    return cookies.join("; ");
}




request({ url: 'https://ecommerce.shopify.com/login', method: 'GET' }, function (err, resp, body) {
    var loginCookie = __getSessions(resp);
    console.log(resp.statusCode);
    var loginForm = {
        'utf8': '✓',
        // 'authenticity_token': 'U3yEPWqIp7CfhRDTJWu8haBDusylU9SHJfuvosoip95GFF9yMn9+N2NRnVJOznhnpYOPvy5ydCNZEmqMIjnJqg==',
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
        'url': 'https://ecommerce.shopify.com/login',
        'method': 'POST',
        'httpVersion': 'HTTP/1.1',
        'headers': loginHeader
    }

    // request = request.defaults({'proxy' : 'http://127.0.0.1:8888'});
    request({ url: 'https://ecommerce.shopify.com/login', method: 'POST', har: loginHar, form: loginForm }, function (err, resp, body) {
        if (err) console.log(err);
        var cookies = __getSessions(resp);
        console.log(cookies);
        console.log(resp.statusCode);

        // var fetchHeader = sTool.regularHeader('ecommerce.shopify.com', cookies);
        var fetchHeader = sTool.regularHeader('ecommerce.shopify.com', loginCookie);

        var fetchHar = {
            'url': 'https://ecommerce.shopify.com/users/446786',
            'method': 'GET',
            'httpVersion': 'HTTP/1.1',
            'headers': fetchHeader
        }

        request({ har: fetchHar, gzip: true }, function (err, resp, body) {
            fs.appendFileSync('member.html', body);
        });
    });
});
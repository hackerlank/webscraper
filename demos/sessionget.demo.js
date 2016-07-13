/// <reference path="../include.d.ts" />
var request = require('request');
var fs = require('fs');

var __getSessions = function (resp) {
    var cookies = [];
    var fullArr = resp.headers['set-cookie'];
    for (var i in fullArr) {
        cookies.push(fullArr[i].split(';')[0]);
    }

    return cookies.join("; ");
}

request({ url: 'http://www.milanoo.com/member/login.html', method: 'POST', form: { 'loginusername': 'lvchao@milanoo.com', 'loginuserpass': 'lc799110' } }, function (err, resp, body) {
    if (err) console.log(err);

    var ck = __getSessions(resp);

    var memberHar = {
        headers: [
            // {
            //     "name": "Accept",
            //     "value": "Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
            // },
            // {
            //     "name": "Host",
            //     "value": "www.milanoo.com"
            // },
            // {
            //     "name": "User-Agent",
            //     "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
            // },
            {
                "name": "Cookie",
                "value": ck
            }
        ]
        // "url": "http://www.milanoo.com/member/index.html",
        // "method": "GET",
        // "httpVersion": "HTTP/1.1"
    }
    request({ url: 'http://www.milanoo.com/member/index.html', method: 'GET', har : memberHar}, function (err, resp, body) {
        fs.appendFileSync('member.html', body);
    });
});

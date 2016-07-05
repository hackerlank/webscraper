/// <reference path="../../include.d.ts" />

var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var sTool = require('../../toolkits/stringtool');

var emailAddr = sTool.randomStr(8) + '@js.com';
var events = require('events');
var emitter = new events.EventEmitter();


var verifyCodeUrl = 'http://www.mysheriff.net/verificationimage.php';
var formData = {
    'gender': 'Male',
    'firstname': 'jet',
    'lastname': 'baba',
    // 'email_address': 'jetbaba@gmaill.cc',
    'password': '123456',
    'cmbmonth': 2,
    'cmbday': 1,
    'cmbyear': 1980,
    'City': 'Naalehu,Hawaii',
    'State': 'HI',
    'County': 'Hawaii',
    'OnlyCity': 'Naalehu',
    // 'verif_box': '9341',
    'interested_in': 2,
    'signUp': 'Sign Up'
};
var k = i;
var j = request.jar();
var cookie = request.cookie('__atuvc=4%7C26; SR=ktqmofhqtvd9fmlah0se78fm87; __utmt=1; __utma=110611609.1074444867.1467206122.1467444726.1467725373.6; __utmb=110611609.1.10.1467725373; __utmc=110611609; __utmz=110611609.1467206122.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)');
var url = 'http://www.mysheriff.net/users/signup/';
j.setCookie(cookie, url);
var headers = {
    // "eferredBy": "UNKNOWN HTTP/1.1",
    // "Host": "www.yellowpages.com.au",
    // // "Connection": "keep-alive",
    // // "Cache-Control" : "max-age=0",
    // // "Upgrade-Insecure - Requests": 1,
    // "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
    // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    // // "Referer:": "http://www.yellowpages.com.au/search/listings?clue=HariDressing&eventType=pagination&locationClue=Australia&pageNumber=23&referredBy=UNKNOWN",
    // // "Accept-Encoding": "gzip, deflate, sdch",
    // "Accept-Language": "zh-CN,zh;q=0.8"
}

function sleep(sleepTime) {
    for (var start = +new Date; +new Date - start <= sleepTime;) { }
}

// var post = function post() {
//     // while(!fs.exists('captchas/' + emailAddr + '.png')) {
//         sleep(5000);
//     // }
//     console.log('function triggered');
//     var options = { l: 'eng', psm: 6 };
//     tesseract.process('captchas/' + emailAddr + '.png', options, function (err, text) {
//         fs.exists('captchas/' + emailAddr + '.png',function(exists) {
//             console.log('file exists ?' + exists);
//         })
//         console.log(text);
//         formData.email_address = emailAddr;
//         formData.verif_box = text;
//         request({ url: url, jar: j, headers: headers, form: formData }, function (error, response, body) {
//             console.log(formData);
//             if (error) {
//                 console.log(error);
//             }
//             fs.appendFileSync('result.html', body);
//             fs.appendFileSync('emails.txt', emailAddr + '\r\n');
//         });

//     });
// }



// console.log('captchas/' + emailAddr + '.png');
// request.get(verifyCodeUrl, { jar: j }).pipe(fs.createWriteStream('captchas/' + emailAddr + '.png')).on('post', post).emit('post');
// request({ url: verifyCodeUrl, jar: j }, function (verror, vresponse, vbody) {
//     vresponse.pipe(fs.createWriteStream('captchas/' + emailAddr + '.png')).emit('post');
// });

// emitter.on('post', function() {

// });
// console.log('captchas/' + emailAddr + '.png');


// request.get(verifyCodeUrl, { jar: j }, function(error, response, body) {
//         fs.createWriteStream('captchas/' + emailAddr + '.png').write(body).end();
// });
// request.get(verifyCodeUrl, { jar: j }).pipe(fs.createWriteStream('captchas/' + emailAddr + '.png'));
// sleep(2000);


var tesseract = require('node-tesseract');


var options = { l: 'eng', psm: 3 };
    tesseract.process('captchas/' + 'cBZzXeKc@js.com' + '.png', options, function (err, text) {
        console.log(text);
        formData.email_address = 'cBZzXeKc@js.com';
        formData.verif_box = text.trim();
        request({ url: url, jar: j, headers: headers, form: formData }, function (error, response, body) {
            console.log(formData);
            if (error) {
                console.log(error);
            }
            fs.appendFileSync('result.html', body);
            fs.appendFileSync('emails.txt', 'sMRwpibY@js.com' + '\r\n');
        });

    });

// tesseract.process('captchas/' + emailAddr + '.png', {}, function (err, text) {
//     console.log(text);
// });

// tesseract.process(__dirname + '/captchas/' + 'AxPAFWWP@js.com' + '.png', {}, function (err, text) {
//     console.log(__dirname + '/captchas/' + 'AxPAFWWP@js.com' + '.png');
//     console.log(text);
// });
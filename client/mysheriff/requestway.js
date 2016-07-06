/// <reference path="../../include.d.ts" />

var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var sTool = require('../../toolkits/stringtool');
var tesseract = require('node-tesseract');


var rstring = sTool.randomStr(8);
var emailAddr = rstring + '@js.com';
var cookie = request.cookie('SR=m04d6k1p6f3srvp4v03tlspu76; tntcon=c0172ea66506f59c8c435eb66176fb67a4xn; __utmt=1; __atuvc=3%7C27; __atuvs=577cc00de7ad068e001; __utma=110611609.1743308010.1467679327.1467771907.1467793336.4; __utmb=110611609.24.10.1467793336; __utmc=110611609; __utmz=110611609.1467679327.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)');
var signUpJar = request.jar();
signUpJar.setCookie(cookie, url);
var imageJar = request.jar();
imageJar.setCookie(cookie, verifyCodeUrl);
var url = 'http://www.mysheriff.net/users/signup/';
var verifyCodeUrl = 'http://www.mysheriff.net/verificationimage.php?';
var ocr = require('colissimo-ocr');


var formData = {
    'gender': 'Male',
    'firstname': 'jet',
    'lastname': 'baba',
    'email_address': emailAddr,
    'password': '123456',
    'cmbmonth': 2,
    'cmbday': 1,
    'cmbyear': 1980,
    'City': 'Naalehu,Hawaii',
    'State': 'HI',
    'County': 'Hawaii',
    'OnlyCity': 'Naalehu',
    // 'verif_box': '9341',
    'redirectURL':'',
    'interested_in': 2,
    'signUp': 'Sign Up'
};
var imageHeaders = {
    "Accept": "image/webp,image/*,*/*;q=0.8",
    "Host": "www.mysheriff.net",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
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

var headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Content-Length': '248',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'SR=m04d6k1p6f3srvp4v03tlspu76; __utmt=1; tntcon=6e62a992c676f611616097dbea8ea030a4xn; __atuvc=2%7C27; __atuvs=577cc00de7ad068e000; __utma=110611609.1743308010.1467679327.1467771907.1467793336.4; __utmb=110611609.6.10.1467793336; __utmc=110611609; __utmz=110611609.1467679327.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)',
    'Host': 'www.mysheriff.net',
    'Origin': 'http://www.mysheriff.net',
    'Referer': 'http://www.mysheriff.net/users/',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
}

function sleep(sleepTime) {
    for (var start = +new Date; +new Date - start <= sleepTime;) { }
}

var options = {
    l: 'eng',
    psm: 6,
    binary: 'E:\\tesseract\\Tesseract-OCR\\tesseract.exe'
};

// request.get({ url: verifyCodeUrl, jar: imageJar, headers: imageHeaders, encoding: 'binary' }, function (err, response, body) {
    // fs.writeFile('captchas/' + rstring + '.png', body, 'binary', function (err) {
    //     if (err) {
    //         console.log(err);
        // }
        // else {
        //     tesseract.process('captchas/' + rstring + '.png', options, function (err, text) {
        //         if (err) {
        //             console.log(err);
        //         }
                // console.log(rstring + ':' + text);
                formData.email_address = emailAddr;
                // formData.verif_box = text.trim();
                formData.verif_box = '8057';
                request({ url: url, jar: signUpJar, headers: headers, form: formData }, function (error, response, body) {
                    console.log(formData);
                    if (error) {
                        console.log(error);
                    }
                    fs.appendFileSync('result.html', body);
                    fs.appendFileSync('emails.txt', emailAddr + '\r\n');
                });

            // });
        // }
    // });
// });
// var rstring = 'x7XpRnnr';


// tesseract.process(__dirname + '/captchas/' + rstring + '.png', options, function (err, text) {
//     if(err) {
//         console.error(err);
//     }
//     console.log(rstring + ':' + text);
//     formData.email_address = rstring;
//     formData.verif_box = text.trim();
//     request({ url: url, jar: signUpJar, headers: {}, form: formData }, function (error, response, body) {
//         console.log(formData);
//         if (error) {
//             console.log(error);
//         }
//         fs.appendFileSync('result.html', body);
//         fs.appendFileSync('emails.txt', rstring + '\r\n');
//     });
// });


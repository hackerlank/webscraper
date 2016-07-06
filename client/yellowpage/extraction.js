/// <reference path="../../include.d.ts" />

var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var Excel = require('../private/ExcelWriter.js');

var excel = new Excel('yellowpage_Beauty.xlsx', ["Bussiness Name", "Bussiness Type", "Contact Number", "Postal Address", "Email"], "result");
var count = 0;


for (var i = 0; i < 100; i++) {
  (function () {
    var k = i;
    var j = request.jar();
    var cookie = request.cookie('JSESSIONID=3F199C91634205F3EC2D5FD52F189DC2; yellow-guid=a8838eac-3619-4937-9d24-7716aeaf18f7; clue=HariDressing; locationClue=Australia; _qst_s=1; _qsst_s=1467702356272; s_fid=51B40F10DB1BBB36-2CA20E85022AF3FA; s_sq=%5B%5BB%5D%5D; s_cc=true');
    var url = 'http://www.yellowpages.com.au/search/listings?clue=Beauty&locationClue=Australia&pageNumber=' + k + '&referredBy=UNKNOWN&eventType=pagination';
    j.setCookie(cookie, url);
    var headers = {
      // "eferredBy": "UNKNOWN HTTP/1.1",
      "Host": "www.yellowpages.com.au",
      // "Connection": "keep-alive",
      // "Cache-Control" : "max-age=0",
      // "Upgrade-Insecure - Requests": 1,
      "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      // "Referer:": "http://www.yellowpages.com.au/search/listings?clue=HariDressing&eventType=pagination&locationClue=Australia&pageNumber=23&referredBy=UNKNOWN",
      // "Accept-Encoding": "gzip, deflate, sdch",
      "Accept-Language": "zh-CN,zh;q=0.8"
    }
    request({ url: url, jar: j, headers: headers }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('fetched ' + url);
        var $ = cheerio.load(body);
        if (k === 2) console.log(body);
        var names = $('.listing-name').map(function (index, element) {
          return $(this).text();
        }).get();

        var types = $('.listing-short-description').map(function (index, element) {
          return $(this).text();
        }).get();

        var numbers = $('a[title="Phone"] .contact-text').map(function (index, element) {
          return $(this).text();
        }).get();

        var address = $('.listing-address.mappable-address').map(function (index, element) {
          return $(this).text();
        }).get();

        var email = $('.contact.contact-main.contact-email').map(function (index, element) {
          return $(this).attr('data-email');
        }).get();

        for (var r = 0; r < names.length; r++) {
          count++;
          (function () {
            var ri = r;
            excel.appendRow([names[ri], types[ri], numbers[ri], address[ri], email[ri]]);
            fs.appendFileSync('rows_beauty.txt', [names[ri], types[ri], numbers[ri], address[ri], email[ri]] + '\r\n');
            if (ri == names.length - 1) {
                console.log('count is ' + count);
                excel.build();
            }
          })();
        }

        console.log('count is ' + count);
        // names.forEach(function (name, nameindex, namarr) {
        //   types.forEach(function (type, typeindex, typearr) {
        //     numbers.forEach(function (numbers, numbersindex, numbersarr) {
        //       address.forEach(function (address, addressindex, addressarr) {
        //         email.forEach(function (email, emailindex, emailarr) {
        //           excel.appendRow([name, type, numbers, address, email]);
        //           fs.appendFileSync('rows.txt', [name, type, numbers, address, email]);
        //         });
        //       });
        //     });
        //   });

      }
    });
  })();
}




// request('http://www.mlo.me/upload/mitu/2016/201606/20160614/20160614064202.gif').pipe(fs.createWriteStream('test.gif'));
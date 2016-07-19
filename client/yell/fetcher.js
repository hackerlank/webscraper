/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ExcelWriter = require('../../private/ExcelWriter.js');

var columns = ['Name', 'Address', 'Phone'];
var ew = new ExcelWriter('result.xlsx', columns, 'r');
var counter = 0;

urls = [];
for(var i =1; i <=10; i++) {
    (function(i) {
        urls.push('https://www.yell.com/ucs/UcsSearchAction.do?keywords=Advertising+agencies&location=United+Kingdom&scrambleSeed=86323412&pageNum=' + i);
    })(i);
}

console.log(urls);

async.mapLimit(urls, 1, function(url, callback) {
    singleFetch(url, callback);
}, function(err) {if(err) console.log(err); })


var har = {

				"headersSize": 2348,
				"postData": {
        "text": "",
        "mimeType": ""
				},
				"queryString": [{
        "name": "keywords",
        "value": "Advertising agencies"
				},
        {
            "name": "location",
            "value": "United Kingdom"
        },
        {
            "name": "scrambleSeed",
            "value": "86323412"
        },
        {
            "name": "pageNum",
            "value": "10"
        }],
				"headers": [{
        "name": "Host",
        "value": "www.yell.com"
				},
        {
            "name": "Connection",
            "value": "keep-alive"
        },
        {
            "name": "Cache-Control",
            "value": "max-age=0"
        },
        {
            "name": "Upgrade-Insecure-Requests",
            "value": "1"
        },
        {
            "name": "User-Agent",
            "value": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36"
        },
        {
            "name": "Accept",
            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        },
        {
            "name": "Referer",
            "value": "https://www.yell.com/ucs/UcsSearchAction.do?keywords=Advertising+agencies&location=United+Kingdom&scrambleSeed=86323412&pageNum=2"
        },
        {
            "name": "Accept-Encoding",
            "value": "gzip, deflate, sdch, br"
        },
        {
            "name": "Accept-Language",
            "value": "zh-CN,zh;q=0.8"
        },
        {
            "name": "Cookie",
            "value": "UNIQUE_VISITOR=100200146893839938500192168417701513; JSESSIONID=01F9819C7E02CE2C039AB2E6F30742A3; FUID=0865392691; D_SID=45.32.9.243:6Ywwzw6Qo0pWmzyvo+LVDgOkE6ai7TyiSp2Qu5ZVKu8; s_sq=%5B%5BB%5D%5D; superCookie=cachedVersion%3Dtemplates-2.8.9%26cachedChannel%3Dyelldotcom%26cachedFiles%3Dstyles%252Fcore.css%257Cmodules%252FPage%252Fhome%252Fstyles%252Fmain.css%257Ccore.js%257Cmodules%252FPage%252Fserp%252Fstyles%252Fmain.css%257Cmodules%252FPage%252Fbip%252Fstyles%252Fmain.css%26CookiePolicy%3D1; useMultimap=OFF; SearchHistory0=14689383993821266; ScraperTracking=5mONJvBoUOv5gqkCfcj3; SearchedSession=true; AUTOKW2=0advertising+agencies; AUTOLOC=united+kingdom; testForTracking=test; s_fid=1FAC01B291DD3DAC-2B75D1EDC23B4AF8; s_cc=true; _ga=GA1.2.614813669.1468937789; _gat=1; SEARCH_LOC=United%20Kingdom-%3A-United%20Kingdom-%3A-%0A52.50381885-%3A--3.02374035%0A-%3A-%0ACountry%0A-%3A-UNITED%20KINGDOM; SEARCH_KEYWORDS=Advertising%20agencies; s_vi=[CS]v1|2BC71B7885015B05-6000014860001C26[CE]; D_PID=8FAAEB31-5110-3491-80DF-81C3207C174B; D_IID=6BA6FC1F-E516-32BD-85BD-820D1A281391; D_UID=62B1A311-303D-32D4-ACF7-50D813084E4A; D_HID=Hi0OeELvf/68BdyF5n+0BxRZaVr4fBY1bwUTjXcr9Mo; NSC_mcw_xxx-c.zfmmhspvq.dpn_80=ffffffffc3a0420845525d5f4f58455e445a4a421517; RT=\"sl=6&ss=1468937782542&tt=24927&obo=1&bcn=%2F%2F36f11e95.mpstat.us%2F&sh=1468938732901%3D6%3A1%3A24927%2C1468938220180%3D5%3A1%3A19938%2C1468937843799%3D4%3A1%3A17242%2C1468937827948%3D3%3A1%3A8701%2C1468937817304%3D2%3A1%3A4285&dm=yell.com&si=86c14c01-46bf-4c73-a805-ca0a161b5d93&ld=1468938732902&r=https%3A%2F%2Fwww.yell.com%2Fucs%2FUcsSearchAction.do%3Fa3943929c39558a0d7753b17d273b804&ul=1468938818983\""
        }],
				"bodySize": 0,
				"url": "https://www.yell.com/ucs/UcsSearchAction.do?keywords=Advertising+agencies&location=United+Kingdom&scrambleSeed=86323412&pageNum=10",
				"cookies": [{
        "name": "UNIQUE_VISITOR",
        "value": "100200146893839938500192168417701513"
				},
        {
            "name": "JSESSIONID",
            "value": "01F9819C7E02CE2C039AB2E6F30742A3"
        },
        {
            "name": "FUID",
            "value": "0865392691"
        },
        {
            "name": "D_SID",
            "value": "45.32.9.243:6Ywwzw6Qo0pWmzyvo+LVDgOkE6ai7TyiSp2Qu5ZVKu8"
        },
        {
            "name": "s_sq",
            "value": "%5B%5BB%5D%5D"
        },
        {
            "name": "superCookie",
            "value": "cachedVersion%3Dtemplates-2.8.9%26cachedChannel%3Dyelldotcom%26cachedFiles%3Dstyles%252Fcore.css%257Cmodules%252FPage%252Fhome%252Fstyles%252Fmain.css%257Ccore.js%257Cmodules%252FPage%252Fserp%252Fstyles%252Fmain.css%257Cmodules%252FPage%252Fbip%252Fstyles%252Fmain.css%26CookiePolicy%3D1"
        },
        {
            "name": "useMultimap",
            "value": "OFF"
        },
        {
            "name": "SearchHistory0",
            "value": "14689383993821266"
        },
        {
            "name": "ScraperTracking",
            "value": "5mONJvBoUOv5gqkCfcj3"
        },
        {
            "name": "SearchedSession",
            "value": "true"
        },
        {
            "name": "AUTOKW2",
            "value": "0advertising+agencies"
        },
        {
            "name": "AUTOLOC",
            "value": "united+kingdom"
        },
        {
            "name": "testForTracking",
            "value": "test"
        },
        {
            "name": "s_fid",
            "value": "1FAC01B291DD3DAC-2B75D1EDC23B4AF8"
        },
        {
            "name": "s_cc",
            "value": "true"
        },
        {
            "name": "_ga",
            "value": "GA1.2.614813669.1468937789"
        },
        {
            "name": "_gat",
            "value": "1"
        },
        {
            "name": "SEARCH_LOC",
            "value": "United%20Kingdom-%3A-United%20Kingdom-%3A-%0A52.50381885-%3A--3.02374035%0A-%3A-%0ACountry%0A-%3A-UNITED%20KINGDOM"
        },
        {
            "name": "SEARCH_KEYWORDS",
            "value": "Advertising%20agencies"
        },
        {
            "name": "s_vi",
            "value": "[CS]v1|2BC71B7885015B05-6000014860001C26[CE]"
        },
        {
            "name": "D_PID",
            "value": "8FAAEB31-5110-3491-80DF-81C3207C174B"
        },
        {
            "name": "D_IID",
            "value": "6BA6FC1F-E516-32BD-85BD-820D1A281391"
        },
        {
            "name": "D_UID",
            "value": "62B1A311-303D-32D4-ACF7-50D813084E4A"
        },
        {
            "name": "D_HID",
            "value": "Hi0OeELvf/68BdyF5n+0BxRZaVr4fBY1bwUTjXcr9Mo"
        },
        {
            "name": "NSC_mcw_xxx-c.zfmmhspvq.dpn_80",
            "value": "ffffffffc3a0420845525d5f4f58455e445a4a421517"
        },
        {
            "name": "RT",
            "value": "\"sl=6&ss=1468937782542&tt=24927&obo=1&bcn=%2F%2F36f11e95.mpstat.us%2F&sh=1468938732901%3D6%3A1%3A24927%2C1468938220180%3D5%3A1%3A19938%2C1468937843799%3D4%3A1%3A17242%2C1468937827948%3D3%3A1%3A8701%2C1468937817304%3D2%3A1%3A4285&dm=yell.com&si=86c14c01-46bf-4c73-a805-ca0a161b5d93&ld=1468938732902&r=https%3A%2F%2Fwww.yell.com%2Fucs%2FUcsSearchAction.do%3Fa3943929c39558a0d7753b17d273b804&ul=1468938818983\""
        }],
				"method": "GET",
				"httpVersion": "HTTP/1.1"

};
// div[itemtype="http://schema.org/LocalBusiness"]
function singleFetch(url, callback) {
    request({ gzip: true, url: url, method: 'GET', har : har }, function (err, resp, body) {
        if (err) console.log(err);
        // fs.appendFileSync('body.html', body);
        var $ = cheerio.load(body);
        $('.serp--capsuleList').children('div').each(function (index, item) {
            var name = $(this).find('a[itemprop="name"]').find('h2').text();
            var address = $(this).find('span[itemprop="streetAddress"]').text();
            var phone = $(this).find('strong[itemprop="telephone"]').text();
            var row = [];
            row.push(name);
            row.push(address);
            row.push(phone);
            console.log(row);
            console.log(++counter);
            ew.appendRow(row);
        });
        setTimeout(function() {
            ew.build();
            console.log(url + ' was done');
            callback();
        }, 4000);
    });
}

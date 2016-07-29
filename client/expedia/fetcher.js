/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ExcelWriter = require('../../private/ExcelWriter.js');

var ew = new ExcelWriter('result.xlsx', [], 'Macau')
var baseUrl = 'https://www.expedia.com/Hotel-Search#destination=Macau+(all)&adults=2&regionId=8724&page=';

var __getSessions = function (resp) {
    var cookies = [];
    var fullArr = resp.headers['set-cookie'];
    for (var i in fullArr) {
        cookies.push(fullArr[i].split(';')[0]);
    }

    return cookies.join("; ");
}

var urls = [];
for (var i = 1; i < 3; i++) {
    (function (i) {
        var k = i;
        urls.push(baseUrl + k);
    })(i);
}


var url = 'https://www.expedia.com/Hotel-Search-Data?responsive=true';
var headers = [
    {
        "name": "Accept",
        "value": "application/json, text/javascript"
    },
    {
        "name": "User-Agent",
        "value": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36"
    }
]

// var request = request.defaults({ proxy: 'http://127.0.0.1:8888' });
request({ url: 'https://www.expedia.com', method: 'GET', gzip: true }, function (err, resp, body) {
    var cookies = __getSessions(resp);
    headers.push({
        "name": "Cookie",
        "value": cookies
    });

    var form = {
        "destination": "Macau (all)",
        "adults": "2",
        "regionId": "8724",
        "hashParam": "64caefbc671ea4875ab73d53e7f40383a1ae0e2d"
    }
    var har = {
        "headersSize": 3109,
        "postData": {
            "params": [{
                "name": "destination",
                "value": "Macau (all)"
            },
                {
                    "name": "adults",
                    "value": "2"
                },
                {
                    "name": "regionId",
                    "value": "8724"
                },
                {
                    "name": "hashParam",
                    "value": "64caefbc671ea4875ab73d53e7f40383a1ae0e2d"
                }],
            "mimeType": "application/x-www-form-urlencoded"
        },
        "queryString": [{
            "name": "responsive",
            "value": "true"
        }],
        "headers": [{
            "name": "Host",
            "value": "www.expedia.com"
        },
            {
                "name": "Connection",
                "value": "keep-alive"
            },
            {
                "name": "Content-Length",
                "value": "97"
            },
            {
                "name": "Cache-Control",
                "value": "max-age=0"
            },
            {
                "name": "Accept",
                "value": "application/json, text/javascript"
            },
            {
                "name": "Origin",
                "value": "https://www.expedia.com"
            },
            {
                "name": "X-Requested-With",
                "value": "XMLHttpRequest"
            },
            {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36"
            },
            {
                "name": "Content-type",
                "value": "application/x-www-form-urlencoded"
            },
            {
                "name": "Referer",
                "value": "https://www.expedia.com/Hotel-Search"
            },
            {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br"
            },
            {
                "name": "Accept-Language",
                "value": "zh-CN,zh;q=0.8"
            },
            {
                "name": "Cookie",
                "value": "abucket=CgMj71eaEZ8fF0mSCzihAg==; MC1=GUID=a1c939b2abd743a496d5a509b4ba8d6a; tpid=v.1,1; iEAPID=0; aspp=v.1,0|||||||||||||; JSESSION=ed8e2c32-f6d2-431c-b6ad-ae87b2f62970; AMCVS_C00802BE5330A8350A490D4C%40AdobeOrg=1; jrBanner=closed, expires=Thu, 28 Jul 2016 14:03:47 GMT, path=/; qualtrics_sample=[object Object]; AB_Test_TripAdvisor=A; AMCV_C00802BE5330A8350A490D4C%40AdobeOrg=-1248264605%7CMCIDTS%7C17011%7CMCMID%7C90850544911327676351687532643510613666%7CMCAAMLH-1470319487%7C9%7CMCAAMB-1470319487%7CNRX38WO0n5BH8Th-nqAG_A%7CMCOPTOUT-1469721889s%7CNONE%7CMCAID%7CNONE; __qca=P0-412518351-1469714694170; _cc=AXLalpL84C53MONk8hHlj%2FbV; IAID=a8cf1b59-f856-42ae-bb26-ea6e4fd7e9a9; __gads=ID=4abc024f6b74457e:T=1469714909:S=ALNI_MZJXh8ZJLq3wN1lmk8c7dfzuMZP5A; SSID1=CABprh0YAQAAAABDEppXAekEB0MSmlcBAAAAAAAAAAAAQxKaVwAKijYFAAHYhwAAQxKaVwEAEwUAASaBAABDEppXAQA3BQAB2YcAAEMSmlcBAMQEAAGkeAAAQxKaVwEAJgUAASGFAABDEppXAQDTBAABF3oAAEMSmlcBACoFAAG8hQAAQxKaVwEAFwUAAWKBAABDEppXAQAlBQAB5IQAAEMSmlcBACAFAAHdgwAAQxKaVwEAIgUAAdmEAABDEppXAQAjBQAB3oQAAEMSmlcBADUFAAGHhwAAQxKaVwEAEgUAASSBAABDEppXAQAwBQABe4YAAEMSmlcBACwFAAHXhQAAQxKaVwEAGQUAAd-BAABDEppXAQAuBQABGoYAAEMSmlcBACcFAAE3hQAAQxKaVwEAJAUAAeGEAABDEppXAQA; SSSC1=1.G6312377906803042561.1|1220.30884:1235.31255:1298.33060:1299.33062:1303.33122:1305.33247:1312.33757:1314.34009:1315.34014:1316.34017:1317.34020:1318.34081:1319.34103:1322.34236:1324.34263:1326.34330:1328.34427:1333.34695:1334.34776:1335.34777; im_puid=109ae7d2-99bb-4798-af9b-6170726c0829; IM_eu_freq_cap=Y; MediaCookie=0%7C2796%2C2766%2CBKC%2C46204%7C2796%2C2766%2CBKC%2C45648%7C2796%2C2766%2CBKC%2C31127%7C2796%2C2766%2CBKC%2C103193; JSESSIONID=3146DB2210E52E6D36A03CD859EEC85F; __utma=16308457.1116498381.1469714691.1469714710.1469714710.1; __utmc=16308457; __utmz=16308457.1469714710.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); s_sq=%5B%5BB%5D%5D; lsrc=v.1,08/11/2016; cesc=%7B%7D; s_ppn=page.Hotel-Search; s_cc=true; utagdb=true; utag_main=v_id:015631d267af0017eadb02a19b9d0506d00180650086e$_sn:1$_ss:0$_pn:7%3Bexp-session$_st:1469717974787$ses_id:1469714687919%3Bexp-session$dc_visit:1$dc_event:1%3Bexp-session$dc_region:us-west-1%3Bexp-session; _ga=GA1.2.1116498381.1469714691; _tq_id.TV-721872-1.7ec4=bd5c35d25e01bf42.1469714696.0.1469716175..; HMS=2EEABBC6-081B-47C0-B7AA-7F43B0DB93DA; HSEWC=0; SSLB=1; SSRT1=vByaVwIDAQ; linfo=v.4,|0|0|255|1|0||||||||1033|0|0||0|0|0|-1|-1; s_ppvl=page.Hotel-Search%2C8%2C8%2C763%2C1366%2C235%2C1366%2C768%2C1%2CP; s_ppv=Homepage%2C76%2C76%2C1764%2C1147%2C464%2C1366%2C768%2C1%2CP"
            }],
        "bodySize": 97,
        "url": "https://www.expedia.com/Hotel-Search-Data?responsive=true",
        "cookies": [{
            "name": "abucket",
            "value": "CgMj71eaEZ8fF0mSCzihAg=="
        },
            {
                "name": "MC1",
                "value": "GUID=a1c939b2abd743a496d5a509b4ba8d6a"
            },
            {
                "name": "tpid",
                "value": "v.1,1"
            },
            {
                "name": "iEAPID",
                "value": "0"
            },
            {
                "name": "aspp",
                "value": "v.1,0|||||||||||||"
            },
            {
                "name": "JSESSION",
                "value": "ed8e2c32-f6d2-431c-b6ad-ae87b2f62970"
            },
            {
                "name": "AMCVS_C00802BE5330A8350A490D4C%40AdobeOrg",
                "value": "1"
            },
            {
                "name": "jrBanner",
                "value": "closed, expires=Thu, 28 Jul 2016 14:03:47 GMT, path=/"
            },
            {
                "name": "qualtrics_sample",
                "value": "[object Object]"
            },
            {
                "name": "AB_Test_TripAdvisor",
                "value": "A"
            },
            {
                "name": "AMCV_C00802BE5330A8350A490D4C%40AdobeOrg",
                "value": "-1248264605%7CMCIDTS%7C17011%7CMCMID%7C90850544911327676351687532643510613666%7CMCAAMLH-1470319487%7C9%7CMCAAMB-1470319487%7CNRX38WO0n5BH8Th-nqAG_A%7CMCOPTOUT-1469721889s%7CNONE%7CMCAID%7CNONE"
            },
            {
                "name": "__qca",
                "value": "P0-412518351-1469714694170"
            },
            {
                "name": "_cc",
                "value": "AXLalpL84C53MONk8hHlj%2FbV"
            },
            {
                "name": "IAID",
                "value": "a8cf1b59-f856-42ae-bb26-ea6e4fd7e9a9"
            },
            {
                "name": "__gads",
                "value": "ID=4abc024f6b74457e:T=1469714909:S=ALNI_MZJXh8ZJLq3wN1lmk8c7dfzuMZP5A"
            },
            {
                "name": "SSID1",
                "value": "CABprh0YAQAAAABDEppXAekEB0MSmlcBAAAAAAAAAAAAQxKaVwAKijYFAAHYhwAAQxKaVwEAEwUAASaBAABDEppXAQA3BQAB2YcAAEMSmlcBAMQEAAGkeAAAQxKaVwEAJgUAASGFAABDEppXAQDTBAABF3oAAEMSmlcBACoFAAG8hQAAQxKaVwEAFwUAAWKBAABDEppXAQAlBQAB5IQAAEMSmlcBACAFAAHdgwAAQxKaVwEAIgUAAdmEAABDEppXAQAjBQAB3oQAAEMSmlcBADUFAAGHhwAAQxKaVwEAEgUAASSBAABDEppXAQAwBQABe4YAAEMSmlcBACwFAAHXhQAAQxKaVwEAGQUAAd-BAABDEppXAQAuBQABGoYAAEMSmlcBACcFAAE3hQAAQxKaVwEAJAUAAeGEAABDEppXAQA"
            },
            {
                "name": "SSSC1",
                "value": "1.G6312377906803042561.1|1220.30884:1235.31255:1298.33060:1299.33062:1303.33122:1305.33247:1312.33757:1314.34009:1315.34014:1316.34017:1317.34020:1318.34081:1319.34103:1322.34236:1324.34263:1326.34330:1328.34427:1333.34695:1334.34776:1335.34777"
            },
            {
                "name": "im_puid",
                "value": "109ae7d2-99bb-4798-af9b-6170726c0829"
            },
            {
                "name": "IM_eu_freq_cap",
                "value": "Y"
            },
            {
                "name": "MediaCookie",
                "value": "0%7C2796%2C2766%2CBKC%2C46204%7C2796%2C2766%2CBKC%2C45648%7C2796%2C2766%2CBKC%2C31127%7C2796%2C2766%2CBKC%2C103193"
            },
            {
                "name": "JSESSIONID",
                "value": "3146DB2210E52E6D36A03CD859EEC85F"
            },
            {
                "name": "__utma",
                "value": "16308457.1116498381.1469714691.1469714710.1469714710.1"
            },
            {
                "name": "__utmc",
                "value": "16308457"
            },
            {
                "name": "__utmz",
                "value": "16308457.1469714710.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)"
            },
            {
                "name": "s_sq",
                "value": "%5B%5BB%5D%5D"
            },
            {
                "name": "lsrc",
                "value": "v.1,08/11/2016"
            },
            {
                "name": "cesc",
                "value": "%7B%7D"
            },
            {
                "name": "s_ppn",
                "value": "page.Hotel-Search"
            },
            {
                "name": "s_cc",
                "value": "true"
            },
            {
                "name": "utagdb",
                "value": "true"
            },
            {
                "name": "utag_main",
                "value": "v_id:015631d267af0017eadb02a19b9d0506d00180650086e$_sn:1$_ss:0$_pn:7%3Bexp-session$_st:1469717974787$ses_id:1469714687919%3Bexp-session$dc_visit:1$dc_event:1%3Bexp-session$dc_region:us-west-1%3Bexp-session"
            },
            {
                "name": "_ga",
                "value": "GA1.2.1116498381.1469714691"
            },
            {
                "name": "_tq_id.TV-721872-1.7ec4",
                "value": "bd5c35d25e01bf42.1469714696.0.1469716175.."
            },
            {
                "name": "HMS",
                "value": "2EEABBC6-081B-47C0-B7AA-7F43B0DB93DA"
            },
            {
                "name": "HSEWC",
                "value": "0"
            },
            {
                "name": "SSLB",
                "value": "1"
            },
            {
                "name": "SSRT1",
                "value": "vByaVwIDAQ"
            },
            {
                "name": "linfo",
                "value": "v.4,|0|0|255|1|0||||||||1033|0|0||0|0|0|-1|-1"
            },
            {
                "name": "s_ppvl",
                "value": "page.Hotel-Search%2C8%2C8%2C763%2C1366%2C235%2C1366%2C768%2C1%2CP"
            },
            {
                "name": "s_ppv",
                "value": "Homepage%2C76%2C76%2C1764%2C1147%2C464%2C1366%2C768%2C1%2CP"
            }],
        "method": "POST",
        "httpVersion": "HTTP/1.1"
    }
    request({ har : har, gzip : true}, function (err, resp, body) {
        for (var i in resp.headers) {
            fs.appendFile('headers.txt', i + ' : ' + resp.headers[i] + 　'\r\n');
        }
        fs.appendFileSync('result.txt', body);
    });
});


// function singleFetch(url, callback) {
//     request({url : url, method : 'GET', gzip : true}, function(err, resp, body) {
//             fs.appendFileSync('body.html', body);
//             var $ = cheerio.load(body);
//             $('#resultsContainer .hotelWrapper').each(function(index, item) {
//                 var hotelName = $(this).find('span[class="hotelName"]').text();
//                 console.log(hotelName);    
//             });
//     });
// }

// singleFetch('https://www.expedia.com/Hotel-Search#destination=Macau+(all)&adults=2&regionId=8724&page=1', null);
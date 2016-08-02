/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var excel = require('node-xlsx');

// var request = request.defaults({ proxy: 'http://127.0.0.1:8888' });

singleFettch();

function singleFettch() {

    var columns = ['hotelId', 'hotelName', 'normalizedHotelName', 'cityName', 'threeLetterCountry', 'provinceName', 'reviewTotal', 'cleanlinessRating', 'serviceAndStaffRating', 'roomComfortRating', 'roomComfortRating', 'telephoneNumber'];
    var data = [];
    data.push(columns);
    var har = {
        "method": "POST",
        "url": "https://www.expedia.com/Hotel-Search-Data?responsive=true",
        "httpVersion": "HTTP/1.1",
        "headers": [
            {
                "name": "Cookie",
                "value": "abucket=CgMj71eaEZ8fF0mSCzihAg==; MC1=GUID=a1c939b2abd743a496d5a509b4ba8d6a; tpid=v.1,1; aspp=v.1,0|||||||||||||; AB_Test_TripAdvisor=A; __qca=P0-412518351-1469714694170; __gads=ID=4abc024f6b74457e:T=1469714909:S=ALNI_MZJXh8ZJLq3wN1lmk8c7dfzuMZP5A; MediaCookie=0%7C2796%2C2766%2CBKC%2C46204%7C2796%2C2766%2CBKC%2C45648%7C2796%2C2766%2CBKC%2C31127%7C2796%2C2766%2CBKC%2C103193; __utma=16308457.1116498381.1469714691.1469714710.1469714710.1; __utmz=16308457.1469714710.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); iEAPID=0,; ipsnf3=v.3|cn|0||beijing; SSID1=CAD5Yh0YAQAAAABDEppXAekEB0MSmlcDAAAAAAAAAAAA4amcVwAKiiwFAAHXhQAA4amcVwEAIAUAAdqDAADhqZxXAQA8BQABJogAAOGpnFcBACMFAAHfhAAA4amcVwEANgUAAdeHAADhqZxXAQATBQABJoEAAOGpnFcBADUFAAGHhwAA4amcVwEAOgUAASGIAADhqZxXAQAwBQABe4YAAOGpnFcBADIFAAFGhwAA4amcVwEAJwUAATWFAADhqZxXAQA3BQAB24cAAOGpnFcBABcFAAFjgQAA4amcVwEAIgUAAdmEAADhqZxXAQASBQABJYEAAOGpnFcBADEFAAGahgAA4amcVwEAxAQAAaR4AADhqZxXAQAqBQABvIUAAOGpnFcBAC4FAAEahgAA4amcVwEA0wQAARd6AADhqZxXAQA; SSSC1=1.G6312377906803042561.3|1220.30884:1235.31255:1298.33061:1299.33062:1303.33123:1312.33754:1314.34009:1315.34015:1319.34101:1322.34236:1324.34263:1326.34330:1328.34427:1329.34458:1330.34630:1333.34695:1334.34775:1335.34779:1338.34849:1340.34854; JSESSION=34e86998-b2ff-49d8-9aea-123fd05ed9d0; _cc=AXLalpL84C53MONk8hHlj/bV; AMCVS_C00802BE5330A8350A490D4C%40AdobeOrg=1; AMCV_C00802BE5330A8350A490D4C%40AdobeOrg=-1248264605%7CMCIDTS%7C17013%7CMCMID%7C90850544911327676351687532643510613666%7CMCAAMLH-1470319487%7C9%7CMCAAMB-1470489527%7CNRX38WO0n5BH8Th-nqAG_A%7CMCOPTOUT-1469891927s%7CNONE%7CMCAID%7CNONE; IAID=eeae7bf3-1578-4676-8a26-0447f8fe8f6b; qualtrics_sample=[object Object]; im_puid=109ae7d2-99bb-4798-af9b-6170726c0829; IM_eu_freq_cap=Y; mbox=session#1469884714119-525515#1469887315|PC#1469884714119-525515.24_7#1471095055|check#true#1469885515; s_ppvl=page.Hotel-Search%2C100%2C2%2C10181%2C1366%2C184%2C1366%2C768%2C1%2CP; s_cc=true; utagdb=true; _ga=GA1.2.1116498381.1469714691; _gat_ua=1; s_sq=%5B%5BB%5D%5D; SSRT1=C62cVwIDAQ; lsrc=v.1,08/13/2016; SSLB=1; linfo=v.4,|0|0|255|1|0||||||||1033|0|0||0|0|0|-1|-1; HMS=91693E31-C467-4B1A-8AF2-22E7757ED7E0; HSEWC=0; cesc=%7B%7D; s_ppn=page.Hotel-Search; _tq_id.TV-721872-1.7ec4=bd5c35d25e01bf42.1469714696.0.1469885529..; utag_main=v_id:015631d267af0017eadb02a19b9d0506d00180650086e$_sn:2$_ss:0$_st:1469887329158$dc_visit:2$_pn:3%3Bexp-session$ses_id:1469884729510%3Bexp-session$dc_event:1%3Bexp-session$dc_region:us-west-1%3Bexp-session; s_ppv=page.Hotel-Search%2C100%2C4%2C9827%2C1366%2C184%2C1366%2C768%2C1%2CP"
            },
            {
                "name": "Origin",
                "value": "https://www.expedia.com"
            },
            {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br"
            },
            {
                "name": "Host",
                "value": "www.expedia.com"
            },
            {
                "name": "Accept-Language",
                "value": "zh-CN,zh;q=0.8"
            },
            {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36"
            },
            {
                "name": "Content-Type",
                "value": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            {
                "name": "Accept",
                "value": "*/*"
            },
            {
                "name": "Referer",
                "value": "https://www.expedia.com/Hotel-Search"
            },
            {
                "name": "X-Requested-With",
                "value": "XMLHttpRequest"
            },
            {
                "name": "Connection",
                "value": "keep-alive"
            }
            // {
            //     "name": "Content-Length",
            //     "value": "115"
            // }
        ],
        "queryString": [
            {
                "name": "responsive",
                "value": "true"
            }
        ],
        "cookies": [
            {
                "name": "abucket",
                "value": "CgMj71eaEZ8fF0mSCzihAg==",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "MC1",
                "value": "GUID=a1c939b2abd743a496d5a509b4ba8d6a",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "tpid",
                "value": "v.1,1",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "aspp",
                "value": "v.1,0|||||||||||||",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "AB_Test_TripAdvisor",
                "value": "A",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "__qca",
                "value": "P0-412518351-1469714694170",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "__gads",
                "value": "ID=4abc024f6b74457e:T=1469714909:S=ALNI_MZJXh8ZJLq3wN1lmk8c7dfzuMZP5A",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "MediaCookie",
                "value": "0%7C2796%2C2766%2CBKC%2C46204%7C2796%2C2766%2CBKC%2C45648%7C2796%2C2766%2CBKC%2C31127%7C2796%2C2766%2CBKC%2C103193",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "__utma",
                "value": "16308457.1116498381.1469714691.1469714710.1469714710.1",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "__utmz",
                "value": "16308457.1469714710.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "iEAPID",
                "value": "0,",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "ipsnf3",
                "value": "v.3|cn|0||beijing",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "SSID1",
                "value": "CAD5Yh0YAQAAAABDEppXAekEB0MSmlcDAAAAAAAAAAAA4amcVwAKiiwFAAHXhQAA4amcVwEAIAUAAdqDAADhqZxXAQA8BQABJogAAOGpnFcBACMFAAHfhAAA4amcVwEANgUAAdeHAADhqZxXAQATBQABJoEAAOGpnFcBADUFAAGHhwAA4amcVwEAOgUAASGIAADhqZxXAQAwBQABe4YAAOGpnFcBADIFAAFGhwAA4amcVwEAJwUAATWFAADhqZxXAQA3BQAB24cAAOGpnFcBABcFAAFjgQAA4amcVwEAIgUAAdmEAADhqZxXAQASBQABJYEAAOGpnFcBADEFAAGahgAA4amcVwEAxAQAAaR4AADhqZxXAQAqBQABvIUAAOGpnFcBAC4FAAEahgAA4amcVwEA0wQAARd6AADhqZxXAQA",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "SSSC1",
                "value": "1.G6312377906803042561.3|1220.30884:1235.31255:1298.33061:1299.33062:1303.33123:1312.33754:1314.34009:1315.34015:1319.34101:1322.34236:1324.34263:1326.34330:1328.34427:1329.34458:1330.34630:1333.34695:1334.34775:1335.34779:1338.34849:1340.34854",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "JSESSION",
                "value": "34e86998-b2ff-49d8-9aea-123fd05ed9d0",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "_cc",
                "value": "AXLalpL84C53MONk8hHlj/bV",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "AMCVS_C00802BE5330A8350A490D4C%40AdobeOrg",
                "value": "1",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "AMCV_C00802BE5330A8350A490D4C%40AdobeOrg",
                "value": "-1248264605%7CMCIDTS%7C17013%7CMCMID%7C90850544911327676351687532643510613666%7CMCAAMLH-1470319487%7C9%7CMCAAMB-1470489527%7CNRX38WO0n5BH8Th-nqAG_A%7CMCOPTOUT-1469891927s%7CNONE%7CMCAID%7CNONE",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "IAID",
                "value": "eeae7bf3-1578-4676-8a26-0447f8fe8f6b",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "qualtrics_sample",
                "value": "[object Object]",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "im_puid",
                "value": "109ae7d2-99bb-4798-af9b-6170726c0829",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "IM_eu_freq_cap",
                "value": "Y",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "mbox",
                "value": "session#1469884714119-525515#1469887315|PC#1469884714119-525515.24_7#1471095055|check#true#1469885515",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "s_ppvl",
                "value": "page.Hotel-Search%2C100%2C2%2C10181%2C1366%2C184%2C1366%2C768%2C1%2CP",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "s_cc",
                "value": "true",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "utagdb",
                "value": "true",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "_ga",
                "value": "GA1.2.1116498381.1469714691",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "_gat_ua",
                "value": "1",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "s_sq",
                "value": "%5B%5BB%5D%5D",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "SSRT1",
                "value": "C62cVwIDAQ",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "lsrc",
                "value": "v.1,08/13/2016",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "SSLB",
                "value": "1",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "linfo",
                "value": "v.4,|0|0|255|1|0||||||||1033|0|0||0|0|0|-1|-1",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "HMS",
                "value": "91693E31-C467-4B1A-8AF2-22E7757ED7E0",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "HSEWC",
                "value": "0",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "cesc",
                "value": "%7B%7D",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "s_ppn",
                "value": "page.Hotel-Search",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "_tq_id.TV-721872-1.7ec4",
                "value": "bd5c35d25e01bf42.1469714696.0.1469885529..",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "utag_main",
                "value": "v_id:015631d267af0017eadb02a19b9d0506d00180650086e$_sn:2$_ss:0$_st:1469887329158$dc_visit:2$_pn:3%3Bexp-session$ses_id:1469884729510%3Bexp-session$dc_event:1%3Bexp-session$dc_region:us-west-1%3Bexp-session",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "s_ppv",
                "value": "page.Hotel-Search%2C100%2C4%2C9827%2C1366%2C184%2C1366%2C768%2C1%2CP",
                "expires": null,
                "httpOnly": false,
                "secure": false
            }
        ],
        // "headersSize": 3075,
        // "bodySize": 115,
        "postData": {
            "mimeType": "application/x-www-form-urlencoded; charset=UTF-8",
            "text": "destination=all&adults=2&regionId=178312&sort=recommended&page=7&hashParam=64caefbc671ea4875ab73d53e7f40383a1ae0e2d",
            "params": [
                {
                    "name": "destination",
                    "value": "all"
                },
                {
                    "name": "adults",
                    "value": "2"
                },
                {
                    "name": "regionId",
                    "value": "8724"
                },
                // {
                //     "name": "sort",
                //     "value": "recommended"
                // },
                {
                    "name": "page",
                    "value": "1"
                },
                {
                    "name": "hashParam",
                    "value": "64caefbc671ea4875ab73d53e7f40383a1ae0e2d"
                }
            ]
        }
    }
    request({ har: har, gzip: true }, function (err, resp, body) {
        var total = JSON.parse(body).pagination.totalCount;
        har.postData.params.push({ "name": "pageSize", "value": total })
        request({ har: har, gzip: true }, function (err, resp, body) {
            // fs.appendFileSync('result.txt', body);
            var results = JSON.parse(body).results;
            results.forEach(function (item, index, array) {
                if (index < 2) return; /** The first two recommended hotels are duplicated */
                var hotel = item.retailHotelInfoModel
                var row = [];
                var hotelId = hotel.hotelId;
                var hotelName = hotel.hotelName;
                var normalizedHotelName = hotel.normalizedHotelName;
                var cityName = hotel.cityName;
                var threeLetterCountry = hotel.threeLetterCountry;
                var provinceName = hotel.provinceName;
                var reviewTotal = hotel.reviewTotal;
                var cleanlinessRating = hotel.cleanlinessRating;
                var serviceAndStaffRating = hotel.serviceAndStaffRating;
                var roomComfortRating = hotel.roomComfortRating;
                var roomComfortRating = hotel.roomComfortRating;
                var telephoneNumber = hotel.telephoneNumber;
                row.push(hotelId);
                row.push(hotelName);
                row.push(normalizedHotelName);
                row.push(cityName);
                row.push(threeLetterCountry);
                row.push(provinceName);
                row.push(reviewTotal);
                row.push(cleanlinessRating);
                row.push(serviceAndStaffRating);
                row.push(roomComfortRating);
                row.push(roomComfortRating);
                row.push(telephoneNumber);
                data.push(row);
            });

            var buffer = excel.build([{ name: 'All', data: data }]);

            fs.writeFileSync('expedia_all.xlsx', buffer);
        });
    });
}

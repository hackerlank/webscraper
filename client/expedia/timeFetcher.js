/// <reference path="../../include.d.ts" />
var request = require('request');
var fs = require('fs');

/**
 * excel prepration
 */
// var sheet;
// if (fs.existsSync(filePath)) {
//     fs.createReadStream(filePath).pipe(fs.createWriteStream('backup.xlsx'));
//     var sheet = ew.parse(fs.readFileSync(filePath))[0];
// } else {
//     var columns = ["DATE_EXTRACT", "HOTEL_ID", "HOTEL_NAME", "H_EXPRAT", "H_CAT", "H_LOC", "ROOMTYPE_ID", "ROOMTYPE", "RATEPLAN", "BEDTYPE", "ROOM_SIZE", "RATE_CAT", "RATE_NAME", "RATE_T0", "RATE_T7", "RATE_T14", "RATE_T28", "RATE_T56", "RATE_T102"];
//     var sheet = { name: 'result', data: [] };
//     sheet.data.push(columns);
// }

// var rows = sheet.data;

var harTemp = {
    "method": "GET",
    "url": '',
    "httpVersion": "HTTP/1.1",

    "headers": [
        {
            "name": "Accept",
            "value": "application/json, text/javascript, */*; q=0.01"
        },
        {
            "name": "Accept-Encoding",
            "value": "gzip, deflate, br"
        },
        {
            "name": "Accept-Language",
            "value": "zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3"
        },
        {
            "name": "Connection",
            "value": "keep-alive"
        },
        {
            "name": "Host",
            "value": "www.expedia.com.hk"
        },
        {
            "name": "User-Agent",
            "value": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0"
        },
        {
            "name": "X-Requested-With",
            "value": "XMLHttpRequest"
        }
    ],
    "queryString": [
        {
            "name": "adults",
            "value": "1"
        },
        {
            "name": "children",
            "value": "0"
        },
        {
            "name": "isVip",
            "value": "false"
        },
        {
            "name": "ts",
            "value": "1470703188974"
        }
    ],
}
function composeHar(hotelId, chkin, chkout, cookie, token) {
    var hkhar = harTemp;

    var start = {
        "name": "chkin",
        "value": chkin
    };
    var end =
        {
            "name": "chkout",
            "value": chkout
        };

    var ck = {
        "name": "Cookie",
        "value": cookie
    }

    var tk = {
        "name": "token",
        "value": token
    }
    hkhar.queryString.push(start);
    hkhar.queryString.push(end);
    hkhar.queryString.push(token);
    hkhar.url = "https://www.expedia.com.hk/api/infosite/" + hotelId + "/getOffers?token=" + token + "&chkin=" + chkin + "&chkout=" + chkout;
    hkhar.headers.push(ck);

    return hkhar;
}
var __getSessions = function (resp) {
    var cookies = [];
    var fullArr = resp.headers['set-cookie'];
    for (var i in fullArr) {
        cookies.push(fullArr[i].split(';')[0]);
    }

    return cookies.join("; ");
}

var hotelUrl = 'https://www.expedia.com.hk/en/Macau-Hotels-Banyan-Tree-Macau.h4282350.Hotel-Information';

// request = request.defaults({proxy : 'http://127.0.0.1:8888'});

var hotels = [
    {
        "name": "Altira Macau",
        "id": "10091860",
        "baseUrl": "https://www.expedia.com.hk/en/Macau-Hotels-Altira-Macau.h10091860.Hotel-Information"
    },
    {
        "name": "Banyan Tree Macau",
        "id": "4282350",
        "baseUrl": "https://www.expedia.com.hk/en/Macau-Hotels-Banyan-Tree-Macau.h4282350.Hotel-Information"
    },
    {
        "name": "Broadway Macau",
        "id": "10106413",
        "baseUrl": "https://www.expedia.com.hk/en/Macau-Hotels-Broadway-Macau.h10106413.Hotel-Information"
    }
];

function fetchRate(ckin, ckout, hotelUrl, hotelId) {

    request({ url: hotelUrl, method: 'GET', gzip: true }, function (err, resp, hbody) {
        var cookie = __getSessions(resp);
        var token = hbody.match(/infosite\.token =.*/g)[0].match(/=.*/g)[0].replace(/[=\;']/g, '').trim();
        var har = composeHar(hotelId, ckin, ckout, cookie, token);

        request({ har: har, gzip: true }, function (err, resp, body) {
            // fs.appendFileSync('offer.json', body);
            var offers = JSON.parse(body).offers;
            offers.forEach(function (h, index, array) {
                var date = ckin;
                var hotelID = h.hotelID;
                var roomTypeCode = h.roomTypeCode;
                var ratePlanCode = h.ratePlanCode;
                var roomName = h.roomName;
                var bedtype = hbody.match('var roomsAndRatePlans.*"roomTypeCode":"' + roomTypeCode + '","name":"[A-Za-z0-9\\s]+","description":\\["<strong>(.*)</strong>')[0];
                console.log(bedtype);
            });
        });
    });
}


fetchRate("2016/08/16", "2016/08/17", hotelUrl, "4282350");
// module.exports = fetchRate;

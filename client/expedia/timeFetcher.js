/// <reference path="../../include.d.ts" />
var request = require('request');
var fs = require('fs');
var async = require('async');
var ew = require('node-xlsx');


/** define file name */
const filePath = "expedia.xlsx";
/**
 * excel prepration
 */
var sheet;
if (fs.existsSync(filePath)) {
    fs.createReadStream(filePath).pipe(fs.createWriteStream('backup.xlsx'));
    var sheet = ew.parse(fs.readFileSync(filePath))[0];
} else {
    var columns = ["DATE_EXTRACT", "HOTEL_ID", "HOTEL_NAME", "ROOMTYPE_ID", "ROOMTYPE", "RATEPLAN", "BEDTYPE", "ROOM_SIZE", "RATE_T0", "RATE_T7", "RATE_T14", "RATE_T28", "RATE_T56", "RATE_T102"];
    var sheet = { name: 'result', data: [] };
    sheet.data.push(columns);
}

var rows = sheet.data;


function composeHar(hotelId, chkin, chkout, cookie, token) {
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

// var hotelUrl = 'https://www.expedia.com.hk/en/Macau-Hotels-Banyan-Tree-Macau.h4282350.Hotel-Information';

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


var sheet = { name: 'result', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

function fetchRate(ckin, ckout, hotel) {
    var hotelUrl = hotel.baseUrl;
    var hotelId = hotel.id;
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
                var hotelName = hotel.name;
                var roomTypeCode = h.roomTypeCode;
                var ratePlanCode = h.ratePlanCode;
                var roomName = h.roomName;
                // fs.appendFileSync('main.html', hbody);
                var bedtype = hbody.match('var roomsAndRatePlans.*"roomTypeCode":"' + roomTypeCode + '","name":"[\\w\\s\(\)-]+","description":\\["<strong>([\\w\\s]+)</strong>')[1];
                var roomSize = hbody.match('var roomsAndRatePlans.*"roomTypeCode":"' + roomTypeCode + '","name":"[\\w\\s\(\)-]+","description":\\["<strong>[\\w\\s]+</strong><br\\s/>\\s[\\w\\s-]+\\((\\d+)-sq-meter')[1] + ' square meter';
                // console.log(bedtype);
                // console.log(roomSize);
                var t0 = '';
                if (h.soldOut) {
                    t0 = 'N/A';
                } else {
                    t0 = h.price.displayPrice;
                }
                var row = [];
                row.push(date);
                row.push(hotelID);
                row.push(hotelName);
                row.push(roomTypeCode);
                row.push(roomName);
                row.push(ratePlanCode);
                row.push(bedtype);
                row.push(roomSize);
                row.push(t0);

                offsets = [7, 14, 28, 56, 102];

                async.mapLimit(offsets, 1, function (offset, callback) {
                    // request({ url: hotelUrl, method: 'GET', gzip: true }, function (err, ihresp, ihbody) {
                    // var cookie = __getSessions(ihresp);
                    // var token = ihbody.match(/infosite\.token =.*/g)[0].match(/=.*/g)[0].replace(/[=\;']/g, '').trim();
                    // console.log(hotelId, urlComposer(offset).chkin, urlComposer(offset).chkout);
                    var thar = composeHar(hotelId, urlComposer(offset).chkin, urlComposer(offset).chkout, cookie, token);
                    // fs.appendFileSync('thar.json', JSON.stringify(thar));
                    // process.exit();
                    // console.log(thar.url);
                    // setTimeout(function () {
                    request({ har: thar, gzip: true }, function (err, resp, ibody) {
                        // fs.appendFileSync('main.html', ibody);
                        try {
                            var iOffers = JSON.parse(ibody).offers;
                        } catch (err) {
                            row.push('N/A');
                            setTimeout(function () {
                                callback();
                            }, 5000);
                            return;
                        }
                        var flag = false;
                        iOffers.forEach(function (ih, index, array) {
                            if ((ih.roomTypeCode == roomTypeCode) && (ih.ratePlanCode == ratePlanCode)) {
                                flag = true;
                                if (ih.soldOut) {
                                    var tn = 'N/A';
                                    row.push(tn);
                                } else {
                                    var tn = h.price.displayPrice;
                                    row.push(tn)
                                }
                            }
                        });
                        if (!flag) {
                            row.push(tn);
                        }
                        setTimeout(function () {
                            console.log('offset ' + offset + ' was done');
                            callback();
                        }, 5000);
                    });
                    // });
                    // }, 50000);
                }, function (err) {
                    rows.push(row);
                    var buffer = ew.build([sheet]);
                    fs.writeFileSync(filePath, buffer);
                    console.log(err);
                });

            });
        });
    });
}


/**
 * Date extension
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function urlComposer(choosenOffset) {
    var params = '#adults=1&children=0';
    var ckinDate = new Date();
    ckinDate.setDate(new Date().getDate() + choosenOffset);
    var ckin = ckinDate.Format('yyyy/MM/dd');
    var ckoutDate = new Date();
    ckoutDate.setDate(new Date().getDate() + choosenOffset + 1);
    var ckout = ckoutDate.Format('yyyy/MM/dd');
    params += '&chkin=' + ckin;
    params += '&chkout=' + ckout;

    return { params: params, chkin: ckin, chkout: ckout };
}
fetchRate("2016/08/09", "2016/08/10", hotels[2]);
// module.exports = fetchRate;

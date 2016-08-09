/// <reference path="../../include.d.ts" />
var webdriver = require('selenium-webdriver');
var proxy = require('selenium-webdriver/proxy');
var firefox = require('selenium-webdriver/firefox');
var phantomJs = require('selenium-webdriver/phantomjs');
var by = webdriver.By;
var fs = require('fs');
var async = require('async');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var har = require('./har.js');
var request = require('request');

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
    var columns = ["DATE_EXTRACT", "HOTEL_ID", "HOTEL_NAME", "H_EXPRAT", "H_CAT", "H_LOC", "ROOMTYPE_ID", "ROOMTYPE", "RATEPLAN", "BEDTYPE", "ROOM_SIZE", "RATE_CAT", "RATE_NAME", "RATE_T0", "RATE_T7", "RATE_T14", "RATE_T28", "RATE_T56", "RATE_T102"];
    var sheet = { name: 'result', data: [] };
    sheet.data.push(columns);
}

var rows = sheet.data;
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

/** Hotel definition. Need to be flexible */
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

/** date offset. 0 represents today */
var dates = [7, 14, 28, 56, 102];

var harTemp = har.harTemp;

/** process cookie */
var __getSessions = function (resp) {
    var cookies = [];
    var fullArr = resp.headers['set-cookie'];
    for (var i in fullArr) {
        cookies.push(fullArr[i].split(';')[0]);
    }

    return cookies.join("; ");
}

/** function to compose urls' parameters */
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

function fetchRate(ckin, ckout, hotelUrl, hotelId, roomId, ratePlanCode, row, callback) {
    request({ url: hotelUrl, method: 'GET', gzip: true }, function (err, resp, body) {
        var cookie = __getSessions(resp);
        var token = body.match(/infosite\.token =.*/g)[0].match(/=.*/g)[0].replace(/[=\;']/g, '').trim();
        var fetchHar = composeHar(hotelId, ckin, ckout, cookie, token);

        request({ har: fetchHar, gzip: true }, function (err, resp, body) {
            if (err) console.log(err);
            if ((!body) || (body.length < 5)) {
                setTimeout(function () {
                    row.push('N/A');
                    console.log(hotelUrl + ' - ' + ckin + ' - ' + roomId + ' was done, empty body');
                    callback();
                }, 2000);
            } else {
                // fs.appendFileSync('offer.json', body);
                var offers = JSON.parse(body).offers;
                console.log(ckin, ckout, hotelUrl, hotelId, roomId, ratePlanCode, offers.length);
                offers.forEach(function (h, index, array) {
                    console.log(h.roomTypeCode + '?=' + roomId + ' ### ' + h.ratePlanCode + '?=' + ratePlanCode);
                    if ((h.roomTypeCode == roomId) && (h.ratePlanCode == ratePlanCode)) {
                        console.log('yes, equal!');
                        if (h.soldOut) {
                            row.push('N/A');
                            setTimeout(function () {
                                console.log(roomId + '- ' + ratePlanCode + ' was done, N/A pushed');
                                callback();
                                return;
                            }, 10000);
                        } else {
                            row.push(h.price.displayTotalPrice);
                            setTimeout(function () {
                                console.log(roomId + '- ' + ratePlanCode + ' was done, ' + h.price.displayTotalPrice + ' pushed');
                                callback();
                                return;
                            }, 10000);
                        }
                    }
                    // else {
                    //     if (index === array.length - 1) {
                    //         row.push('N/A');
                    //         setTimeout(function () {
                    //             console.log(roomId + '- ' + ratePlanCode + ' was done, N/A pushed');
                    //             callback();
                    //             return;
                    //         }, 10000);
                    //     }
                    // }
                });
            }
        });
    });
}


//Define the screenshot function
webdriver.WebDriver.prototype.saveScreenshot = function (filename) {
    return driver.takeScreenshot().then(function (data) {
        fs.writeFile(filename, data.replace(/^data:image\/png;base64,/, ''), 'base64', function (err) {
            if (err) throw err;
        });
    })
};
var driver = new webdriver.Builder().forBrowser('chrome').usingServer('http://127.0.0.1:4444/wd/hub').build();

function singleFetchNew(hotel, callback) {
    var p = urlComposer(0);
    var extractDate = new Date(p.chkin);
    // extractDate.setHours(extractDate.getHours + 8);
    var hotelID = hotel.id;
    var hotelName = hotel.name;
    driver.get(hotel.baseUrl + p.params).then(function () {
        driver.wait(function () {
            /** Waiting for form loaded */
            return driver.isElementPresent(by.id('availability-check-in-label')).then(function (present) {
                return present;
            })
        }, 500000).then(function () {
            driver.getPageSource().then(function (html) {   
                var $ = cheerio.load(html);
                fs.appendFileSync('body.html', html);
                var exprat = $('span[itemprop="ratingValue"]').text();
                var cat = $('#license-plate .visuallyhidden').text().slice(0, 1) + '-Stars';
                var loc = $('.street-address').eq(0).text() + ', ' + $('.city').eq(0).text();
                $('.rooms-and-rates-segment table tbody tr').each(function (index, element) {
                    var roomTypeId = $(this).parent('tbody').attr('data-room-code');
                    var roomType = $(this).find('.btn-label').eq(0).text().trim();
                    var ratePlanCode = $(this).find('input[name="ratePlanCode"]').attr('value');
                    var bedType = $(this).find('.bed-types').text().trim();
                    var roomSize = $(this).find('.square-area').text().trim();
                    var rateCat = $(this).find('.rate-features .rate-policies a div').text() ? $(this).find('.rate-features .rate-policies a div').text().trim() : 'Refundable';
                    var rateName = '';
                    if (rateCat === 'Non-Refundable') {
                        rateName += 'NONREF-';
                    } else {
                        rateName += 'REFUND-';
                    }
                    $(this).find('.rate-includes .room-amenity .free-text').each(function (index, element) {
                        rateName += $(this).text().trim() + ',';
                    });
                    rateName.slice(0, rateName.length - 3);
                    var price = $(this).find('.room-price').text() ? $(this).find('.room-price').text() : 'N/A';
                    var row = [];
                    row.push(extractDate);
                    row.push(hotelID);
                    row.push(hotelName);
                    row.push(exprat);
                    row.push(cat);
                    row.push(loc);
                    row.push(roomTypeId);
                    row.push(roomType);
                    row.push(ratePlanCode);
                    row.push(bedType);
                    row.push(roomSize);
                    row.push(rateCat);
                    row.push(rateName);
                    row.push(price);

                    var wrappers = []
                    dates.forEach(function (offset, i, array) {
                        var chkin = urlComposer(offset).chkin;
                        var chkout = urlComposer(offset).chkout;
                        var wrapper = {
                            chkin: chkin,
                            chkout: chkout,
                            hotelId: hotelID,
                            hotelUrl: hotel.baseUrl,
                            roomId: roomTypeId,
                            ratePlanCode: ratePlanCode
                        }
                        wrappers.push(wrapper);
                    });
                    async.mapLimit(wrappers, 1, function (wrapper, cb) {
                        fetchRate(wrapper.chkin, wrapper.chkout, wrapper.hotelUrl, wrapper.hotelId, wrapper.roomId, wrapper.ratePlanCode, row, cb);
                    }, function (err) {
                        if (err) console.log(err);
                        rows.push(row);
                        if (index == $('.rooms-and-rates-segment table tbody tr').length - 1) {
                            setTimeout(function () {
                                console.log(hotel.name + ' was done');
                                // driver.close();
                                callback();
                            }, 2000);
                        }
                    });
                    // console.log(exprat + '  ' + cat + '  ' + loc + '  ' + roomTypeId + '  ' + roomType + '  ' + bedType + '  ' + roomSize + '  ' + rateCat + '  ' + rateName + '  ' +  price ) ;
                });
            });
        });
    });
}

process.on('exit', function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync(filePath, buffer);
});

async.mapLimit(hotels, 1, function (hotel, callback) {
    singleFetchNew(hotel, callback);
}, function (err) {
    if (err) console.log(err);
    var buffer = ew.build([sheet]);
    fs.writeFileSync(filePath, buffer);
});



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
if (fs.exists(filePath)) {
    fs.createReadStream(filePath).pipe(fs.createWriteStream('backup.xlsx'));
    var sheet = ew.parse(fs.readFileSync(filePath))[0];
} else {
    var columns = ["DATE_EXTRACT", "HOTEL_ID", "HOTEL_NAME", "H_EXPRAT", "H_CAT", "H_LOC", "ROOMTYPE_ID", "ROOMTYPE", "BEDTYPE", "ROOM_SIZE", "RATE_CAT", "RATE_NAME", "RATE_T0", "RATE_T7", "RATE_T14", "RATE_T28", "RATE_T56", "RATE_T102"];
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
    // {
    //     "name": "Banyan Tree Macau",
    //     "id": "4282350",
    //     "baseUrl": "https://www.expedia.com.hk/en/Macau-Hotels-Banyan-Tree-Macau.h4282350.Hotel-Information"
    // },
    {
        "name": "Broadway Macau",
        "id": "10106413",
        "baseUrl": "https://www.expedia.com.hk/en/Macau-Hotels-Broadway-Macau.h10106413.Hotel-Information"
    }
];

/** date offset. 0 represents today */
var dates = [7, 14, 28, 56, 102];

/** function to compose urls' parameters */
function urlComposer(choosenOffset) {
    var params = '?rm1=a1';
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

function composeHar(hotelId, chkin, chkout) {
    var hkhar = har.har_getOffersHK;

    var start = {
        "name": "chkin",
        "value": chkin
    };
    var end =
        {
            "name": "chkout",
            "value": chkout
        };

    hkhar.queryString.push(start);
    hkhar.queryString.push(end);
    hkhar.url = "https://www.expedia.com.hk/api/infosite/" + hotelId + "/getOffers?token=697228cbdbfce224204d71f58ce2208f356f9d06&isVip=false&chid=&chkin=" + chkin + "&chkout=" + chkout + "&adults=1&children=0";

    return hkhar;
}



function singleFetchNew(hotel, callback) {
    //Define the screenshot function
    webdriver.WebDriver.prototype.saveScreenshot = function (filename) {
        return driver.takeScreenshot().then(function (data) {
            fs.writeFile(filename, data.replace(/^data:image\/png;base64,/, ''), 'base64', function (err) {
                if (err) throw err;
            });
        })
    };
    var driver = new webdriver.Builder().forBrowser('chrome').usingServer('http://127.0.0.1:4444/wd/hub').build();
    var p = urlComposer(0);
    var extractDate = new Date(p.chkin);
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
                // fs.appendFileSync('body.html', html);
                var exprat = $('span[itemprop="ratingValue"]').text();
                var cat = $('#license-plate .visuallyhidden').text().slice(0, 1) + '-Stars';
                var loc = $('.street-address').eq(0).text() + ', ' + $('.city').eq(0).text();
                $('.rooms-and-rates-segment table tbody tr').each(function (index, element) {
                    var roomTypeId = $(this).parent('tbody').attr('data-room-code');
                    var roomType = $(this).find('.btn-label').eq(0).text().trim();
                    var bedType = $(this).find('.bed-types').text().trim();
                    var roomSize = $(this).find('.square-area').text().trim();
                    var rateCat = $(this).find('.rate-features .rate-policies a div').text().trim();
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
                    row.push(bedType);
                    row.push(roomSize);
                    row.push(rateCat);
                    row.push(rateName);
                    row.push(price);

                    /** to fetch t + n */
                    dates.forEach(function (offset, index, array) {

                        var params = urlComposer(offset);
                        driver.get(hotel.baseUrl + params.params).then(function () {
                            driver.wait(function () {
                                /** Waiting for form loaded */
                                return driver.isElementPresent(by.id('availability-check-in-label')).then(function (present) {
                                    return present;
                                })
                            }, 500000).then(function () {
                                driver.getPageSource().then(function (html) {
                                    var $ = cheerio.load(html);
                                    var price = $('tbody[data-room-code="' + roomTypeId + '"] tr .room-price').text() ? $('tbody[data-room-code="' + roomTypeId + '"] tr .room-price').text() : 'N/A';
                                    row.push(price);
                                    if (index === array.length - 1) {
                                        rows.push(row);
                                    }
                                });
                            });
                        });
                        // var ckin = urlComposer(offset).chkin;
                        // var ckout = urlComposer(offset).chkout;
                        // var har = composeHar(hotelID, ckin, ckout);
                        // console.log(har.url);
                        // request({ har: har, gzip: true }, function (err, resp, body) {
                        //     if (!body.offers) {
                        //         // console.log('!body    ' + har.url + ' :  ' +  har.queryString);
                        //         fs.appendFileSync('noneoffer.json', body);
                        //     }
                        //     body.offers.forEach(function (room, index, array) {
                        //         if (room.roomTypeCode == roomTypeId) {
                        //             if (room.soldOut == true) {
                        //                 row.push('N/A');
                        //             } else {
                        //                 row.push(room.price.displayTotalPrice);
                        //             }
                        //         }

                        //         setTimeout(function() {
                        //             console.log('Waiting for next request');
                        //         }, 5000);
                        //         if (index === array.length - 1) {
                        //             rows.push(row);
                        //             setTimeout(function () {
                        //                 console.log(hotel.name + ' was done');
                        //                 driver.close();
                        //                 callback();
                        //             }, 500);
                        //         }
                        //     });
                        // });
                    });
                    // console.log(exprat + '  ' + cat + '  ' + loc + '  ' + roomTypeId + '  ' + roomType + '  ' + bedType + '  ' + roomSize + '  ' + rateCat + '  ' + rateName + '  ' +  price ) ;
                    if (index == $('.rooms-and-rates-segment table tbody tr').length - 1) {
                        setTimeout(function () {
                            console.log(hotel.name + ' was done');
                            // driver.close();
                            callback();
                        }, 2000);
                    }
                });
            });
        });
    });
}

process.on('exit', function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync(filePath, buffer);
});




// var entities = [];
// hotels.forEach(function (hotel, index, array) {
//     dates.forEach(function (offset, index, array) {
//         entities.push({ hotel: hotel, offset: offset });
//     });
// });


async.mapLimit(hotels, 3, function (hotel, callback) {
    singleFetchNew(hotel, callback);
}, function (err) {
    if (err) console.log(err);
    var buffer = ew.build([sheet]);
    fs.writeFileSync(filePath, buffer);
});




/**
 *  
function singleFetch(hotel, offset) {
    //Define the screenshot function
    webdriver.WebDriver.prototype.saveScreenshot = function (filename) {
        return driver.takeScreenshot().then(function (data) {
            fs.writeFile(filename, data.replace(/^data:image\/png;base64,/, ''), 'base64', function (err) {
                if (err) throw err;
            });
        })
    };
    var p = urlComposer(offset);
    var driver = new webdriver.Builder().forBrowser('phantomjs').usingServer('http://127.0.0.1:4444/wd/hub').build();
    var extractDate = p.chkin;
    var hotelID = hotel.id;
    var hotelName = hotel.name;
    var exprat = '';
    var cat = '';
    var loc = '';
    driver.get(hotel.baseUrl + p.params).then(function () {
        driver.wait(function () {
            return driver.isElementPresent(by.id('availability-check-in-label')).then(function (present) {
                return present;
            })
        }, 50000).then(function () {

            driver.findElement(by.xpath('//span[@itemprop = "ratingValue"]')).getText().then(function (text) {
                exprat = text;
            }).then(function () {
                driver.findElement(by.xpath('//div[@id = "license-plate"]//span[@class = "visuallyhidden"]')).getText().then(function (text) {
                    cat = text.slice(0, 1) + '-Stars';
                }).then(function () {
                    driver.findElement(by.xpath('//span[@class="street-address"]')).getText().then(function (text) {
                        loc += text;
                    }).then(function () {
                        driver.findElement(by.xpath('//span[@class="city"]')).getText().then(function (text) {
                            loc += ', ' + text;
                        }).then(function() {
                            driver.findElements(by.xpath('//div[@id="rooms-and-rates"]/div/article/table/tbody')).then(function(elements) {
                                elements.forEach(function(element, index, array) {
                                    var row = [];
                                    row.push(extractDate);
                                    row.push(hotelID);
                                    row.push(hotelName);
                                    row.push(exprat);
                                    row.push(cat);
                                    row.push(loc);
                                    element.getAttribute('data-room-code').then(function(typeId){
                                        row.push(typeId);
                                    }).then(function() {

                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
*/
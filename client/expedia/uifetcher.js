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
    var columns = ["DATE_EXTRACT","HOTEL_ID","HOTEL_NAME", "H_EXPRAT","H_CAT", "H_LOC", "ROOMTYPE_ID", "ROOMTYPE", "BEDTYPE", "ROOM_SIZE", "RATE_CAT", "RATE_NAME", "RATE_T0", "RATE_T7", "RATE_T14", "RATE_T28", "RATE_T56", "RATE_T102"];
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
var dates = [0, 7, 28, 56, 102];

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

    return { params: params, chkin: ckin };
}


function singleFetchNew(hotel, offset, callback) {
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
    var extractDate = new Date(p.chkin);
    var hotelID = hotel.id;
    var hotelName = hotel.name;
    driver.get(hotel.baseUrl + p.params).then(function () {
        driver.wait(function () {
            /** Waiting for form loaded */
            return driver.isElementPresent(by.id('availability-check-in-label')).then(function (present) {
                driver.saveScreenshot('unabletoload.png');
                return present;
            })
        }, 500000).then(function () {
            driver.getPageSource().then(function (html) {
                var $ = cheerio.load(html);
                // fs.appendFileSync('body.html', html);
                var exprat = $('span[itemprop="ratingValue"]').text();
                var cat = $('#license-plate .visuallyhidden').text().slice(0, 1) + '-Stars';
                var loc = $('.street-address').eq(0).text() + ', ' + $('.city').eq(0).text();
                $('.rooms-and-rates-segment table tbody').each(function (index, element) {
                    var roomTypeId = $(this).attr('data-room-code');
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
                    rateName.slice(0, rateName.length - 1);
                    var price = $(this).find('.room-price').text() ? $(this).find('.room-price').text() : 'N/A';
                    var already = false;
                    var origin = extractDate;
                    origin.setDate(origin.getDate() - offset);
                    for (var index in rows) {
                        if ((rows[index].indexOf(hotelID)) !== -1 && (rows[index].indexOf(origin) !== -1)) {
                            already = true;
                            rows[index][dates.indexOf(offset) + 12] = price;
                        }
                    }
                    if (!already) {
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
                        rows.push(row);
                    }
                    // console.log(exprat + '  ' + cat + '  ' + loc + '  ' + roomTypeId + '  ' + roomType + '  ' + bedType + '  ' + roomSize + '  ' + rateCat + '  ' + rateName + '  ' +  price ) ;
                });
                setTimeout(function() {
                    console.log(hotel.name + ' - offset ' + offset + ' was done');
                    driver.quit();
                    callback();
                }, 500);
            });
        });
    });
}

process.on('exit', function() {
    var buffer = ew.build([sheet]);
    fs.writeFileSync(filePath, buffer);
});


var entities = [];
hotels.forEach(function (hotel, index, array) {
    dates.forEach(function (offset, index, array) {
        entities.push({ hotel: hotel, offset: offset });
    });
});


async.mapLimit(entities, 3, function (entity, callback) {
    singleFetchNew(entity.hotel, entity.offset, callback);
}, function (err) {
    if (err) console.log(err);
    var buffer = ew.build([sheet]);
    fs.writeFileSync(filePath, buffer);
});




/** 
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
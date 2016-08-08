/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var excel = require('node-xlsx');
var har = require('./har.js');

// var request = request.defaults({ proxy: 'http://127.0.0.1:8888' });

var measurements = ["hotelID", ""];

singleFettch();

function singleFettch() {

    var columns = ['hotelId', 'hotelName', 'normalizedHotelName', 'cityName', 'threeLetterCountry', 'provinceName', 'reviewTotal', 'cleanlinessRating', 'serviceAndStaffRating', 'roomComfortRating', 'roomComfortRating', 'telephoneNumber'];
    var data = [];
    data.push(columns);
    var har_searchByLocation = har.har_searchByLocation;
    request({ har: har_searchByLocation, gzip: true }, function (err, resp, body) {
        var total = JSON.parse(body).pagination.totalCount;
        har_searchByLocation.postData.params.push({ "name": "pageSize", "value": total })
        request({ har: har_searchByLocation, gzip: true }, function (err, resp, body) {
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

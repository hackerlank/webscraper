/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var excel = require('node-xlsx');


var columns = ['Check in Date', 'Check out Date', 'Hotel ID', 'Room Type Code', 'Room Name', 'Display Price'];
var sheet1 = { name: 'Orange-County-Hotels-Lemon-Tree-Hotel-Suites-Anaheim', data: [] };
sheet1.data.push(columns);
var har_getOffers = require('./har.js').har_getOffers;
request({ har: har_getOffers, gzip: true }, function (err, resp, body) {
    if (err) console.log(err);
    console.log(resp.statusCode);
    
    var offers = JSON.parse(body).offers;
    offers.forEach(function (room, index, array) {
        var checkInDate = new Date(room.checkInDate);
        var checkOutDate = new Date(room.checkOutDate);
        var hotelId = room.hotelID;
        var roomTypeCode = room.roomTypeCode;
        var roomName = room.roomName;
        var displayPrice =  room.price ? room.price.displayPrice : '';
        var row = [];
        row.push(checkInDate);
        row.push(checkOutDate);
        row.push(hotelId);
        row.push(roomTypeCode);
        row.push(roomName);
        row.push(displayPrice);
        sheet1.data.push(row);
    });
    var buffer = excel.build([sheet1]);
    fs.writeFileSync('expedia_collect.xlsx', buffer);
});


















/** 
var url = 'https://www.expedia.cn/Orange-County-Hotels-Lemon-Tree-Hotel-Suites-Anaheim.h1201457.Hotel-Information?chkin=2016/08/03&chkout=2016/08/04&rm1=a2&hwrqCacheKey=f53390f8-2951-4baa-9280-7d55dc957e08HWRQ1470194415055&c=b55dc6e9-40f2-4e1e-9357-d16fc81d8cb5&&exp_dp=656.09&exp_ts=1470194419805&exp_curr=CNY&exp_pg=HSR';
var columns = ['Check in Date' , 'Check out Date', 'Room Type', 'Bed Type', 'rate1', 'rate2'];
var sheet1 = {name : 'The Vemetian Macao Resort', data : []};
sheet1.data.push(columns);


request({url : url, method : 'GET'}, function(err, resp ,body) {
    fs.writeFileSync('body.html', body);
    var $ = cheerio.load(body);
    $('table tbody').each(function(index, item) {
        var checkindate = new Date('2016/08/02');
        var checkoutdate = new Date('2016/08/03');
        var type = $(this).find('.room-basic-info h3').text();
        var bedType = $(this).find('.bed-types').text();
        var rate_feature1 = $(this).find('.room-price').eq(0).text();
        var rate_feature2 = $(this).find('.room-price').eq(1).text();
        var row = [];
        row.push(checkindate);
        row.push(checkoutdate);
        row.push(type);
        row.push(bedType);
        row.push(rate_feature1);
        row.push(rate_feature2);
        sheet1.data.push(row);
    });

     var buffer = excel.build([sheet1]);
     fs.writeFileSync('expedia_collect.xlsx', buffer);
});
 */
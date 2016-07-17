/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ExcelWriter = require('../../private/ExcelWriter.js');


var url = 'https://yellowpages.cybo.com/search/?tok=oad8jk-5b6555248503a8366ffd&search=Opticians+and+eyewear&wt=drill&udrill=opticians-and-eyewear&searchcity=Lagos+Nigeria&pl=lagos&i=NG&t=c&lat=&lng';

var columns = ['Name', 'Street Address', 'City', 'Postal', 'Country', 'Phone'];
var ew = new ExcelWriter('result.xlsx', columns , 'cybo');
request({url:url, method:'GET', gzip: true}, function(err, resp, body) {
    var $ = cheerio.load(body);
   
    $('.result-table-wrapper tr[class="res-yo"]').each(function(index, item) {
        var row = [];
        var name = $(this).find('h2[itemprop="name"]').text();
        var address = $(this).find('span[itemprop="streetAddress"]').text().trim(); 
        var city = $(this).find('span[itemprop="addressLocality"]').text();
        var postal = $(this).find('span[itemprop="postalCode"]').text();
        var country = $(this).find('span[itemprop="addressCountry"]').text();
        var phone = $(this).find('span[itemprop="telephone"]').text();
        row.push(name);
        row.push(address);
        row.push(city);
        row.push(postal);
        row.push(country);
        row.push(phone);
        ew.appendRow(row);
        ew.build();
    });

    
});


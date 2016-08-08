/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var excel = require('node-xlsx');

var url = 'http://m.finn.no/realestate/homes/search.html?location=0.20061&location=1.20061.20528&filters___PAGE1-';
var columns = [];
var sheet1 = {name : 'result', data : []};
sheet1.data.push(columns);

request({url: url, method : 'GET'}, function(err, resp ,body) {
    var $ = cheerio.load(body);
    $('.inner.r-pal').each(function(index, element) { 
        var attr1 = $(this).find('span[data-automation-id="topRowCenter"]').text();
        var attr2 = $(this).find('span[data-automation-id="bodyRow"]').eq(0).text();
        var attr3 = $(this).find('span[data-automation-id="bodyRow"]').eq(1).text();
        var attr4 = $(this).find('li[data-automation-id="bottomRow2"]').text();
        var attr5 = $(this).find('.fleft li').eq(2).text();
        var row = [];
        row.push(attr1);
        row.push(attr2);
        row.push(attr3);
        row.push(attr4);
        row.push(attr5);
        sheet1.data.push(row);
    });
    var buffer = excel.build([sheet1]);

    fs.writeFileSync('result.xlsx', buffer);
});
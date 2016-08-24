/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var excel = require('node-xlsx');

var columns = ["Address", "MarketValue", "Sale Details", "Owner"];
var sheet = { name: 'result', data: [] };

sheet.data.push(columns);

var rows = sheet.data;

var filePath = 'result.xlsx';

var bs = ["Washington", "Carpenter", "Catherine", "Fitzwater", "Christian", "Bainbridge", "South", "Locust", "Walnut", "Lombard", "Rodman", "Naudain", "Market", "Vine", "Spring Garden", "Chestnut", "Spruce", "Pine", "Sansom", "Vine", "Arch", "Race", "Callohill"];

var bn = ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300", "2400", "2500", "2600", "2700", "2800", "2900", "3000", "3100", "3200", "3300", "3400", "3500", "3600", "3700", "3800", "3900", "4000", "4100", "4200", "4300", "4400", "4500"];

var links = [];

bs.forEach(function (s, index, array) {
    bn.forEach(function (n, index, array) {
        links.push('http://property.phila.gov/?bn=' + n + '&bs=' + s);
    });
})

process.on('exit', function() {
    var buffer = excel.build([sheet]);

    fs.writeFileSync(filePath, buffer);
});

async.mapLimit(links, 2, function (link, callback) {
    console.log('start ' + link);
    request({ url: link, method: 'GET', gzip: true }, function (err, resp, body) {
        fs.appendFileSync('body.html', body);
        var $ = cheerio.load(body);
        $('tr[data-book="result-row"]').each(function (index, element) {
            if (index !== 0) {
                var address = $(this).find('td').eq(0).find('span a').text();
                var marketValue = $(this).find('td').eq(1).find('span').text();
                var salesDetails = $(this).find('td').eq(2).find('span').text();
                var owner = $(this).find('td').eq(3).find('span').text();
                var row = [];
                row.push(address);
                row.push(marketValue);
                row.push(salesDetails);
                row.push(owner);
                rows.push(row);
            }
        });
        setTimeout(function () {
            console.log(link + 'was done');
            callback();
        }, 1000);
    });
}, function (err) {
    console.log('everything is done');
    var buffer = excel.build([sheet]);

    fs.writeFileSync(filePath, buffer);
});
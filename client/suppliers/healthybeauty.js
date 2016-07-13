/// <reference path="../../include.d.ts" />

var request = require('request');
var cheerio = require('cheerio');
var ExcelWriter = require('../../private/ExcelWriter');

var eWriter = new ExcelWriter('healthybeauty.xlsx', ['Website', 'Name', 'Address'], 'result');

request({url : 'http://www.wholesalecentral.com/Health-Beauty.html?catid=18&location=&subcatid=&suptypeid=&mertypeid=&sRow=1&eRow=125', method : 'GET'}, function(err, resp, body) {
    if(err) console.log(err);
    var $ = cheerio.load(body);
    $('.listings p').each(function(index, p) {
        var row = [];
        var website = $(this).find('a').attr('href');
        var name = $(this).find('a strong').text();
        var Address = $(this).text().split('\r\n')[2].trim() + ' ' + ( $(this).text().split('\r\n')[3] ? $(this).text().split('\r\n')[3].trim() : '');
        // console.log(website + ' : '  + name + ' ' + Address);
        // process.exit();
        row.push(website);
        row.push(name);
        row.push(Address);
        eWriter.appendRow(row);
    });

    eWriter.build();
});


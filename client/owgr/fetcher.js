/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ExcelWriter = require('../../private/ExcelWriter.js');

var ew = new ExcelWriter('result.xlsx', ['Rank', 'City', 'Name'], '20160717');



request({ url: 'http://www.owgr.com/en/Events/EventResult.aspx?eventid=6289', method: 'GET'}, function (err, resp, body) {
    if (err) console.log(err);

    var $ = cheerio.load(body);

    $('#phmaincontent_0_ctl00_PanelPreviousEvent table tr').each(function (index, item) {
        if (index < 2) return;
        var rank = $(this).find('td').eq(0).text();
        var city = $(this).find('td img').attr('title');
        var name = $(this).find('.name a').text();
        var row = [];
        row.push(rank);
        row.push(city);
        row.push(name);
        ew.appendRow(row);
        ew.build();
    });
});
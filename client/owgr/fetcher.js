/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ExcelWriter = require('../../private/ExcelWriter.js');

var columns = ['date', 'month', 'year', 'tournament', 'strength of field', 'country/_title', 'pos', 'name/_text', 'r1', 'r2', 'r3', 'r4', 'players avg score', 'rds played', 'fields avg score', 'course avg', 'shots gained'];

var ew = new ExcelWriter('result.xlsx', columns, '2012');



function singleFetch(url, callback) {

    request({ url: url, method: 'GET' , gzip : true}, function (err, resp, body) {
        if (err) console.log(err);
        // fs.appendFileSync('body.html', body);
        var $ = cheerio.load(body);
        //16th December 2012
        var timeStr = $('span[class="sub_header"] time').text();
        var date = timeStr.split(' ')[0];
        var month = timeStr.split(' ')[1];
        var year = timeStr.split(' ')[2];
        var tournament = $('.event_result_table h2').text();
        var strength = $('.strength').text().match(/\d+/)[0];

        $('#event_result_table .table_container table tr').each(function (index, item) {
            if (index < 2) return;
            var pos = $(this).find('td').eq(0).text();
            var country = $(this).find('td img').attr('title');
            var name = $(this).find('.name a').text();
            var r1 = $(this).find('td').eq(3).text();
            var r2 = $(this).find('td').eq(4).text();
            var r3 = $(this).find('td').eq(5).text();
            var r4 = $(this).find('td').eq(6).text();
            var avg = parseInt($(this).find('td').eq(7).text()) / 4;
            var row = [];
            row.push(date);
            row.push(month);
            row.push(year);
            row.push(tournament);
            row.push(strength);
            row.push(pos);
            row.push(country);
            row.push(name);
            row.push(r1);
            row.push(r2);
            row.push(r3);
            row.push(r4);
            row.push(avg);
            console.log(row);
            ew.appendRow(row);
        });
        ew.build();
    });
}

singleFetch('http://www.owgr.com/en/Events/EventResult.aspx?eventid=5155', null);
/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ExcelWriter = require('../../private/ExcelWriter.js');

var columns = ['Time', 'Team', 'Odds1', 'Odds2', 'Odds3'];

var ew = new ExcelWriter('result.xlsx', columns, 'r');

var url = 'http://odds.aussportsbetting.com/betting';

request({ url: url, method: 'GET', gzip: true }, function (err, resp, body) {
    err ? console.log(err) : '';
    var $ = cheerio.load(body);
    $('#sectionData table').eq(1).find('tr').each(function (index, tr) {
        if (index === 0) {
            return;
        }
        var time = eval($(this).find('td').eq(0).find('script').text());
        var team = $(this).find('td').eq(1).text();
        var odd1 = $(this).find('td').eq(2).text();
        var odd2 = $(this).find('td').eq(4).text();
        var odd3 = $(this).find('td').eq(6).text();
        var row = [];
        row.push(time);
        row.push(team);
        row.push(odd1);
        row.push(odd2);
        row.push(odd3);
        ew.appendRow(row);
    });
    ew.build();
});


function write_local_time(timestamp) {
    var offset = new Date(1468847884541) - new Date();
    var tzn_cp = parseInt(timestamp);
    // 30 minute increments to get the right time
    for (i = -24; i <= 24; i++) {
        if (offset - 1800000 * i > -15 * 1000 * 60 && offset - 1800000 * i < 15 * 1000 * 60) {
            offset = 1800000 * i;
        }
    }
    var lcl_date = new Date(tzn_cp - offset); intMonth = lcl_date.getMonth(); intDate = lcl_date.getDate(); intDay = lcl_date.getDay(); intYear = lcl_date.getFullYear();
    var months_short = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
    var days_short = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri',
        'Sat')
    var mmm = months_short[intMonth]; var ddd = days_short[intDay]; var dd = intDate < 10 ? '0' + intDate + '' : intDate + ''; var d = intDate + '';
    var HH = lcl_date.getHours(); var mm = lcl_date.getMinutes(); century = 0;
    while ((intYear - century) >= 100) century = century + 100;
    var yy = intYear - century;
    if (yy < 10) yy = '0' + yy + '';
    if (HH < 10) HH = '0' + HH + '';
    if (mm < 10) mm = '0' + mm + '';

    displayDate = new String("!ddd !MMM !dd !HH:!mm");
    displayDate = displayDate.replace(/!mmm/i, mmm);
    displayDate = displayDate.replace(/!ddd/i, ddd);
    displayDate = displayDate.replace(/!dd/i, dd);
    displayDate = displayDate.replace(/!HH/i, HH);
    displayDate = displayDate.replace(/!mm/i, mm);
    return displayDate;
}
function getDaysInMonth(lcl_date) {
    // returns the last day of a given month
    var m = new Number(lcl_date.getMonth());
    var y = new Number(lcl_date.getYear());

    var tmpDate = new Date(y, m, 28);
    var checkMonth = tmpDate.getMonth();
    var lastDay = 27;

    while (lastDay <= 31) {
        temp = tmpDate.setDate(lastDay + 1);
        if (checkMonth != tmpDate.getMonth())
            break;
        lastDay++
    }
    return lastDay;
}

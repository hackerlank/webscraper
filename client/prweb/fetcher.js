//article-box-cont

/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ew = require('node-xlsx');

var columns = ["HeadLine", "Link"];

var sheet = { name: 'result', data: [] };

sheet.data.push(columns);

var rows = sheet.data;
var base = 'http://www.prweb.com/recentnews/';


request({ method: 'GET', url: base, gzip: true }, function (e, r, b) {
    var $ = cheerio.load(b);

    $('.article-box-cont').each(function (index, item) {
        var link = 'http://www.prweb.com' + $(this).find('.qa-link-to-release').attr('href');
        var title = $(this).find('.article-box-title').text().trim();
        rows.push([title, link]);
        // request({method : 'GET', url : link, gzip : true}, function(e, r, b) {
        //     var $ = cheerio.load(b);
        //     var email = 
        // });

    });

    var buffer = ew.build([sheet]);
    fs.writeFileSync('news.xlsx', buffer);
});
/// <reference path="../../include.d.ts" />

var request = require('request');
var cheerio = require('cheerio');
var ExcelWriter = require('../../private/ExcelWriter');
var fs = require('fs');
var async = require('async');

var eWriter = new ExcelWriter('healthybeauty.xlsx', ['Website', 'Name', 'Address'], 'result');

var links;

fs.readFile('links.txt', function(err, data) {
    links = data.toString().split("\r\n");
    async.mapLimit(links, 2, function(link, callback) {
        
    }, function(err) {
        if(err) console.log(err);
    });
});


function detailFetch(link, callback) {
    request({url : link, method : 'GET'}, function(err, resp, body) {
        var $ = cheerio.load(body);
                
    });
}

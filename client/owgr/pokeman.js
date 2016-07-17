/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');

var url = 'http://www.psypokes.com/dex/sprites.php?view=regular&gen=1';
var entities = [];

request({url :url , method : 'GET', gizp : true}, function(err, resp ,body) {
    var $　= cheerio.load(body);

    $('.psypoke tr td').each(function(index, item) {
        var entity = {};
        entity.picUrl = 'http://www.psypokes.com/dex/' + $(this).find('img').attr('src');
        entity.name = $(this).find('a').text().match(/[A-Za-z]+/) + '.png';
        entities.push(entity);
    });

    console.log(entities);  

    async.mapLimit(entities, 2, function(entity, callback) {
        request.get(entity.picUrl).pipe(fs.createWriteStream('./pokes/' + entity.name));
        setTimeout(function() {
            console.log(entity + ' done');
            callback();
        }, 2000);
    }, function(err) {
        if(err) console.log(err);
    });
});
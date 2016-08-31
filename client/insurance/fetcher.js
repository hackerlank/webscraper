/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var officegen = require('officegen');

var tabs = [];

// function genDoc(path, content, title) {
//     var out = fs.createWriteStream (path, {encoding : "utf-8"});
//     var docx = officegen({
//         'type': 'docx',
//         'subject': title,
//         'keywords': '',
//         'description': ''
//     });
//     var pObj = docx.createP();
//     pObj.options.align = 'center'
//     pObj.addText(content);
//     docx.generate(out); 
// }
function genDoc(path, content, title) {

}


request({ url: 'http://understandinsurance.com.au/landing/understanding-insurance', method: 'GET' }, function (err, resp, body) {
    var $ = cheerio.load(body);
    $('.flyout li a').each(function (index, element) {
        tabs.push('http://understandinsurance.com.au' + $(this).attr('href'));
    });
    console.log(tabs);
    tabs.forEach(function (link, index, array) {
        request({ url: link, method: 'GET', gzip: true }, function (err, resp, body) {
            var $ = cheerio.load(body);
            if ($('article').text()) {
                var title = $('h1').text().replace(/\?/g, '');;
                var article = $('article').text();
                fs.writeFile('./articles/' + title + '.docx', article, function (err) {
                    if (err) console.log(err);
                });
                // genDoc('./articles/' + title + '.docx', article, title);
            } else if ($('.page-tile .page-tile-desc a').attr('href')) {
                var articles = [];
                $('.page-tile .page-tile-desc a').each(function (index, element) {
                    articles.push('http://understandinsurance.com.au' + $(this).attr('href'));
                });
                articles.forEach(function (link, index, array) {
                    request({ url: link, method: 'GET', gzip: true }, function (err, resp, body) {
                        var $ = cheerio.load(body);
                        var title = $('h1').text().replace(/\?/g, '');
                        var article = $('article').text();
                        fs.writeFile('./articles/' + title + '.docx', article, function (err) {
                            if (err) console.log(err);
                        });
                        // genDoc('./articles/' + title + '.docx', article, title);
                    });
                });
            }
        });
    });
});
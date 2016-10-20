/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var columns = ['title', 'text', 'author'];
var sheet = { name: 'result', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 1500;

var optFolder = 'articles_new/';

/** compose url by yourself */
var urls = fs.readFileSync('articlelinks.txt').toString().split('\r\n');
var needToRework = [];


// urls = urls.slice(0, 5);

/**  Use the for loop if neccessary
for (var i = 1; i < 100; i++) {
    (function (k) {
        urls.push(k);
    } (i));
}
*/

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('temp.xlsx', buffer);
    console.log('Everything was done successfully');
}

var sayAllDone = function () {
    console.log('Everything was done');
}

var writeNeedToRework = function () {

}

Promise.all(Promise.map(urls, singleRequest, { concurrency: 5 })).then(sayAllDone).then(writeNeedToRework);


/** Single Req */
function singleRequest(url) {
    var result = {};
    var fileName = optFolder + url.split('/')[url.split('/').length - 2] + '.json';
    var options = {
        method: 'GET',
        uri: url,
        headers: {
        },
        gzip: true,
    };
    return rp(options)
        .then(function (body) {
            var $ = cheerio.load(body);
            //process html via cheerio
            var title = $('#petition_title').text();
            // text, tags, img, category, name of author, signatures with comments 
            var text = $('#petition_statement').text();
            var author = $('#petition_author a').text();
            result['title'] = title;
            result['text'] = text;
            result['author'] = author;
            result['signatures'] = [];
            var comments = [];
            var sig_entity = { link: url, comments: comments };
            $('.sig_comment').each(function (index, element) {
                comments.push($(this).text());
            });
            result.signatures.push(sig_entity);

            var links = [];
            $('#sig_links div a').each(function (index, element) {
                links.push('http://web.archive.org' + $(this).attr('href'));
            });

            // fs.writeFileSync(fileName, JSON.stringify(result));
            // result = null;
            // rows.push([title, text, author]);
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(links);
                }, timeout);
            });

        }).then(function (links) {
            console.log(links.length + ' signatures fetched, start scraping');

            function scrapeSignature(link) {
                console.log('Start working on ' + link);
                var comments = [];
                var sig_entity = { link: link, comments: comments };
                var options = {
                    method: 'GET',
                    uri: link,
                    headers: {
                    },
                    gzip: true,
                    timeout: 25000
                };
                return rp(options)
                    .then(function (body) {
                        var $ = cheerio.load(body);
                        $('.sig_comment').each(function (index, element) {
                            comments.push($(this).text());
                        });
                        result.signatures.push(sig_entity);
                        return new Promise(function (res, rej) {
                            setTimeout(function () {
                                res(result);
                            }, timeout);
                        });
                    }).then(function (result) {
                        console.log(link + ' was done successfully');
                    }).catch(function (err) {
                        needToRework.push(url + '-' + link);
                        fs.appendFileSync('error.txt', err + ' - ' + link + '\r\n');
                        // return err;
                    });
            }

            return Promise.map(links, scrapeSignature, { concurrency: 5 });
        }).then(function () {
            fs.writeFileSync(fileName, JSON.stringify(result));
            result = null;
        }).catch(function (err) {
            if (needToRework.indexOf(url) === -1) {
                needToRework.push(url + '\r\n');
            }
            fs.writeFileSync(fileName, JSON.stringify(result));
            result = null;
            fs.writeFileSync('NeedToRework.txt', needToRework);
        });
}

/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');
var Crawler = require("simplecrawler");


var optFolder = 'articles_new/';

var crawler = new Crawler("web.archive.org");
crawler.initialPath = "/web/20150906022026/http://www.petitionspot.com/listpetitions/";
// crawler.initialPort = 80;
crawler.initialProtocol = "http";

crawler.maxDepth = 7;



var conditionID = crawler.addFetchCondition(function (parsedURL, queueItem) {
    return !parsedURL.path.match(/(css|js|gif|jpg|png|mp3|mp3|zip|gz)/i);
});

crawler.on("fetchcomplete", function (queueItem, responseBuffer, response) {
    console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);

    var html = responseBuffer.toString('utf-8');
    var $ = cheerio.load(html);

    if (!$('#petition_name').text() || $('#petition_name').text() === '') {
        if (!$('#petition_title').text() || $('#petition_title').text() === '') {
            console.log('return');
            return;
        }
    }
    singleRequest(url);
});

crawler.start();


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
            if (!title || title == '') {
                title = $('#petition_name').text();
            }
            // text, tags, img, category, name of author, signatures with comments 
            var text = $('#petition_statement').text();
            var author = $('#petition_author a').text();
            if (!author || author == '') {
                category = $('#petition_category_tags .petition_detail').eq(0).find('a').text();
            }
            var category = $('#breadcrumb a').eq(2).text();
            if (!category || category == '') {
                category = $('#petition_category_tags .petition_detail').eq(3).find('a').text();
            }
            result['title'] = title;
            result['text'] = text;
            result['author'] = author;
            result['category'] = category;
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

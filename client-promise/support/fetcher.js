/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var columns = ['Location','Replies','Inquirer Name','Inquirer Time','Inquirer Post Title','Inquirer Post Status','Inquirer Post Content'];
var sheet = { name: 'result', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 1500;
var originalCommentIndex = 0;
/** compose url by yourself */
var urls = [];
var base = 'https://support.t-mobile.com/thread/'
for (var i = 130000; i < 130030; i++) {
    (function (k) {
        urls.push(base + k);
    } (i));
}


/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('temp.xlsx', buffer);
    console.log('Everything was done successfully');
}

Promise.all(Promise.map(urls, singleRequest, { concurrency: 3 })).then(printToExcel);


/** Single Req */
function singleRequest(url) {
    var options = {
        method: 'GET',
        uri: url,
        headers: {
        },
        gzip: true
    };
    return rp(options)
        .then(function (body) {
            var $ = cheerio.load(body);
            fs.writeFileSync('body.html', body);
            //process html via cheerio
            var location = $('#jive-breadcrumb').text().trim();
            var replies = $('.jive-thread-info strong').text();
            var inquirer = $('.js-original-header .j-post-author strong').text();
            var time = $('.js-original-header .j-post-author').text().replace(inquirer, '').trim();
            var title = $('.js-original-header h1 a').text();    
            var status = $('.js-original-header .jive-answer-type p').text();        
            var content = $('.j-original-message').text().trim();
            var row = [];
            row.push(location);
            row.push(replies);
            row.push(inquirer);
            row.push(time);
            row.push(title);
            row.push(status);
            row.push(content);
            $('.reply').each(function(index, element) {
                var commentAuthor = $(this).find('.reply .j-post-author .jive-username-link').text();
                // var commentStatus = $(this).find('')
                var replyTo = $(this).find('.j-thread-replyto').text();
                var commentTime = $(this).find('.reply .j-post-author ').text().replace(commentAuthor, '').replace(replyTo, '').trim();
                row.push(commentAuthor);
                row.push(commentTime);
                if(row.length > columns.length) {
                    columns.push('Commenter ' + ++originalCommentIndex + ' Name');
                    columns.push('Commenter ' + originalCommentIndex + ' Time');
                }
            });
            rows.push(row);
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(url);
                }, timeout);
            });

        }).then(function (url) {
            console.log(url + ' was done');
        }).catch(function (err) {
            //handle errors
            console.log(err.message);
        });
}

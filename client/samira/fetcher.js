/// <reference path="../../include.d.ts" />

/**
 * 直接拷贝这个，开始编码
 */

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ew = require('node-xlsx');


var columns = ['Product Name', 'Brand', 'Price', 'Color', 'Fabric', 'Detail', 'Images', 'Sold Out'];

var sheet = { name: 'result', data: [] };//默认就叫result

sheet.data.push(columns);

var rows = sheet.data;

/** 最基本的权限绕过，不伪造浏览器 */
var cookie = '';

var headers = {
    Cookie: cookie
}


/** 构造任务队列 */
// var urls = [];

// for (var i = 1; i < 100; i++) {
//     (function (k) {
//         urls.push(k);
//     } (i));
// }

// async.mapLimit(urls, 10, function (id, callback) {
//     single(url, callback)
// }, function (err) {
//     if (err) console.log(err);
//     console.log('everything was done');
//     var buffer = ew.build([sheet]);
//     fs.writeFileSync('zcool.xlsx', buffer);
// });

function single(url, callback) {
    request({ url: url, method: 'GET', gzip: true },
        function (e, r, b) {
            fs.writeFileSync('body.html', b);
            var $ = cheerio.load(b);
            $('.thumb .info').each(function (index, element) {
                var productName = $(this).find('.title .transition').text().trim();
                var brand = $(this).find('.brand .transition').text().trim();
                var price = $(this).find('.price').text().split('|')[0].trim();
                var color = '';
                var fabric = '';
                var details = '';
                var soldOut = 'unknown';
                // var imgUrl = $(this).parent().parent().find('.img .img-responsive').attr('data-original');
                if($(this).parent().find('.h3').text() === 'SOLD OUT') {
                      soldOut = 'True';
                } else {
                      soldOut = 'False';
                }
                rows.push([productName, brand, price, '', '', '', '', soldOut]);
            });

            // $('.thumb .img').each(function(index, element) {
            //     var imgUrl = $(this).find('img').attr('data-original').trim();
            // });


            setTimeout(function () {
                console.log(url + ' was done');

                var buffer = ew.build([sheet]);
                fs.writeFileSync('huntstreet.xlsx', buffer);
                // callback();
            }, 2000);

        });
}

var url = 'http://huntstreet.com/shop-filter/all/all/view=5000';
single(url, null);

/**
 * Product Name
    Brand
    Price
    Color
    Fabric
    Detail 
    Images
 */
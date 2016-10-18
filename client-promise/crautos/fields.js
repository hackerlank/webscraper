/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var IFAPPEND = true;
var existingFile = 'result.xlsx';

var columns;
var sheet;
var rows;
var alreadyDone = [];

if (!IFAPPEND) {
    columns = ['Marca', 'Modelo', 'Anio', 'Combustible', 'Transmision', 'Kilometraje', 'Provincia', 'Precio', 'URL'];
    sheet = { name: 'result', data: [] };
    sheet.data.push(columns);
    rows = sheet.data;
} else {
    sheet = ew.parse(fs.readFileSync(existingFile))[0];
    rows = sheet.data;
    rows.forEach(function (row, index, array) {
        if (index === 0) {
            return;
        }
        alreadyDone.push(row[8]);
    });
}


var timeout = 1000;
var base = 'http://www.crautos.com/usados/economicos-useddetail.cfm?rmax=30&c=';
var ids = fs.readFileSync('ids.txt').toString().split('\r\n');

/** compose url by yourself */
var urls = [];

ids.forEach(function (id, index, array) {
    if (IFAPPEND) {
        if (alreadyDone.indexOf(base + id) !== -1) {
            return;
        }
        urls.push(base + id);
    } else {
        urls.push(base + id);
    }

});

console.log('URLS detected, ' + urls.length + ' links would work');

var errorOnes = [];

// urls = urls.slice(0, 30);

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('result.xlsx', buffer);
    console.log('Everything was done successfully');
    fs.writeFileSync('Unfetched.txt', errorOnes);
}

Promise.all(Promise.map(urls, singleRequest, { concurrency: 12 })).then(printToExcel);


/** Single Req */
function singleRequest(url) {
    var options = {
        method: 'GET',
        uri: url,
        headers: {
        },
        gzip: true,
        timeout: 20000
    };
    return rp(options)
        .then(function (body) {
            var $ = cheerio.load(body);
            //process html via cheerio
            fs.writeFileSync('body.html', body);
            var table = $('.round_bdr2').eq(1);
            var Marca = table.find('tr').eq(0).find('td').eq(0).find('div strong').text().trim();
            var Modelo = table.find('tr').eq(1).find('td').eq(0).find('div strong').text().trim();
            var Anio = table.find('tr').eq(4).find('td').eq(0).find('div strong').text().trim();
            var Combustible = table.find('tr').eq(3).find('td').eq(1).find('div strong').text().trim();
            var Transmision = table.find('tr').eq(4).find('td').eq(1).find('div strong').text().trim();
            var Kilometraje = table.find('tr').eq(0).find('td').eq(2).find('div strong').text().trim();
            var Provincia = table.find('tr').eq(3).find('td').eq(2).find('div strong').text().trim();
            var Precio = table.find('td[bgcolor=\'#FFF53C\'] div').eq(0).find('.style18').text();
            // var Precio = $('.style18').eq(1).text();
            if (Precio === '') {
                Precio = table.find('td[bgcolor=\'#FFF53C\'] div strong span').text();
            }
            if (Precio === '') {
                Precio = $('.style18').eq(1).text();
            }
            if (Precio === '') {
                Precio = body.toString().match(/(¢\s+[\d+,])\s+/)[1];
            }
            rows.push([Marca, Modelo, Anio, Combustible, Transmision, Kilometraje, Provincia, Precio, url]);
            if (rows.length % 1000 === 0) {
                printToExcel();
                console.log('Another 1000 items done, saved a copy');
            }
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(url);
                }, timeout);
            });

        }).then(function (url) {
            console.log(url + ' was done');
        }).catch(function (err) {
            //handle errors
            console.log(err + ' - ' + url);
            errorOnes.push(url);
        });
}

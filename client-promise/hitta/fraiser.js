/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

rp = rp.defaults({proxy : 'http://test2.qypac.net:39134'});

var columns = ["name","hitaLink","phoneNumber","webDomain","facebook","email","openingHours","visitAddress","visitZip","visitCity","description","branch","branchHref","companyName","companyName","organisationsNummer"];
var sheet = { name: 'result', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 3000;

/** compose url by yourself */
var urls = [];

var originalRows = ew.parse(fs.readFileSync('hitta.xlsx'))[0].data;
originalRows.forEach(function(row, index, array) {
    if(index == 0) {
        return;
    }
    urls.push(row[1]);
});

console.log(urls.length);

urls = urls.slice(0, 100);

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('fraiser.xlsx', buffer);
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
            //process html via cheerio
            var name = $('.name').text();
            var hitaLink = url;
            var phoneNumber = $('.print-phone-number').text();
            var webDomain = $('.item-details__web-links li *[title="Besök hemsidan"]').attr('href');
            var facebook =  $('.item-details__web-links li *[title="Facebook"]').attr('href');
            var email = '';
            var openingHours = $('.opening-hours .ko-element.hide .data').text().trim();
            var visitAddress = $('*[itemprop = "streetAddress"]').text();
            var visitZip = $('*[itemprop = "postalCode"]').text();
            var visitCity = $('*[itemprop = "addressLocality"]').text();
            var description = $('*[itemprop = "description"]').text().trim();
            var branch = $('.trade-list ul li a').text();
            var branchHref = 'https://www.hitta.se' +  $('.trade-list ul li a').attr('href');
            var companyType = $('.heading-1 .header-footer').text().trim().replace(/\s+/g, '');
            var companyName = $('.legalname').text();
            var organisationsNummer = $('.geb-org-number').text();
            rows.push([name, hitaLink, phoneNumber, webDomain, facebook, email, openingHours, visitAddress, visitZip, visitCity, description, branch, branchHref, companyName, companyName, organisationsNummer]);

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

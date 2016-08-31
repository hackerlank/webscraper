//http://www.inc.com/rest/inc5000company/43032?currentinc5000year=2016
/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ew = require('node-xlsx');

var columns = ["Pres./CEO First name", "Pres/CEO Last Name", "Company name", "Address", "City", "State", "Zip Code", "Phone Number", "Pres./CEO email address"];

var sheet = { name: 'result', data: [] };

sheet.data.push(columns);

var rows = sheet.data;


var dataBuffer = fs.readFileSync('data.json', {});

var dataJSON = JSON.parse(dataBuffer.toString());

// console.log(dataJSON.length);

var urls = [];

dataJSON.forEach(function (company, index, array) {
    if (company.state_s == 'SC' || company.state_s == 'NC' || company.state_s == 'GA') {
        urls.push('http://www.inc.com/rest/inc5000company/' + company.id + '?currentinc5000year=2016');
    }
});

console.log(urls.length);

function singleQuery(url, callback) {
    request({ url: url, method: 'GET' }, function (err, resp, body) {
        // console.log(body);
        try {
            var b = JSON.parse(body);
        } catch (err) {
            fs.appendFileSync('error.txt', url + '\r\n');
            callback();
            return;
        }
        var ceoFirst = b.ifc_ceo_name.split(' ')[0];
        var ceoLast = b.ifc_ceo_name.split(' ')[1];
        var companyName = b.ifc_company;
        var address = b.ifc_address;
        var city = b.ifc_city;
        var state = b.ifc_state;
        var zip = b.ifc_postcode;
        var phone = b.ifc_ceo_phone;
        var email = b.ifc_ceo_email;

        var row = [];
        row.push(ceoFirst);
        row.push(ceoLast);
        row.push(companyName);
        row.push(address);
        row.push(city);
        row.push(state);
        row.push(zip);
        row.push(phone);
        row.push(email);

        rows.push(row);

        fs.appendFileSync('records.txt', row + '\r\n');

        setTimeout(function () {
            console.log(url + ' was done')
            callback();
        }, 2000);
    });
}

async.mapLimit(urls, 10, function (url, callback) {
    singleQuery(url, callback)
}, function (err) {
    if (err) console.log(err);
    var buffer = ew.build([sheet]);
    fs.writeFileSync('5000inc_update_0831.xlsx', buffer);
});
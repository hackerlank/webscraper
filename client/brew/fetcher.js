/// <reference path="../../include.d.ts" />

var fs = require('fs');
var cheerio = require('cheerio');
var ew =require('node-xlsx'); 

var columns = ["Name", "Address", "Type", "Telephone", "URL"];

var sheet = { name: 'result', data: [] };

sheet.data.push(columns);

var rows = sheet.data;

fs.readFile('data.html' , function(err, data) {
    var html = data.toString();

    var $ = cheerio.load(html);

    $('.vcard').each(function(index, element) {
        var name = $(this).find('.name').text();
        if(!name || name === '') {
            return;
        }
        var address = $(this).find('.address').text().trim();
        var type = $(this).find('.brewery_type').text();
        var phone = $(this).find('.telephone').text();
        var url = $(this).find('.url').text();

        rows.push([name,address,type,phone,url]);
    });

    var buffer = ew.build([sheet]);
    fs.writeFileSync('sample.xlsx', buffer);
});


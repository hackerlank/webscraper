//
var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var all = [];
var sources = ['2003.json','2009.json','2010.json','2241.json','2397.json'];
var base2015 = 1420041600000;

var columns = ['Subject', 'Author', 'General creation time', 'General category'];
var sheet = {name: 'result', data: []};
sheet.data.push(columns);
var rows = sheet.data;

sources.forEach(function(file, index, array) {
    var jsonArray = JSON.parse(fs.readFileSync(file).toString());

    jsonArray.forEach(function(item, index, array) {
        if(item.creationDate > base2015) {
            all.push(item);
        }
    });
});


console.log('There are ' + all.length + ' items later than 2015/01/01');

all.forEach(function(item, index, array) {
    var subject = item.subject;
    var author = item.prop.author.subject;
    var creationTime = item.creationTime;
    var category = item.prop.place.link;
    rows.push([subject, author, creationTime, category]);
    fs.appendFileSync('ids.txt', item.id + '\r\n');
});

var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('Discussions.xlsx', buffer);
    console.log('Everything was done successfully');
}

// printToExcel();


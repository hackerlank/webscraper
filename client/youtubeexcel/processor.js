/// <reference path="../../include.d.ts" />

var ew = require('node-xlsx');
var fs = require('fs');

var oPath = 'origin.xlsx';
var after = 'after.xlsx';
var origin = ew.parse(fs.readFileSync(oPath))[0];

var afterColumns =['Length', 'Title' , 'URL', 'Date', 'Edit', 'Number', 'Views'];

var sheet = {name : 'after', data : []};

var rows = sheet.data;

rows.push(afterColumns);

origin.data.forEach(function(or, index, array) {
    if(or[0].toString().match('\d+\:\d+')) {
        var row = [];
        row.push(or[0]);
        var Title = array[index+1][0];
        var URL = array[index+1][1];
        var Date = array[index+2][0];
        var Edit = array[index+3][0];
        var Number = array[index+4][0];
        var View = array[index+5][0];

        row.push(Title);
        row.push(URL);
        row.push(Date);
        row.push(Edit);
        row.push(Number);
        row.push(View);
        rows.push(row);
    }
});

var buffer = ew.build([sheet]);
fs.writeFileSync(after, buffer);
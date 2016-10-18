/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var target = 'New_Import_LIGHTSPEED_inventory_import.xlsx';
var source = 'Current_Stock_Levels_Oct_13th_2016.xlsx';

var output = 'output.xlsx';

var targetSheet = ew.parse(fs.readFileSync(target))[0];
var targetRows = targetSheet.data;

var sourceSheet = ew.parse(fs.readFileSync(source))[0];
var sourceRows = sourceSheet.data;

console.log(targetRows.length);
console.log(sourceRows.length);


var outPutRows = [];

targetRows.forEach(function (row, index, array) {
    fs.appendFileSync('rows.txt', row + '\r\n');
    if (index == 0) {
        outPutRows.push(row);
        return;
    }
    var found = false;
    sourceRows.forEach(function (sourceRow, index, array) {

        if (index === 0) {
            return;
        }
        // console.log(sourceRow[23]);
        if (sourceRow[23] == row[0]) {
            found = true;
        }
    });
    if (found) {
        outPutRows.push(row);
    }
});

var outputSheet = { name: 'result', data: outPutRows };
var buffer = ew.build([outputSheet]);
fs.writeFileSync(output, buffer);


/// <reference path="../include.d.ts" />
var fs = require('fs');

var ExcelReader = require('../private/ExcelReader.js');

var reader = new ExcelReader('OGBA.xls');

var result = reader.readAll();

// fs.writeFileSync('xlsresult.txt', JSON.stringify(result));

var 
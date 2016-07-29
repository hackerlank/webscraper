/// <reference path="../include.d.ts" />

/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used *//** This wrapper will be no longer used */
/** This wrapper will be no longer used *//** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used *//** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */
/** This wrapper will be no longer used */

var fs = require("fs");
var xlsx = require('node-xlsx');


/**
 * @param Saving file
 * @columns columns name array e.g ["ColumnA", "ColumnB", "ColumnC"]
 * @sheetName The first sheet's name
 * 
 * Wrapper for writing excel
 */
var ExcelWriter = function (file, sheetName) {
    this.sheets = [sheetName];
    this.file = file;
    this.current = sheetName;
}

/**
 * Decide which ...
 * No need to wrap xlsx.
 */
ExcelWriter.prototype.switchTo = function(sheetName) {

};

/**
 * @param row  text array of appending row e.g ["cell1", "cell2", "cell3"]
 */
ExcelWriter.prototype.appendRow = function (row) {
    
}

/**
 * @return buffer
 */
ExcelWriter.prototype.build = function () {
    this._buffer = xlsx.build([{ name: this._sheetName, data: this._data }]);
    fs.writeFile(this._file, this._buffer, function (err) {
        console.error('Unable to write file ' + this._file);
    });
}

/**
 * output current status
 */
ExcelWriter.prototype.log = function () {
    console.log(this._data);
}

module.exports = ExcelWriter;
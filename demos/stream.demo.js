/// <reference path="../include.d.ts" />

var fs = require('fs');
fs.createReadStream('ocr.d1emo.js').on('error', function(error) {console.error(error.stack)}).pipe(fs.createWriteStream('copyocr.demo.js'));



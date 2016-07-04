/// <reference path="../include.d.ts" />

var fs = require('fs');
fs.stat(__filename, function(err, stats) {
    console.log(stats.isFile());
});

fs.readdir(__dirname, function(err, files){
    console.log(files);
});
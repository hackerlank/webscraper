/// <reference path="../../include.d.ts" />
var request = require('request');
var fs = require('fs');

// request.get('http://www.mysheriff.net/verificationimage.php?').pipe(fs.createWriteStream('milan.png'));
request.get('http://cn.bing.com/s/a/hpc18.png').pipe(fs.createWriteStream('milan.png'));

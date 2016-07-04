/// <reference path="../include.d.ts" />

var request = require('request');
var fs = require('fs');

request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // console.log(body) // Show the HTML for the Google homepage.
  }
})  


request('http://www.mlo.me/upload/mitu/2016/201606/20160614/20160614064202.gif').pipe(fs.createWriteStream('test.gif'));
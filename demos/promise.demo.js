/// <reference path="../include.d.ts" />

var promise = require('bluebird');
var fs = require('fs');

// var numbers= [1,2,3];

// promise.all([
//     fs.readFileSync('./fs.demo.js').toString(), fs.readFileSync('./emitter.demo.js').toString()
// ]).then(function(dates) {
//     console.log(dates);
// });

var a;

function onepluseone() {
    // setTimeout(function() {
    //     a = 2;    
    // }, 2000);
    return 2;
}

var readFile = promise.promisify(fs.readFile);

 readFile('fs.demo.js').then(function(demo) {
        console.log(demo); 
 }).catch(function(err) {
     console.log(err);
 });




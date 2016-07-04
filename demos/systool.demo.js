/// <reference path="../include.d.ts" />

var os = require('os');

for(var i in os) {
    console.log(i);
}

console.log(os.cpus());
console.log(os.platform());

var path = require('path');
var absolute = path.resolve('util.demo.js');

console.log(absolute);

var dns = require('dns');

dns.lookup('www.milanoo.com', function(err, address, family) {
    console.log(address);
    console.log(family);
});
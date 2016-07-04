/// <reference path="../include.d.ts" />

var buf = new Buffer([0, 0, 0, 0, 0]);

var len = buf.write('wwwww',0);

// console.log(buf);
// console.log(len);
// console.log(buf.toString());
// console.log('utf-8', buf.toJSON());

var buf2 = new Buffer(5);
buf.write('xxxxx');

var buf3 = Buffer.concat([buf, buf2]);

// console.log(buf3);
console.log(buf3.toString());


var b1 = new Buffer('hehe');
var b2 = new Buffer('haha');
console.log(Buffer.concat([b1, b2]).toString());

var buffer1 = new Buffer('ABCD');
var buffer2 = new Buffer(5);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());
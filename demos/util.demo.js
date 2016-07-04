/// <reference path="../include.d.ts" />
var util = require('util');


function Base() {
    this.name = "jetbaba";
    this.showName = function() {
        console.log('my name is ' + this.name);
    }

    Base.prototype.sayHello = function() {
        console.log('hello, i am ' + this.name);
    }
}


function Sub() {
    this.name = 'jeterzi';
}

util.inherits(Sub, Base);
var base = new Base();
base.showName();
base.sayHello();


var sub = new Sub();
// sub.showName();
sub.sayHello();

console.log(util.inspect(base));
console.log(util.inspect(sub));


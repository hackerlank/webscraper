/// <reference path="../include.d.ts" />

var array = ['1', '2', '3'];

var a = array.slice(-3); 

// console.log(a);

var str = "hello sb";

var s1 = str.slice(6);
var s2 = str.substring(6, -1);

// console.log(s1);
// console.log(s2);



var countries = [{'name' : 'US', 'area' : 100}, {'name' : 'CN', 'area' : 1000}, {'name' : 'JP', 'area' : 5}];

countries.sort(function(pre, la) {
    return pre.area -  la.area;
});

// console.log(countries);


var arrayA = [1, 2, 3];
var arrayB = arrayA;

// arrayB = [];
arrayB.length = 0;


// console.log(arrayA); 


var Foo = [1, 2, 3];
var Bar = [4, 5, 6];
var FB  = [7, 8, 9];

// console.log(Foo.concat(Bar));

Array.prototype.push.apply();

// console.log(Foo);
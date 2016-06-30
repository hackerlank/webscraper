
var ori = "it's my c@c fault abcdef@gmail.com it's not my fault 12dsadsa_3@gmail.com ccddee ma************@gmail.com";
var fs = require('fs');


var result = ori.match(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/ig);
// var result = ori.match(/[\w!#$%&’+/=?^_{|}~-]+(?:\.[\w!#$%&'*+/=?^_{|}~-]+)@(?:\w?.)+\w?/gim);
console.log(result);

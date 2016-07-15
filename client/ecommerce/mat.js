/// <reference path="../../include.d.ts" />

var str = "dsadksla;dkjsaojd dksladjsajlk hdfhakfgdhagfhkafkjj jadhj hdjkash sjak https://www.instagram.com/ilite_lighting dsaldklsadsadas";

console.log(str.match(/https:\/\/www.instagram.com\/.*\s/)[0].trim());
/// <reference path="../../include.d.ts" />

var fs = require('fs');


var map = [{ "鰄": "öh" }, { "鲞": "öß" }, { "鋎": "äß" }, { "鰏": "ös" }, { "鋒": "äh" }, { "鋜": "är" }, { "鋘": "än" }, { "躡": "Üb" }, { "黨": "üh" }, { "黵": "ür" }, { "黡": "üd" }, { "黦": "üg" }, { "鋟": "äu" }, { "點": "üc" }, { "黮": "ül" }, { "黚": "üb" }, { "鋞": "ät" }, { " 鰂": "öf" }, { "鰊": "ön" }, { "黶": "üs" }, { "黷": "üt" }, { " 遝": "ße" }, { "鰃": "ög" }, { "黤": "üf" }, { "黱": "ün" }, { "膓": "Äq" }, { "鋝": "äs" }, { "遺": "ßz" }, { "鼃": "ü" }, { "鰎": "ör" }, { "遼": "ß" }, { "膎": "Än" }, { "謋": "Öf" }, { "黳": "üp" }];

var text = fs.readFileSync('origin.txt').toString();

map.forEach(function (item, index, array) {
    for (var key in item) {
        while (text.indexOf(key) !== -1) {
            text = text.replace(key, item[key]);
            console.log(key + ' replaced');
        }
    }
})

fs.writeFileSync('new.txt', text);

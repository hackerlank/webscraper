/// <reference path="../../include.d.ts" />

var fs = require('fs');

var files = fs.readdirSync('foodtrucks');

var newFolder = 'foodtrucks_renamed/';

var sources = JSON.parse(fs.readFileSync('foodtrucks_new.json'));

files.forEach(function (file, index, array) {
    var id = file.split('.')[0];
    var city = 'NULL';
    sources.forEach(function (item, index, array) {
        if (item.id === id) {
            city = item.location.city;
        };
    });
    var originName = 'foodtrucks/' + file;
    var outputName = newFolder + city + '_' + id + '.json';
    // fs.writeFileSync(outputName, '');
    if (!fs.existsSync(outputName)) {
        var bf = fs.readFileSync(originName);
        fs.writeFileSync(outputName, bf);
        console.log(id + ' was done ');
    }
});
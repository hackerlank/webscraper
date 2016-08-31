/// <reference path="../../include.d.ts" />

var fs = require('fs');
var ew = require('node-xlsx');
var columns = ["Company name", "Company Rank", "Balance"];

var sheet = { name: 'result', data: [] };

sheet.data.push(columns);

var rows = sheet.data;


fs.readFile('data.json', function (err, data) {
    var incs = JSON.parse(data.toString());
    incs.forEach(function (inc, index, array) {
        var name = inc.company;
        var rank = inc.rank;
        var balance = inc.revenue;
        rows.push([name, rank, balance]);
    });
    var buffer = ew.build([sheet]);
    fs.writeFileSync('5000inc_balance.xlsx', buffer);
});


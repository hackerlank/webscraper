var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
const proxylist = require("proxylist")
proxylist.main().then(console.log); //=> ["145.34.32.156:4440", ...] 
proxylist.first().then(console.log);
proxylist.second().then(console.log);
// request('http://www.echolink.org/proxylist.jsp', function (err, resp, body) {
//     var $ = cheerio.load(body);
//     $('table[cellpadding="5"] tr').each(function (index, element) {
//         if (index === 0) {
//             return;
//         }
//         var ip = $(this).find('td').eq(1).text().trim();
//         var port = $(this).find('td').eq(2).text().trim();

//         fs.appendFileSync('proxylist.txt', ip + ':' + port + '\r\n');
//     });
// });
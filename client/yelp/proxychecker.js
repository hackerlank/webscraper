var proxyChecker = require('proxy-checker');
var fs = require('fs');
proxyChecker.checkProxiesFromFile(
    // The path to the file containing proxies 
    'proxies.txt',
    {
        // the complete URL to check the proxy 
        url: 'https://www.yelp.com/'
        // an optional regex to check for the presence of some text on the page 
        // regex: /Example Domain/
    },
    // Callback function to be called after the check 
    function (host, port, ok, statusCode, err) {
        console.log('##############');
        console.log(host + ':' + port + ' => '
            + ok + ' (status: ' + statusCode + ', err: ' + err + ')');

        if (ok) {
            fs.appendFileSync('usefulproxies.txt', 'http://' + host + ':' + port + '\r\n');
        }
    }
);

// var request = require('request');
// var cheerio = require('cheerio');

// request('http://www.echolink.org/proxylist.jsp', function(err, resp, body) {
//     var $ = cheerio.load(body);
//     $('table[bordercolordark="#000000"] tr').each(function(i, e) {
//         var ip = $(this).find('td').eq(1).text().trim();
//         var port = $(this).find('td').eq(2).text().trim();
//         fs.appendFileSync('encholin.txt', 'http://' + ip + ':' + port + '\r\n');
//     });
// });


/// <reference path="../../include.d.ts" />

var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ew = require('node-xlsx');
var webdriver = require('selenium-webdriver');
var by = webdriver.By;



// var url = 'https://weedmaps.com/earth/us/ca';

// request({url : url, method: 'GET', gzip : true}, function(err, resp ,body){

//     fs.appendFileSync('body.html', body);
// });

// var url = 'http://www.hanyu123.cn/html/c16/506.html';

// request({url : url, method: 'GET', gzip : true}, function(err, resp ,body){

//     var $ = cheerio.load(body);

//     $('#content table tr').each(function(number, element) {
//         fs.appendFileSync('states.txt', $(this).find('td').eq(0).text().trim().toLowerCase() + '\r\n');
//     });


// });
// var excel;
// if (fs.existsSync(filePath)) {
//     fs.createReadStream(filePath).pipe(fs.createWriteStream('backup.xlsx'));
//     excel = ew.parse(fs.readFileSync(filePath));
// } else {
//     excel = [];
// }
var columns = ["Shop_Name", "Shop_Address", "City", "State", "Zipcode", "Website", "Telphone", "Email", "Contact_Person", "Working_Hours", "URL"];
sheet = { name: 'usa', data: [] };
sheet.data.push(columns);

filePath = 'result.xlsx';

// function singleFetch(url, callback) {
//     var driver = new webdriver.Builder().forBrowser('phantomjs').usingServer('http://127.0.0.1:4444/wd/hub').build();

//     driver.get(url).then(function () {
//         driver.wait(function () {
//             /** Waiting for form loaded */
//             return driver.isElementPresent(by.xpath('//*[@href="{{region_path}}"]')).then(function (present) {
//                 return !present;
//             })
//         }, 50000).then(function () {
//             var html = driver.getPageSource();

//             fs.writeFileSync('body.html', html);

//             var $ = cheerio.load(html);

//             if ($('ul[id="dispensary"]')) {
//                 $(this).find('li').each(function (index, element) {
//                     var href = $(this).find('a').eq(0).attr('href');
//                     fs.appendFileSync('us_dispensary.txt', href + '\r\n');
//                 });
//             }

//             if ($('ul[id="delivery"]')) {
//                 $(this).find('li').each(function (index, element) {
//                     var href = $(this).find('a').eq(0).attr('href');
//                     fs.appendFileSync('us_delivery.txt', href + '\r\n');
//                 });
//             }

//             setTimeout(function () {
//                 driver.close();
//                 callback();
//             }, 1000);

//         });
//     });
// }


// var states = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west virginia", "wisconsin", "wyoming"];

var states = ["annapolis-valley","barrie","bracebridge","calgary","campbell-river","chemainus","cowichan-valley","durham","edmonton","fredericton","halifax","halton","hamilton","hastings","kamloops-salmon-arm","kelowna-vernon","kingston","kitchener-waterloo","langley","london","maple-ridge","merritt","moncton","montreal","nanaimo","nelson","niagara-falls","northumberland","ottawa","penticton-osoyoos","peterborough","port-alberni","prince-edward-island","prince-george","salt-spring-island","saskatchewan","saskatoon","sooke","squamish","st-johns","sudbury","sunshine-coast","thunder-bay","toronto-east","toronto","vancouver-victoria","vancouver-north","victoria","windsor-london","winnipeg"];

var urls = [];

states.forEach(function (value, index, array) {
    // urls.push('https://weedmaps.com/api/web/v1/regions/' + value + '?card_only=true&premium_only=true&size=100&types=delivery');
    urls.push('https://weedmaps.com/api/web/v1/regions/' + value + '?card_only=true&premium_only=true&size=100&types=dispensary');
});

async.mapLimit(urls, 1, function (url, callback) {
    singleFetch(url, callback);
});

// var body = fs.readFileSync("canada.html", "utf-8");

// var $ = cheerio.load(body);

// $('a').each(function(index, element) {
//     fs.appendFileSync('canada_states.txt', $(this).attr('href') + '\r\n');
// });

function singleFetch(url, callback) {
    request({ url: url, method: 'GET', gzip: true }, function (err, resp, body) {

        // fs.appendFileSync('r.json', body);

        if(body && (body.length > 100) && (body.indexOf('<html>') == -1)) {
            var iBody = JSON.parse(body);
            iBody.forEach(function(item, index, array) {
                fs.appendFileSync('ca_dispensary.txt', item.listing_url + '\r\n');
            })
        }

        setTimeout(function() {
            console.log(url + ' was done');
            callback();
        }, 3000);
    });
}


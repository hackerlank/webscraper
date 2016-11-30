/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');
var webdriver = require('selenium-webdriver');
var by = webdriver.By;

//totally 12 pages
var pageIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12];
var base = 'https://www.bokadirekt.se/Fris%C3%B6r/Sverige';

//Initial webdriver - only one driver is workong. Map concurrency must be set to 1
var driver = new webdriver.Builder().forBrowser('phantomjs').build();
driver.get(base).then(function() {
    return Promise.map(pageIndexes, singlePageCollect, {concurrency : 1});
}).catch(function(err) {
    console.log(err);
});

function singlePageCollect(pageIndex) {
    console.log('Start working on ' + pageIndex);
    return driver.findElement(by.xpath('//ul[@class="pagination pagination-sm"]/li/a[text()="' +  pageIndex + '"]')).then(function(element) {
        return element.click();
    }).then(function() {
        console.log('Clicked specific item, ready to delaying');
        return Promise.delay(10000);
    }).then(function() {
        return driver.findElements(by.css('.list-group-item'));
    }).then(function(elements) {
        console.log(elements.length + ' items found');
        elements.forEach(function(element, index , array) {
            element.getAttribute('href').then(function(href) {
                fs.appendFileSync('hrefs.txt', href + '\r\n');
                console.log(href + ' was written');
            });
        });
        return 0;
    });
}




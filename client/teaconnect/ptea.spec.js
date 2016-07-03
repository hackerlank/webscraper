/// <reference path="../../include.d.ts" />

var fs = require('fs');
var pTool = require('../../toolkits/protractortool');
var sTool = require('../../toolkits/stringtool');
var async = require('async');
var ScrapeIt = require('scrape-it');

var tesseract = require('node-tesseract');
var easyimg = require('easyimage');

fs.writeFileSync('page.txt', '"Name","Email","Comoany","JobTitle"\r\n');

describe('input and take screen', function () {
    isAngularSite(false);



    it('scraping', function () {
        browser.get('http://www.teaconnect.org/Members/Member-Directory/index.cfm?start=1&end=4256&searchTerm=&search=people&searchtype=people&alpha=').then(function () {
            element.all(by.xpath("//div[@class='webSearchResult']/h5/a")).each(function (a) {
                a.getAttribute('href').then(function (href) {
                    ScrapeIt(href, {
                        Name: "div[class='personProfile'] h1",
                        Email: "div[class='personProfile'] p span",
                        Company: "div[class='personProfile'] p strong",
                        JobTitle: "div[class='personProfile'] span strong"
                    }).then(function (page) {
                        fs.appendFileSync('page.txt', '"' + page.Name + '",' + '"' + page.Email + '",' + '"' + page.Company + '",' + '"' + page.JobTitle + '"\r\n');
                    });
                })
            });
        });

    }, 1000000);


    afterAll(function () {
        console.log();
        browser.quit();
    });

});
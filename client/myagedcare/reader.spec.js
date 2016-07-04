/// <reference path="../../include.d.ts" />

var fs = require('fs');
var pTool = require('../../toolkits/protractortool');
var Excel = require('../../private/ExcelWriter.js');
var events = require('events');
var emitter = new events.EventEmitter();

describe('myagedcare', function () {

    var excel = new Excel('firstTab.xlsx', ['Age Care Name', 'Street Address', 'Business Address', 'Phone Number', 'Email ID', 'Website'], 'scraped')
    beforeEach(function () {
        browser.driver.manage().timeouts().implicitlyWait(3000);
        return isAngularSite(true);
    });

    it('push rows', function () {
        var links = fs.readFileSync('linkList.txt', 'utf-8').toString();
        var la = links.toString().split('\r\n');

        la.forEach(function (value, index, array) {
            console.log('start processing ' + value);
            var row = [];

            browser.get(value).then(function () {
                element(by.tagName('h1')).getText().then(function (text) {
                    row.push(text);
                }).then(function () {
                    try {
                        element(by.xpath('//div[@ng-bind-html="details.streetAddress.addressLine2"]')).getText().then(function (addressLine) {
                            element(by.xpath('//div[@ng-bind-html="details.streetAddress.suburb"]')).getText().then(function (suburb) {
                                element(by.xpath('//div[@ng-bind-html="details.streetAddress.state"]')).getText().then(function (state) {
                                    row.push(addressLine + ',' + suburb + ',' + state);
                                });
                            })
                        });
                    } catch (err) {

                    }
                }).then(function () {
                    try {
                        element(by.xpath('//div[@ng-bind-html="details.businessAddress.addressLine1"]')).getText().then(function (addressLine) {
                            element(by.xpath('//div[@ng-bind-html="details.businessAddress.suburb"]')).getText().then(function (suburb) {
                                element(by.xpath('//div[@ng-bind-html="details.businessAddress.state"]')).getText().then(function (state) {
                                    row.push(addressLine + ',' + suburb + ',' + state);
                                });
                            })
                        });
                    } catch (err) {

                    }
                }).then(function () {
                    element(by.binding('details.phoneNumber')).getText().then(function (phone) {
                        row.push(phone);
                    });
                }).
                    then(function () {
                        element(by.xpath("//a[text()='Email the home']")).getAttribute('href').then(function (email) {
                            row.push(email);
                        });
                    }).then(function () {
                        element(by.xpath("div[@class='organisation-detail-website']/a")).getText().then(function (website) {
                            row.push(website);
                        });
                    }).then(function () {
                        excel.appendRow(row);
                        row = [];
                    });
            });

        });


    }, 2 * 60 * 60 * 1000);

    it('build excel', function () {
        excel.build();
    }, 10000);
});
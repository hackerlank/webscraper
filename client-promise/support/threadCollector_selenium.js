/**
 * Created by Administrator on 2016/11/9.
 */

/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');
var webdriver = require('selenium-webdriver');
var by = webdriver.By;


function single(url) {
    var driver = webdriver.Builder().forBrowser('firefox').build();

    driver.get(url).then(function() {
        var threads = driver.findElements(by.css('.js-browse-item .j-td-title a'));
        threads.forEach(function(thread, index, array) {
            
        });
    });
}


